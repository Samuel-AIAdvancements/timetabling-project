import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './GoodnessScoreLineGraph.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



class GoodnessScoreLineGraph extends React.Component {
    render() {
        const labels = Array.from({ length: this.props.data.length }, (_, i) => i + 1); // x axis
        const data_array = this.props.data; // y axis

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Change in Goodness Score Across Generations',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Generations',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Goodness Score',
                    },
                },
            }
        };

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Goodness Score',
                    data: data_array,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    fill: false
                }
            ],
        };

        return (
            <div className="chart-container">
                <Line options={options} data={data} />
            </div>
        );
    }
}

export default GoodnessScoreLineGraph;