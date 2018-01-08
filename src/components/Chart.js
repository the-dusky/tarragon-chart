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
        return fetch('https://tarragon-server.gadgetlabs.com/assets?startDate=2017-01-01&endDate=2017-01-07&granularity=day')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    chartData:{
                        labels:['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05'],
                        datasets:[
                            {
                                label:'BTC',
                                data:[1100, 1500, 1800, 2100, 2800],
                                borderWidth: 1
                            },
                            {
                                label:'BCH',
                                data:[100, 110, 125, 160, 180],
                                borderWidth: 1
                            },
                            {
                                label:'ETH',
                                data:[1000, 1005, 1018, 1165, 1250],
                                borderWidth: 1
                            }
                        ]
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