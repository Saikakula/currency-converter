import React, { useContext, useEffect, useState } from "react";

// import services
import fetchExchangeRates from "../services/fetchExchangeRate";

const CurrencyContext = React.createContext({});

const CurrencyExchangeProvider = (props) => {
  // state
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [baseAmount, setBaseAmount] = useState(0.0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [targetAmount, setTargetAmount] = useState(0.0);
  const [error, setError] = useState(null);

  // side-effects
  useEffect(() => {
    if (baseCurrency) {
      fetchExchangeRates(baseCurrency)
        .then((response) => {
          const { data } = response;
          const { rates } = data;

          if (Object.keys(rates) && Object.keys(rates).length) {
            setExchangeRates(rates);
          }
        })
        .catch((error) => {
          setError("Oops, Base Currency is unavailable to convert!");
        });
    }
  }, [baseCurrency]);

  useEffect(() => {
    if (
      targetCurrency &&
      typeof baseAmount === "number" &&
      Object.keys(exchangeRates) &&
      targetCurrency in exchangeRates
    ) {
      const exchangeRate =
        (exchangeRates && targetCurrency && exchangeRates[targetCurrency]) || 0;
      const netTargetAmount = exchangeRate * baseAmount;
      const formattedTargetAmount = netTargetAmount.toFixed(2);
      setTargetAmount(formattedTargetAmount);
      setError(null);
    } else if (!(targetCurrency in exchangeRates)) {
      setError("Oops, Target Currency is unavailable to convert!");
    }
  }, [exchangeRates, baseAmount, targetCurrency]);

  // handlers
  function handleBaseCurrencyChange(currency) {
    if (baseCurrency !== currency) {
      setBaseCurrency(currency);
    }
  }

  function handleTargetCurrencyChange(currency) {
    if (targetCurrency !== currency) {
      setTargetCurrency(currency);
    }
  }

  function handleBaseAmountChange(amount) {
    if (baseAmount !== amount) {
      setBaseAmount(amount);
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        onBaseCurrencyChange: handleBaseCurrencyChange,
        onTargetCurrencyChange: handleTargetCurrencyChange,
        onBaseAmountChange: handleBaseAmountChange,
        targetAmount,
        error
      }}
      {...props}
    />
  );
};

export const useCurrencyExchange = () => {
  return useContext(CurrencyContext);
};

export default CurrencyExchangeProvider;
