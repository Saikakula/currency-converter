import React from "react";
import styled from "@emotion/styled";

// import components
import AppBody from "./AppBody";

// import context
import CurrencyExchangeProvider from "../context/CurrencyExchange";

// styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 60px;
  min-height: 75vh;
`;

const AppTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  color: #1769aa;
  font-family: "Roboto", sans-serif;
`;

const AppBodyWrapper = styled.div`
  display: flex;
  padding: 30px 20px 20px;
  width: 480px;
`;
const App = () => (
  <CurrencyExchangeProvider>
    <AppContainer>
      <AppTitle>Currency Converter</AppTitle>
      <AppBodyWrapper>
        <AppBody />
      </AppBodyWrapper>
    </AppContainer>
  </CurrencyExchangeProvider>
);

export default App;
