import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{

    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels:[
                    '2017-01-01',
                    '2017-01-02',
                    '2017-01-03',
                    '2017-01-04',
                    '2017-01-05'
                ],
                datasets:[
                    {
                        label:'BTC',
                        data:[
                            1100,
                            1500,
                            1800,
                            2100,
                            2800
                        ],
                        borderWidth: 1
                    },
                    {
                        label:'BCH',
                        data:[
                            100,
                            110,
                            125,
                            160,
                            180
                        ],
                        borderWidth: 1
                    },
                    {
                        label:'ETH',
                        data:[
                            1000,
                            1005,
                            1018,
                            1165,
                            1250
                        ],
                        borderWidth: 1
                    }
                ]
            }
        }
    }

    render() {
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