import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        marginTop: "30px",
        padding: "20px 0",
        textAlign: "center",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <Link
          to="/privacy-policy"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms-conditions"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Terms & Conditions
        </Link>
      </div>

      <p
        style={{
          color: "#64748b",
          fontSize: "14px",
          margin: 0,
        }}
      >
        © {new Date().getFullYear()} Secure Coverage. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;