import axios from "axios";

export const apiInstance = axios.create({
  // baseURL: "http://localhost:5001/irielivity-commerce/us-central1/api",
  baseURL: "https://us-central1-irielivity-commerce.cloudfunctions.net/api",
});
