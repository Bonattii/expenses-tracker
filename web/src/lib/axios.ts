import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://expenses-tracker.azurewebsites.net'
});
