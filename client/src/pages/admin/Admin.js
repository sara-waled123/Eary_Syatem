import React from "react";
import "./style/admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container1">
      {/* Question */}
      <Link to="question">
        <button className="btn-admin">Question</button>
      </Link>

      {/* Answers */}
      <Link to="response">
        <button className="btn-admin">Answer</button>
      </Link>

      {/* manage users */}
      <Link to="managusers">
        <button className="btn-admin">Manage Accounts</button>
      </Link>
      {/* end of div container */}
    </div>
  );
};

export default Admin;
