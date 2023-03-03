import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://express-tracker-server.onrender.com'
});
