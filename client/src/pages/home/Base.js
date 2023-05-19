import React from "react";
import hearing from "../../assets/images/hearing.png";
import InfoSupport from "./component/InfoSupport";
import GitInvolved from "./component/GitInvolved";
import Style from "./component/Style";
import Identity from "./component/Identity";
import ConectUs from "./component/ConectUs";
const Base = () => {
  return (
    <div className="container2">
      {/* -- Top -- */}
      <img className="image" src={hearing} alt="Eary" />
      <InfoSupport />
      <hr />
      <GitInvolved />
      <hr />
      <Style />
      <hr />
      <Identity />
      <hr />
      <ConectUs />
      <br />
    </div>
  );
};

export default Base;
