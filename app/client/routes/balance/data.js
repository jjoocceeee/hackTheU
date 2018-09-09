import React from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
      "Checking": 5987.35,
      "Savings": 734.00,
      "FacebookInteractions": 7346,
    },
];


ReactDOM.render(
    React.createElement("div", null, "Hello World"),
    document.getElementById("root")
);


const simpleBarChart = React.createClass({
    render(){

    }
})

ReactDOM.render(
    <SimpleBarChart />,document.getElementById('Container')
);
