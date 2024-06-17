import axios from "axios";

const baseURL = "https://instacart-xqwi.onrender.com";

const apiServices = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------------------------------------------------

// Register

export const sendOTPRegister = async (email) => {
  try {
    const response = await apiServices.post("/register", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Registering");
  }
};

// --------------------------------------------------------------------------

// Verifying the Register

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
      localStorage.setItem("AccessToken", accessToken);
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

// Login

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

// Change Password

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

// Change Email
export const changeEmail = async (
  updatedEmail,
  confirmEmail,
  password,
  accessToken
) => {
  try {
    const response = await apiServices.post(
      "/userprofile/changeemail",
      {
        updatedEmail,
        confirmEmail,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Changing Email");
  }
};

// -------------------------------------------------------------------------------

// Change Name

export const changeName = async (firstName, lastName, accessToken) => {
  try {
    const response = await apiServices.post(
      "/userprofile/changename",
      {
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Changing Name");
  }
};

// --------------------------------------------------------------------------------

// Change Phone Number
export const changePhoneNumber = async (
  countryCode,
  phoneNumber,
  accessToken
) => {
  try {
    const response = await apiServices.post(
      "/userprofile/changephonenumber",
      {
        country_code: countryCode,
        phoneno: phoneNumber,
        action: "verify",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error Changing Phone Number"
    );
  }
};

// Verify Changed Phone Number
export const verifyChangedPhoneNumber = async (
  countryCode,
  phoneNumber,
  otpId,
  enteredOtp,
  accessToken
) => {
  try {
    const response = await apiServices.post(
      "/userprofile/verifychangedphonenumber",
      {
        country_code: countryCode,
        phoneno: phoneNumber,
        otpid: otpId,
        enteredotp: enteredOtp,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error Verifying Phone number"
    );
  }
};

// --------------------------------------------------------------------------------

// Reset Password

export const resetPassword = async (email) => {
  try {
    const response = await apiServices.post("/resetpassword", {
      email,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Resetting Password");
  }
};

// --------------------------------------------------------------------------------

export const getUserDetails = async (accessToken) => {
  try {
    const response = await apiServices.get("/userprofile/information", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed To Fetch User Information"
    );
  }
};

// --------------------------------------------------------------------------------
// Category List

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

// Navbar Main Category API

export const storeData = async (id) => {
  try {
    if (id === 8) {
      const response = await apiServices.get(
        `/store/category?main_category_id=${id}`
      );
      return response.data.data;
    } else {
      const response = await apiServices.get(
        `/store/category?main_category_id=${id}`
      );
      return response.data.data.storeData;
    }
  } catch (error) {
    console.error("Error Fetching Store Data.", error);
    throw new Error("Error Fetching Store Data");
  }
};

// -----------------------------------------------------------------------------

// Popular Gift Detail
export const storeDetailData = async () => {
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

// Get Store Front Detail

export const getStoreFrontDetails = async (storeId) => {
  try {
    const response = await apiServices.get(`/store/${storeId}/front`);
    return response.data;
  } catch (error) {
    throw new Error("Error Fetching Store Front Details");
  }
};

// -------------------------------------------------------------------------------

// Get Store Inside Detail

export const getStoreInsideDetails = async (id) => {
  try {
    const response = await apiServices.get(`/store/${id}/info`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Store Inside Details", error.message);
    throw new Error("Error Fetching Store Inside Details");
  }
};

// --------------------------------------------------------------------------------

// Get Store Item Details

export const getStoreIemDetails = async (id) => {
  try {
    const response = await apiServices.get(`/store/collection/store/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Store Item Data", error.message);
    throw new Error("Error Fetching Store Item Data");
  }
};

// --------------------------------------------------------------------------------

// Search Store

export const searchStore = async (
  query,
  storePage = 1,
  storeLimit = 1,
  productsStorePage = 1
  // productsStoreLimit = 2
) => {
  try {
    const response = await apiServices.get("/store/search", {
      params: {
        query,
        storePage,
        storeLimit,
        productsStorePage,
        // productsStoreLimit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Searching Store");
  }
};

// -----------------------------------------------------------------------------------

// Search Inside Store

export const searchInsideStore = async (query, storeId, page = 1) => {
  try {
    const response = await apiServices.get("/store/inside/search", {
      params: {
        query,
        storeId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error Searching Inside Store"
    );
  }
};

// ------------------------------------------------------------------------------------

export default apiServices;
