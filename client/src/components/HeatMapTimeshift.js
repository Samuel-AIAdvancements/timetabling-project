import React, { useState, useEffect } from 'react';
import './HeatMapTimeshift.css';

var heatmap1 = [
    [135, -232, 495, -1257, 143, -1200, -672, 897, -191, 581, 466, -1498],
    [-780, 214, -904, 1236, 1321, -1473, 702, -891, 1003, 566, 387, -1114],
    [276, -1240, 1041, -1153, -585, 456, -907, 948, -1164, 928, -67, 1411],
    [-859, 1088, 564, 800, -370, -889, 1276, 685, 1144, -1394, -1086, 835],
    [221, 1209, -1029, 977, -490, 943, 1190, 1189, -869, -1089, -737, 745]
  ];
  
  var heatmap2 = [
    [1200, 320, -174, 550, 380, -1500, 1111, 897, 922, -1051, 220, 270],
    [1000, 1204, 204, -1236, 1111, -1013, -872, 111, -703, -556, -87, 2104],
    [22, 200, -41, 115, 285, -146, 207, -348, 164, -28, 267, -111],
    [859, -108, -164, -80, 70, 189, -27, -85, -144, 39, 1086, -35],
    [-221, -209, 329, -77, 90, -43, -90, -1198, 169, 91, 137, -95]
  ];

function getColor(value) {
  if(value >= -1500 && value < -750) return "red";
  else if(value >= -750 && value < -250) return "orange";
  else if(value >= -250 && value < 250) return "yellow";
  else if(value >= 250 && value < 750) return "lightgreen";
  else return "darkgreen";
}

const HeatMapTimeshift = () => {
  const [heatmap, setHeatmap] = useState(heatmap1);
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmap(heatMap => heatMap === heatmap1 ? heatmap2 : heatmap1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <table className="heatmap-timeshift">
      <thead>
        <tr>
          <th>Day\Time</th>
          {Array.from({length: 12}, (_, i) => i + 8).map(time => <th>{time}</th>)}
        </tr>
      </thead>
      <tbody>
        {heatmap.map((row, idx) => (
          <tr>
            <td className="first-column">{weekdays[idx]}</td>
            {row.map(value => <td style={{backgroundColor: getColor(value)}}>{value}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default HeatMapTimeshift;