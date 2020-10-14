import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  border: 1px solid #bbdefb;
  color: #0d47a1;
  padding: 6px 10px;
  border-radius: 4px;
  width: 65%;
`;

const BaseCurrencyInput = ({ onChange }) => {
  // component's state
  const [rawValue, setRawValue] = useState(0);

  useEffect(() => {
    const baseAmount = rawValue / 100;
    onChange(baseAmount);
  }, [rawValue, onChange]);

  // input change handler
  const handleChange = (event) => {
    const { value } = event.target;
    const decCount = `${value}`.split(".")[1].length;
    const delNumber = decCount === 1 ? `${value}`.slice(-1) : null;
    const addNumber = decCount === 3 ? `${value}`.slice(-1) : null;

    // case if, base amount is zero
    if (rawValue === 0 && addNumber !== null) {
      setRawValue(parseFloat(addNumber));
    }
    // case if, type is addition
    else if (rawValue && addNumber !== null) {
      setRawValue(parseFloat(`${rawValue}${addNumber}`));
    }

    // case if, type is deletion
    else if (rawValue && `${rawValue}`.length > 1 && delNumber !== null) {
      setRawValue(parseFloat(`${rawValue}`.slice(0, -1)));
    }

    // case if, type is deletion and value is already zero
    else if (rawValue && delNumber !== null) {
      setRawValue(0);
    }
  };

  const formattedValue = (rawValue / 100).toFixed(2);
  return <Input onChange={handleChange} value={formattedValue} />;
};

BaseCurrencyInput.defaultValue = {};

export default BaseCurrencyInput;
