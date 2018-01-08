import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('https://tarragon-server.gadgetlabs.com/assets?startDate=2018-01-01&endDate=2018-01-07&granularity=day')
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
                symbols.map(function(symbol) {
                    var symbolData = [];
                    dataPoints[symbol].map(function(points) {
                        symbolData.push(points);
                    })
                    dataSets.push({
                        label:symbol,
                        data:symbolData,
                        borderWidth: 1
                    })
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
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default Chart;