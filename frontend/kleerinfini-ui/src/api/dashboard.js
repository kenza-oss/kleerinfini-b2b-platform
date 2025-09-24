import axios from "axios";

export const getDashboard = async (id) => {
  const res = await axios.get(`/api/dashboard/${id}/`);
  return res.data;
};

export const updateDashboard = async (id, data) => {
  const res = await axios.put(`/api/dashboard/${id}/`, data);
  return res.data;
};
