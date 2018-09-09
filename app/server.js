import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import express from 'express';
import session from 'express-session';


global.appRoot = path.resolve(__dirname);
// require('dotenv').config({path: __dirname + '/.env'});

global.DEVELOPMENT = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const app = express();

// ============== DATABASE =============
const mongoose = require('mongoose');
import 'mongoose-type-email';
import 'mongoose-type-url';

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
require('./oauth')(app);
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
