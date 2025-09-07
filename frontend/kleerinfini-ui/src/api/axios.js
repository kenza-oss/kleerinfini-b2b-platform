// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kleer-infini-backend.onrender.com/api',
});

export default api;
