import React from "react";
import InstacartBanner from "../images/instacartBanner.webp";
import { useNavigate } from "react-router-dom";

const User = () => {

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    }

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
                <span className="UserEmailId">temp123@gmail.com</span>
                <span className="ChangeButton">Change</span>
              </div>
            </div>
            <div className="UserEmailInformationDetailPassword">
              <span className="UserEmail">Password</span>
              <span className="ChangeButton">Change</span>
            </div>
          </div>
        </div>
        <div
          style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
        ></div>
        <div className="UserInformation">
          <div className="UserInformationTitle">Peronsal Information</div>
          <div className="UserEmailInformation">
            <div className="UserEmailInformationDetail">
              <div>
                <span className="UserEmail">Name</span>
              </div>
              <div className="UserIdAndChange">
                <span className="UserEmailId">temp123</span>
                <span className="ChangeButton">Change</span>
              </div>
            </div>
            <div className="UserEmailInformationDetailPassword">
              <div className="UserPhone">
                <span className="UserEmailId">Phone Number</span>
                <span className="UserEmailId">No Phone Number</span>
              </div>
              <span className="ChangeButton">Change/Verify</span>
            </div>
          </div>
        </div>
        <div className="UserBack" onClick={handleBackToHome}>
          <button>Back</button>
        </div>
      </div>
    </div>
  );
};

export default User;
