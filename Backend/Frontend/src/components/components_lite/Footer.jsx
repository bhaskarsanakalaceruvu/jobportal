import React from "react";
import { Link } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsofService";
const Footer = () => {
  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p>© All rights reserved.</p>
        <p>
          Powered by <a href="https://github.com/ankitpathak62">vit</a>
        </p>
        <p>
          <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link to={"/TermsofService"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;

