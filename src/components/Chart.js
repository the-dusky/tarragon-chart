import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

var borderColors = [
    "#3e95cd",
    "#8e5ea2",
    "#3cba9f",
    "#e8c3b9",
    "#c45850",
    "#3f51b5",
    "#f9a825",
    "#870000",
    "#616161",
    "#2e7d32",
    "#fff176"
]

class Chart extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('https://tarragon-server.gadgetlabs.com/assets?startDate=2018-01-01&endDate=2018-01-9&granularity=day')
            .then((response) => response.json())
            .then((responseJson) => {
                var labels = [];
                var dataPoints = [];
                var symbols = [];
                var dataSets = [];
                responseJson.map(function(item) {
                    labels.push(item.date)
                    item.assets.map( function(asset) {
                        if(Array.isArray(dataPoints[asset.symbol]) == false) {
                            symbols.push(asset.symbol);
                            dataPoints[asset.symbol] = [];
                        }
                        dataPoints[asset.symbol].push(asset.value);
                    })
                })
                var count = 0;
                symbols.map(function(symbol) {
                    var symbolData = [];
                    dataPoints[symbol].map(function(points) {
                        symbolData.push(points);
                    })
                    dataSets.push({
                        label:symbol,
                        data:symbolData,
                        borderWidth: 4,
                        borderColor: borderColors[count],
                        lineTension:0
                    })
                    count++;
                })

                this.setState({
                    isLoading: false,
                    chartData:{
                        labels:labels,
                        datasets:dataSets
                    }
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="loading">LOADING</div>
            )
        }
        return (

            <div className="chart" >
                <Line
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;