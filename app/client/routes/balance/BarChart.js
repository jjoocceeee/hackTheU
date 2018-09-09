import React, {Component} from "react";
import "./app.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default class SimpleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    let response = await fetch("/api/parse");
    const json = await response.json();
    this.setState({data: json});
  }

  buildChart() {
    return <BarChart width={900} height={260} data={this.state.data} margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 25
      }}>
      <XAxis dataKey="Text" fontFamily="sans-serif" tickSize={10} dy={25}/>
      <YAxis hide={false}/>
      <CartesianGrid vertical={false} stroke="#ebf3f0"/>
      <Bar dataKey="date" barSize={170} font-fontFamily="sans-serif">
        {
          this.state.data.map((entry, index) => (<Cell fill={this.state.data[index].AnswerRef === "three"
              ? '#61bf93'
              : '#ededed'}/>))
        }
      </Bar>
    </BarChart>
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          this.buildChart()
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
