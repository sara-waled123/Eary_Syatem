import React from "react";
import "../style/Section.css";
import Involve from "../../../assets/images/involve.png";

const gitInvolved = () => {
  return (
    //-- Involved Section --
    <div className="box">
      <div className="format">
        <h1 className="center">Get involved</h1>
        <br />
        <h4>Become a Member</h4>
        <p className="text-grey">
          Become a Member of <span className="tag-light-grey">"Eary"</span> and
          stay on top of the latest news, from pioneering research breakthroughs
          to our latest campaign successes
        </p>
        <br />

        <h4>Fundraise</h4>
        <p className="text-grey">
          Fancy raising money to help fund our hearing research, support
          services and campaigns for equality? Your support will make a huge
          difference!
        </p>
        <br />

        <h4>Campaigner</h4>
        <p className="text-grey">
          All our campaigns are based on our research and policy work.
        </p>
        <br />

        <h4>Jobs</h4>
        <p className="text-grey">we need the right people in our team.</p>
        <br />

        <h4>Volunteer with us</h4>
        <p className="text-grey">
          Volunteer with us and make a valuable difference to people who are
          deaf, have hearing loss or tinnitus. Any contribution you make, no
          matter how small, can have a big impact.
        </p>
      </div>

      <div className="format">
        <img src={Involve} className="infoImg" alt="involved" width="100%" />
      </div>
    </div>
  );
};

export default gitInvolved;
