import axios from 'axios';

const TIMEOUT = 10000;

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com',
  timeout: TIMEOUT,
  headers: {
    'X-CMC_PRO_API_KEY': process.env.EXPO_PUBLIC_COIN_MARKET_CAP_API_KEY,
  },
});

export default api;
