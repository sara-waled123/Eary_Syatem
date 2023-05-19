import React from "react";
import "../style/Section.css";
import identity from "../../../assets/images/Identity.png";

const Identity = () => {
  return (
    //--identity--
    <div className="box">
      <div className="format">
        <h1 className="center">ReSound Sound Identity</h1>
        <br />
        <p className="text-grey">
          Sound is at the heart of everything we do. That’s why we’ve expanded
          our identity by adding sound. The new ReSound sound identity expresses
          the attributes of our brand: pioneering, intuitive, accomplished and
          reliable. You can download the ReSound ringtone and sonic logo here:{" "}
        </p>
      </div>

      <div className="format">
        <img src={identity} className="infoImg" alt="involved" width="100%" />
      </div>
    </div>
  );
};

export default Identity;
