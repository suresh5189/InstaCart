import React, { useState } from "react";
import InstacartBanner from "../images/instacartBanner.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeName from "./ChangeName";
import VerifyChangedPhoneNumber from "./VerifyChangedPhoneNumber";

const User = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

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

  const Email = useSelector((state) => state.user.email);
  const Password = useSelector((state) => state.user.password);
  const FirstName = useSelector((state) => state.user.firstName);
  const LastName = useSelector((state) => state.user.lastName);
  const PhoneNumber = useSelector((state) => state.user.phoneno);

  const Name =
    FirstName || LastName ? `${FirstName} ${LastName}` : Email.split("@")[0];

  return (
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
                <span className="UserEmailId">{Email}</span>
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
                <span className="UserEmailId">{Name}</span>
                <span className="ChangeButton" onClick={handleChangeNameModal}>
                  Change
                </span>
              </div>
            </div>
            <div className="UserEmailInformationDetailPassword">
              <div className="UserPhone">
                <span className="UserEmailId">Phone Number</span>
                <span className="UserEmailId">{PhoneNumber}</span>
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
  );
};

export default User;
