import React from "react";
import hearing from "../../../assets/images/hearing.png";
import "../style/Section.css";

const Top = () => {
  return (
    //-- Top --
    <header className="header">
      <img className="image" src={hearing} alt="Eary" />
      <div className="writeOn">
        <h1 className="fontOnImg">Eary ..)))</h1>
      </div>
    </header>
  );
};

export default Top;
