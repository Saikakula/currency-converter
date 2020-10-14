import React from "react";
import styled from "@emotion/styled";

// import data
import currencyMap from "./../data/currency";

// styled components
const Select = styled.select`
  border: 1px solid #bbdefb;
  padding: 4px 10px;
  border-radius: 4px;
  color: #2196f3;
  width: 30%;
  margin-left: 5%;
`;

export default ({ onChange, defaultValue }) => {
  // select change handler
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <Select onChange={handleChange} defaultValue={defaultValue}>
      {Object.keys(currencyMap).length &&
        Object.keys(currencyMap).map((currency) => {
          const { code } = currencyMap[currency];
          return (
            <option key={currency} value={currency}>
              {code}
            </option>
          );
        })}
    </Select>
  );
};
