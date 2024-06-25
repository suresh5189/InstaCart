import React, { useEffect, useState } from "react";
import InstacartBanner from "../images/instacartBanner.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "../components/Auth/ChangePassword";
import ChangeEmail from "../components/Auth/ChangeEmail";
import ChangeName from "../components/Auth/ChangeName";
import VerifyChangedPhoneNumber from "../components/Auth/VerifyChangedPhoneNumber";
import { getUserDetails } from "../apiServices";

const User = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleChangeEmail = () => {
    setShowEmailModal(true);
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  const handleChangeNameModal = () => {
    setShowNameModal(true);
  };

  const handleCloseNameModal = () => {
    setShowNameModal(false);
  };
  const handleChangePhoneModal = () => {
    setShowPhoneModal(true);
  };

  const handleClosePhoneModal = () => {
    setShowPhoneModal(false);
  };

  let Password = useSelector((state) => state.user.password);
  const formatPassword = (Password) => {
    if (!Password || Password.length <= 3) {
      return Password;
    }
    const visiblePart = Password.substring(Password.length - 3);
    const hiddenPart = "*".repeat(Password.length - 3);
    return hiddenPart + visiblePart;
  };

  Password = formatPassword(Password);

  const [userDetails, setUserDetails] = useState(null);

  const refreshToken = localStorage.getItem("RefreshToken");
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const getuserData = await getUserDetails(refreshToken);
        const userData = getuserData.data.data.userData;
        setUserDetails(userData);
        // console.log(userData);
        // dispatch(updateProfile(userData));
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (refreshToken) {
      fetchUserDetails();
    }
  }, [refreshToken, dispatch]);

  if (isLoading) {
    return (
      <div className="LoadingUserAccount">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!userDetails) {
    return <p>No user details available.</p>;
  }

  return (
    <>
      <div className="User">
        <div className="UserBannerImage">
          <img src={InstacartBanner} alt="" />
        </div>
        <div className="UserHead">
          <div className="UserAccount">
            <h1>Account setting</h1>
          </div>
          <div className="UserInformation">
            <div className="UserInformationTitle">Account Information</div>
            <div className="UserEmailInformation">
              <div className="UserEmailInformationDetail">
                <div>
                  <span className="UserEmail">Email Address</span>
                </div>
                <div className="UserIdAndChange">
                  <span className="UserEmailId">{userDetails.email}</span>
                  <span className="ChangeButton" onClick={handleChangeEmail}>
                    Change
                  </span>
                </div>
              </div>
              <div className="UserEmailInformationDetail">
                <div>
                  <span className="UserEmail">Password</span>
                </div>
                <div className="UserIdAndChange">
                  <span className="UserEmailId">{Password}</span>
                  <span className="ChangeButton" onClick={handleChangePassword}>
                    Change
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
          ></div>
          <div className="UserInformation">
            <div className="UserInformationTitle">Personal Information</div>
            <div className="UserEmailInformation">
              <div className="UserEmailInformationDetail">
                <div>
                  <span className="UserEmail">Name</span>
                </div>
                <div className="UserIdAndChange">
                  <span className="UserEmailId">
                    {userDetails.firstName} {userDetails.lastName}
                  </span>
                  <span
                    className="ChangeButton"
                    onClick={handleChangeNameModal}
                  >
                    Change
                  </span>
                </div>
              </div>
              <div className="UserEmailInformationDetailPassword">
                <div className="UserPhone">
                  <span className="UserEmailId">Phone Number</span>
                  <span className="UserEmailId">{userDetails.phoneno}</span>
                </div>
                <span className="ChangeButton" onClick={handleChangePhoneModal}>
                  Change/Verify
                </span>
              </div>
            </div>
          </div>
          <div className="UserBack" onClick={handleBackToHome}>
            <button>Back</button>
          </div>
        </div>
        {showPasswordModal && <ChangePassword closeModal={handleCloseModal} />}
        {showEmailModal && (
          <ChangeEmail closeEmailModal={handleCloseEmailModal} />
        )}
        {showNameModal && <ChangeName closeNameModal={handleCloseNameModal} />}
        {showPhoneModal && (
          <VerifyChangedPhoneNumber closePhoneModal={handleClosePhoneModal} />
        )}
      </div>
    </>
  );
};

export default User;
