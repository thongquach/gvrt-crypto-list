import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com',
  timeout: 10000,
  headers: {
    'X-CMC_PRO_API_KEY': '5f84ab80-23ff-41dc-9744-d587a26ab4e2',
  },
});

export default api;
