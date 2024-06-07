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

export const verifyOTPRegister = async (email, password, enteredotp, otpid) => {
  try {
    const response = await apiServices.post("/register/verify", {
      email,
      password,
      enteredotp,
      otpid,
    });

    if (response.status === 201) {
      const accessToken = response.data.data.JWTToken.accessToken;
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      return { status: "success", message: "OTP verified successfully" };
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    throw new Error(
      error.response.data.msg || "Error verifying OTP. Please try again."
    );
  }
};

// --------------------------------------------------------------------------------

export const login = async (email, password) => {
  try {
    const response = await apiServices.post("/login", { email, password });
    if (response.status === 200) {
      const accessToken = response.data.data.JWTToken.accessToken;
      localStorage.setItem("AccessToken", accessToken);
    }
    return response;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Please Enter Correct Email And Password"
    );
  }
};

// -------------------------------------------------------------------------------

export const changePassword = async (
  accessToken,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await apiServices.post(
      "/userprofile/changepassword",
      {
        newPassword,
        confirmNewPassword: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Changing Password");
  }
};

// --------------------------------------------------------------------------------

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
