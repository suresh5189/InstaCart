import axios from "axios";

const baseURL = "https://instacart-xqwi.onrender.com";

const apiServices = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------------------------------------------------

export const sendOTPRegister = async (email) => {
  try {
    const response = await apiServices.post("/register", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Registering");
  }
};

// --------------------------------------------------------------------------

export const verifyOTPRegister = async (email, password, enteredotp) => {
  try {
    const response = await apiServices.post("/verify/register", {
      email,
      password,
      enteredotp,
    });

    if (response && response.status === 200) {
      const accessToken = response.data.JWTToken.accessToken;
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      return { status: "success", message: "OTP verified successfully" };
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Error verifying OTP. Please try again.");
    }
  }
};

// --------------------------------------------------------------------------------

export const login = async (email, password) => {
  try {
    const response = await apiServices.post("/login", { email, password });
    if (response.data === 200) {
      const accessToken = response.data.JWTToken.accessToken;
      localStorage.setItem("AccessToken", accessToken);
    }
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Logging In");
  }
};

// ------------------------------------------------------------------------------

export const fetchCategoryList = async () => {
  try {
    const response = await apiServices.get("/store/categorylist");
    return response.data.data.categoryList;
  } catch (error) {
    console.error("Error Fetching Category List", error);
    throw new Error("Error Fetching Category List");
  }
};

// -----------------------------------------------------------------------------

export const storeData = async () => {
  try {
    const response = await apiServices.get(
      "/store/category?main_category_id=1"
    );
    return response.data.data.storeData;
  } catch (error) {
    console.error("Error Fetching Store Data.", error);
    throw new Error("Error Fetching Store Data");
  }
};

// -----------------------------------------------------------------------------

export const storeDetailData = async (storeId) => {
  try {
    const response = await apiServices.get(
      `/store/category/populargifts?storeId=7`
    );
    return response.data.data.productsByCategory;
  } catch (error) {
    console.error("Error Fetching Store Detail Data.", error);
    throw new Error("Error Fetching Store Detail Data");
  }
};

// -------------------------------------------------------------------------------

export default apiServices;
