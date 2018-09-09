import dotenv from 'dotenv'
dotenv.config()

import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import express from 'express';
import session from 'express-session';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './client/components/App';
import Html from './client/components/Html';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved

import createFetch from './createFetch';
import router from './client/router';

global.appRoot = path.resolve(__dirname);

global.DEVELOPMENT = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const app = express();

// ============== DATABASE =============
const mongoose = require('mongoose');
import 'mongoose-type-email';
import 'mongoose-type-url';
console.log(process.env.MONGODB_URI)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, 'Database connected.'));
// ============== /DATABASE =============

// ============== MIDDLEWARE =============

const MongoStore = require('connect-mongo')(session);
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const passport = require('passport');
const passportAuth = require('./passport');
const morgan = require('morgan');

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(express.static('public'));
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(require('cookie-parser')());
app.use(passport.initialize());

// ============== /MIDDLEWARE =============

// ============== OAUTH =============
import OAuth from './oauth';
OAuth(app);
// ============== /OAUTH =============

// ============== PUBLIC =============
app.use(express.static(require("path").join(__dirname, "public"), {
  extensions: ['html']
}));
// ============== /PUBLIC =============

// ============== API =============
import { Facebook, FacebookApiException } from 'fb';
const fb = new Facebook();
// ============== /API =============

// ============== REACT SERVER SIDE RENDERING =============

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: process.env.WEB_URI,
      cookie: req.headers.cookie,
      // schema,
      // graphql,
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (DEVELOPMENT) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: process.env.API_URI,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});
// ============== /REACT SERVER SIDE RENDERING =============

// ============== GRAPHQL =============
import { ApolloServer, graphiqlExpress } from 'apollo-server-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

// Sets the req.user if there is a provided jwt token.
function Authenticate(req, res, next)
{
  passport.authenticate('jwt', (err, user, info) => {
   if (err) return next(err);
   if (info)
   {
     if (info == 'TokenExpiredError: jwt expired')
     {
       // Clear out the users' jwt token.
       res.clearCookie('jwt');
     }
     else if (info != 'Error: No auth token')
     {
       return next(info);
     }
   }
   req.user = user || null;
   next();
 })(req, res, next);
}

const formatError = error => {
  const message = error.originalError ? error.originalError.message : 'An unkown error occured';
  const details = error.message || 'An unknown error occurred.';
  const locations = error.locations;
  const path = error.path;
  const extensions = error.extensions;
  const stack = DEVELOPMENT ? error.originalError : `ONLY AVAILABLE IN DEVELOPMENT. CHECK SERVER LOGS. DATE: ${new Date()}`;

  console.error(error.originalError);

  return extensions
    ? { message, details, stack, locations, path, extensions }
    : { message, details, stack, locations, path };
}

const context = ({req, res}) => {
  return require('./context')({req, db, res, fb})
}

import { default as graphqlSchema } from './schema';

const server = new ApolloServer({
  schema: graphqlSchema,
  context: context,
  tracing: true,
  cacheControl: true,
  introspection: true,
  formatError
  //extensions: [ProfilerExtension]
})
server.applyMiddleware({ app });

app.use('/graphql', Authenticate);
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

// ============== /GRAPHQL =============
app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at ${process.env.WEB_URI}${server.graphqlPath}`)
);

export default app;
