import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Hero from "./Hero";

const TermsConditions = () => {
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#eff6ff,#ffffff,#dbeafe)",
      padding: "40px 15px",
      fontFamily: "Arial, sans-serif",
    },

    container: {
      maxWidth: "900px",
      margin: "0 auto",
      background: "#ffffff",
      borderRadius: "20px",
      padding: "35px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    },

    backBtn: {
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      marginBottom: "20px",
    },

    title: {
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "5px",
      color: "#0f172a",
    },

    date: {
      color: "#64748b",
      marginBottom: "25px",
    },

    sectionTitle: {
      fontSize: "18px",
      fontWeight: "700",
      marginTop: "25px",
      color: "#1e293b",
    },

    text: {
      fontSize: "15px",
      lineHeight: "1.7",
      color: "#475569",
      marginTop: "8px",
    },
  };

  return (
    <>
    <Hero />
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.date}>Effective Date: June 10, 2026</p>

        <h2 style={styles.sectionTitle}>Website Purpose</h2>
        <p style={styles.text}>
          This website is intended to provide ACA Marketplace assistance and
          connect users with licensed insurance professionals.
        </p>

        <h2 style={styles.sectionTitle}>No Insurance Offer</h2>
        <p style={styles.text}>
          We do not directly provide insurance coverage. We only connect users
          with licensed agents.
        </p>

        <h2 style={styles.sectionTitle}>No Guarantee</h2>
        <p style={styles.text}>
          We do not guarantee approval, eligibility, enrollment, or financial assistance.
        </p>

        <h2 style={styles.sectionTitle}>Consent to Contact</h2>
        <p style={styles.text}>
          By submitting your information, you agree to be contacted via phone,
          SMS, email, or prerecorded messages.
        </p>

        <h2 style={styles.sectionTitle}>Call Recording</h2>
        <p style={styles.text}>
          Calls may be recorded for quality assurance and compliance purposes.
        </p>

        <h2 style={styles.sectionTitle}>Limitation of Liability</h2>
        <p style={styles.text}>
          We are not responsible for any damages resulting from use of this website.
        </p>

        <h2 style={styles.sectionTitle}>Changes</h2>
        <p style={styles.text}>
          We may update these Terms at any time without prior notice.
        </p>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default TermsConditions;
