import React from "react";
import DateTime from "react-datetime";

const DateTimePicker = ({
  value,
  setValue,
  name,
  hideTime,
  hideDate,
  placeholder,
}) => {
  return (
    <DateTime
      value={value}
      onChange={setValue}
      className="flex-grow"
      inputProps={{
        name,
        placeholder,
      }}
      timeFormat={!hideTime}
      dateFormat={!hideDate && "D MMM, YYYY"}
      renderInput={(props) => {
        return <input {...props} value={value ? props.value : ""} />;
      }}
    />
  );
};

export default DateTimePicker;
