import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import HeatMapTable from "./components/HeatMapTable";
import GoodnessScoreLineGraph from "./components/GoodnessScoreLineGraph";
import HeatMapTimeshift from "./components/HeatMapTimeshift";
import OverallTimetable from "./components/OverallTimetable"

//<HeatMapTimeshift></HeatMapTimeshift>
//<GoodnessScoreLineGraph data={[50, 100, 125, 200, 240, 300, 350, 400, 420, 500]} />
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <OverallTimetable></OverallTimetable>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);