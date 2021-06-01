import moment from "moment";
import React, { useEffect, useState } from "react";
import "../App.css"


const TIMESPAN = {
  month: "This Month",

  year:"This Year"
};

const DateRangeSelector = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startOnMode = "year",
  hideTime,
}) => {
  const [mode, setMode] = useState(startOnMode);
  useEffect(() => {
    if (mode !== "") {
      setStartDate(moment().startOf(mode));
      setEndDate(moment().startOf("day").add(1, "day"));
    
  }}, [mode, setEndDate, setStartDate]);

  return (
    <div width="100%">

      <div className="duration">

<span className="duraHead">DURATION :</span>
        {Object.keys(TIMESPAN).map((k) => (
          <span
            key={k}
            onClick={() => setMode(k)}
            className="dur"
            
            >
            {TIMESPAN[k]}
          </span>
        ))}
      </div>
      
    </div>
  );
};

export default DateRangeSelector;
