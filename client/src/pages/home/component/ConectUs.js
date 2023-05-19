import React from "react";
import "../style/Section.css";

const ConectUs = () => {
  return (
    <div className="header">
      <h1 className="center">Contact us</h1>
      <br />
      <h5>
        If you’re deaf, have hearing loss or tinnitus and need free confidential
        and impartial information and support, contact us.
      </h5>
      <br />
      <p className="text-grey">We’re open 8.30am to 5pm, Monday to Friday </p>
      <br />
      <button className="form-btn">
        <a href="http://localhost:3000/contact">Contact us</a>
      </button>
    </div>
  );
};

export default ConectUs;
