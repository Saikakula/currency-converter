import React from "react";
import styled from "@emotion/styled";

// import data
// import currency from './../data/currency'

// import contexts
import { useCurrencyExchange } from "../context/CurrencyExchange";

// import components
import CurrencyDropdown from "./CurrencyDropdown";
import BaseCurrencyInput from "./BaseCurrencyInput";

// styled components
const AppBodyContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #42a5f5;
  font-family: "Roboto", sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-top: 8px;
`;

const Input = styled.input`
  border: 1px solid #bbdefb;
  padding: 6px 10px;
  border-radius: 4px;
  width: 65%;
  color: #0d47a1;
`;

const ErrorBox = styled.div`
  color: #ef6c00;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  margin-top: 16px;
`;

const AppBody = () => {
  // side-effects
  const {
    onBaseCurrencyChange,
    onTargetCurrencyChange,
    onBaseAmountChange,
    targetAmount,
    error
  } = useCurrencyExchange();

  return (
    <AppBodyContainer>
      <Label>Original amount</Label>
      <InputContainer>
        <BaseCurrencyInput
          defaultValue={"0.00"}
          onChange={onBaseAmountChange}
        />
        <CurrencyDropdown onChange={onBaseCurrencyChange} defaultValue="USD" />
      </InputContainer>
      <Label style={{ marginTop: "20px" }}>Converted amount</Label>
      <InputContainer>
        <Input value={targetAmount} onChange={() => {}} />
        <CurrencyDropdown
          onChange={onTargetCurrencyChange}
          defaultValue="INR"
        />
      </InputContainer>
      {error && <ErrorBox>{error}</ErrorBox>}
    </AppBodyContainer>
  );
};

export default AppBody;
