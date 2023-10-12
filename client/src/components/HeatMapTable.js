import React from 'react';
import './HeatMapTable.css';

var heatmap = [
  [135, -232, 495, -1257, 143, -1200, -672, 897, -191, 581, 466, -1498],
  [-780, 214, -904, 1236, 1321, -1473, 702, -891, 1003, 566, 387, -1114],
  [276, -1240, 1041, -1153, -585, 456, -907, 948, -1164, 928, -67, 1411],
  [-859, 1088, 564, 800, -370, -889, 1276, 685, 1144, -1394, -1086, 835],
  [221, 1209, -1029, 977, -490, 943, 1190, 1189, -869, -1089, -737, 745]
];

function getColor(value) {
  if(value >= -1500 && value < -750) return "red";
  else if(value >= -750 && value < -250) return "orange";
  else if(value >= -250 && value < 250) return "yellow";
  else if(value >= 250 && value < 750) return "lightgreen";
  else return "darkgreen";
}

const HeatMapTable = () => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <table className="heatmap-table">
      <thead>
        <tr>
          <th>Day\Time</th>
          {Array.from({length: 12}, (_, i) => i + 8).map(time => <th>{time}</th>)}
        </tr>
      </thead>
      <tbody>
        {heatmap.map((row, idx) => (
          <tr>
            <td>{weekdays[idx]}</td>
            {row.map(value => <td style={{backgroundColor: getColor(value)}}>{value}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default HeatMapTable;