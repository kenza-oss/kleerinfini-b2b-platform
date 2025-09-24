import axios from "./axios";

// create a payment
export const createPayment = async (formData) => {
  const res = await axios.post("/api/chargily-payment/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// optionally fetch payments or status
export const getPayments = async () => {
  const res = await axios.get("/api/chargily-payment/");
  return res.data;
};
