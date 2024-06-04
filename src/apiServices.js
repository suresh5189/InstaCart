import axios from "axios";

const API_URL =
  "https://api.postman.com/collections/33977373-36e54ad1-9dfb-4bfc-b002-a3372663d430";
// const ACCESS_KEY = "";

const apiServices = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": ACCESS_KEY,
  },
});

export const sendOTPRegister = async (email) => {
  try {
    const response = await apiServices.post("/register", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Registering");
  }
};

export default apiServices;
