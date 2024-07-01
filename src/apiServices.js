import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = "https://instacart-xqwi.onrender.com";

const apiServices = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------------------------------------------------

// Refresh Token

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await apiServices.post("/refreshAccessToken", {
      refreshToken,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed To Refresh Access Token"
    );
  }
};

// ----------------------------------------------------------------------------

// Register

export const sendOTPRegister = async ({ email, country_code, phoneNumber }) => {
  let requestBody = {};
  // console.log(email,country_code,phoneNumber);
  try {
    if (email) {
      requestBody = { email };
    } else if (country_code && phoneNumber) {
      requestBody = {
        country_code,
        phoneno: phoneNumber,
      };
    } else {
      throw new Error("Invalid Parameters For Registration");
    }
    // console.log(requestBody);
    const response = await apiServices.post("/register", requestBody);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Registering");
  }
};

// --------------------------------------------------------------------------

// Verifying the Register

// export const verifyOTPRegister = async (email,country_code,phoneno, password, enteredotp, otpid) => {
//   try {
//     const response = await apiServices.post("/register/verify", {
//       email,
//       country_code,
//       phoneno,
//       password,
//       enteredotp,
//       otpid,
//     });

//     if (response.status === 201) {
//       const accessToken = response.data.data.JWTToken.accessToken;
//       localStorage.setItem("AccessToken", accessToken);
//       return { status: "success", message: "OTP verified successfully" };
//     } else {
//       throw new Error("Invalid OTP");
//     }
//   } catch (error) {
//     throw new Error(
//       error.response.data.msg || "Error verifying OTP. Please try again."
//     );
//   }
// };

export const verifyOTPRegister = async (
  email,
  country_code,
  phoneno,
  password,
  enteredotp,
  otpid
) => {
  try {
    let requestBody = {};
    if (email) {
      // Sign up with email
      requestBody = { email, password, enteredotp, otpid };
    } else if (country_code && phoneno) {
      // Sign up with phone number
      requestBody = { country_code, phoneno, enteredotp, otpid };
    } else {
      throw new Error("Invalid parameters for OTP verification");
    }

    const response = await apiServices.post("/register/verify", requestBody);

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

export const login = async (identifier, credential) => {
  try {
    let response;
    if (identifier.includes("@")) {
      // Email login
      response = await apiServices.post("/login", {
        email: identifier,
        password: credential,
      });
    } else {
      // Phone number login
      response = await apiServices.post("/login", {
        phoneno: credential,
        country_code: identifier,
      });
    }

    if (response.status === 200) {
      if (identifier.includes("@")) {
        // Handle email login response
        const { accessToken, refreshToken } = response.data.data.JWTToken;
        localStorage.setItem("AccessToken", accessToken);
        localStorage.setItem("RefreshToken", refreshToken);
        const decodeRefreshToken = jwtDecode(refreshToken);
        const userId = decodeRefreshToken.userId;
        return { ...response.data, userId };
      } else {
        // Handle phone number login response
        return { data: response.data, userId: null }; // Adjust as per your backend response
      }
    } else {
      throw new Error("Login Failed");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Login Failed");
    }
  }
};

// ------------------------------------------------------------------------------

// Verify Login
export const verifyOTPLogin = async (
  country_code,
  phoneno,
  otpid,
  enteredotp
) => {
  try {
    let requestBody = {
      country_code,
      phoneno,
      enteredotp,
      otpid,
    };

    // console.log(requestBody);
    const response = await apiServices.post("/login/verify", requestBody);
    if (response.status === 201) {
      const { accessToken, refreshToken } = response.data.data.JWTToken;
      localStorage.setItem("AccessToken", accessToken);
      localStorage.setItem("RefreshToken", refreshToken);
      return { status: "success", message: "OTP verified successfully" };
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.msg || "Error verifying OTP. Please try again."
    );
  }
};

// -------------------------------------------------------------------------------

// Resend OTP

export const resendOTP = async (otpid) => {
  try {
    const response = await apiServices.post("/resendOtp", { otpid });
    // console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Resending OTP");
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

// Checkout

export const checkoutAPI = async (orderData, accessToken) => {
  try {
    const response = await apiServices.post("/orders/checkout", orderData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Adding Order");
  }
};

// ------------------------------------------------------------------------------------

// Add Address

export const addAddress = async (refreshToken, addressData) => {
  try {
    const response = await apiServices.post("/add-address", addressData, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Adding Address");
  }
};

// --------------------------------------------------------------------------------------

// Edit Address

export const editAddress = async (
  accessToken,
  addressId,
  updatedAddressData
) => {
  try {
    const response = await apiServices.post(
      `/addresses/${addressId}/edit-address`,
      updatedAddressData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Editing Address");
  }
};

// ----------------------------------------------------------------------------------------

// Delete Address

export const deleteAddress = async (accessToken, addressId) => {
  try {
    const response = await apiServices.delete(
      `/addresses/${addressId}/delete-address`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Deleting Address");
  }
};

// ---------------------------------------------------------------------------------------

// Get All Address

export const getAllAddress = async (accessToken) => {
  try {
    const response = await apiServices.get("/addresses", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Fetching Addresses");
  }
};

// ----------------------------------------------------------------------------------------

// Add To Save Product

export const addToSavedProduct = async (productId, accessToken) => {
  try {
    const response = await apiServices.post(
      "/products/addtosaved",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Errror Adding To Save Product"
    );
  }
};

// ----------------------------------------------------------------------------------------

// Remove From Saved Product

export const removeFromSavedProduct = async (productId, accessToken) => {
  try {
    const response = await apiServices.delete(
      `/products/saved/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error Reomving From Saved Product"
    );
  }
};

// ------------------------------------------------------------------------------------------

// Add Order

export const addOrder = async (accessToken, orderData) => {
  try {
    const response = await apiServices.post("/orders/checkout", orderData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Adding Order");
  }
};

// -------------------------------------------------------------------------------------------

// Get Orders

export const getOrders = async (accessToken) => {
  try {
    const response = await apiServices.get("/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error Fetching Orders");
  }
};

// -------------------------------------------------------------------------------------------

// Get Order Details

export const getOrdersDetails = async (accessToken, orderId) => {
  try {
    const response = await apiServices.get("/orders/my-orders/orderdetail", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        orderId: orderId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error Fetching Order Details"
    );
  }
};

// ---------------------------------------------------------------------------------------------

// Add List

export const addList = async (accessToken, listData) => {
  try {
    const response = await apiServices.post(
      "/store/lists/createlist",
      listData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed To Create List");
  }
};

// ---------------------------------------------------------------------------------------------

// Get List Covers Images

export const getListCoverImages = async (accessToken) => {
  try {
    const response = await apiServices.get('/store/lists/cover-images', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch list cover images');
  }
};

export default apiServices;
