import React from "react";
import '../../components/css/Payment.css'
import Phone from "../../images/phone.webp";
import Qrcode from "../../images/qrcode.webp";

function Payment() {
  return (
    <div className="PhoneAndQrcode">
      <img src={Phone} alt="phone"  className="PhoneImage"/>
      <div className="PhoneAndQrcodeText">
        <h2 className="PhoneAndQrcodeTextTitle">
          Get the full Instacart experience
        </h2>
        <div className="PhoneAndQrcodeTextSub">
          Scan the QR code with your camera. First delivery is free.
        </div>
      </div>
      <img src={Qrcode} alt="qrcode" className="QrcodeImage" />
    </div>
  );
}

export default Payment;
