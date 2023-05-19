import React from "react";
import "../style/Section.css";
import Info from "../../../assets/images/Info.png";

const infoSupport = () => {
  return (
    //--info Section--
    <div className="box">
      <div className="format">
        <img
          src={Info}
          className="infoImg"
          alt="info"
          width="600"
          height="750"
        />
        <br />
        <br />
        <button className="form-btn">
          <a href="https://rnid.org.uk/information-and-support/take-online-hearing-check/">
            Support
          </a>
        </button>
      </div>

      <div className="format">
        <h1 className="center">Get Information Online</h1>
        <br />
        <br />
        <h5 className="center">
          Find information on hearing loss and tinnitus work,benefits,your right
        </h5>
        <br />
        <br />
        <br />
        <br />
        <p className="text-grey">
          Signs of gradual hearing loss:
          <br />
          The common signs that you might have hearing loss:
          <br />
          turning the TV up louder than your family wants it, finding it hard to
          follow conversation in pubs and restaurants, struggling to hear on the
          phone,often asking people to repeat what they say, having your partner
          complain that you don’t listen to them, feeling that other people
          mumble.
        </p>

        <p className="text-grey">
          Overview :<br />
          -Hearing loss and deafness happen when sound signals don’t reach the
          brain.
          <br />
          -This is caused by a problem in the hearing system.
          <br />
          -There are two main types of hearing loss. <br />
          -It’s possible to have both types,and this is known as mixed hearing
          loss.
          <br />
        </p>
      </div>
    </div>
  );
};

export default infoSupport;
