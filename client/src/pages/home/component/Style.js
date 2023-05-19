import React from "react";
import "../style/Section.css";
import Style from "../../../assets/images/Style.png";
import Headphone1 from "../../../assets/images/Headphone1.png";
import Headphone2 from "../../../assets/images/Headphone2.png";
import Headphone3 from "../../../assets/images/Headphone3.png";
import Headphone4 from "../../../assets/images/Headphone4.png";

const style = () => {
  return (
    //--style Section
    <div className="box">
      <div className="format">
        <img
          src={Style}
          className="infoImg"
          alt="info"
          width="600"
          height="750"
        />
        <br />
        <br />
      </div>

      <div className="format">
        <h1 className="center">Hearing feels like second nature</h1>
        <br />
        <br />
        <h5 className="text-grey">
          Hear like no other with the ReSound ONE that’s best suited for you –
          now including new styles.
        </h5>
        <br />
        <button className="form-btn">
          <a href="https://www.resound.com/en/hearing-aids/resound-hearing-aids/resound-one">
            NEW STYLE ' V '
          </a>
        </button>
      </div>


      <div className="fourImg">
        <div className="HeadphonesImg">
          <div className="display">
            <div className="color">black</div>
            <img src={Headphone1} alt="Headphones" width="100%" />
          </div>
        </div>

        <div className="HeadphonesImg">
          <div className="display">
            <div className="color">brown</div>
            <img src={Headphone2} alt="Headphones" width="100%" />
          </div>
        </div>
        <div className="HeadphonesImg">
          <div className="display">
            <div className="color">black</div>
            <img src={Headphone3} alt="Headphones" width="100%" />
          </div>
        </div>
        <div className="HeadphonesImg">
          <div className="display">
            <div className="color">brown</div>
            <img src={Headphone4} alt="Headphones" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default style;
