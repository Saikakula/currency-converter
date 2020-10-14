import axios from "axios";

const fetchExchangeRate = (currencyCode) => {
  return axios({
    method: "GET",
    url: `https://api.exchangeratesapi.io/latest?base=${currencyCode}`
  });
};

export default fetchExchangeRate;
