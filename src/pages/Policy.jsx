import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Hero from "./Hero";

const PrivacyPolicy = () => {
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
            color: "#0f172a",
            marginBottom: "5px",
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

        list: {
            marginTop: "10px",
            paddingLeft: "20px",
            color: "#475569",
            lineHeight: "1.7",
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

                    <h1 style={styles.title}>Privacy Policy</h1>
                    <p style={styles.date}>Effective Date: June 10, 2026</p>

                    <p style={styles.text}>
                        Magnitude Health Associates respects your privacy and is committed to
                        protecting your personal information.
                    </p>

                    <h2 style={styles.sectionTitle}>Information We Collect</h2>
                    <ul style={styles.list}>
                        <li>Full Name</li>
                        <li>Phone Number</li>
                        <li>Email Address</li>
                        <li>Age Information</li>
                        <li>Household Income Information</li>
                        <li>Consent Preferences</li>
                    </ul>

                    <h2 style={styles.sectionTitle}>How We Use Your Information</h2>
                    <ul style={styles.list}>
                        <li>Verify ACA Marketplace eligibility</li>
                        <li>Contact you regarding your request</li>
                        <li>Connect you with licensed insurance specialists</li>
                        <li>Improve our services</li>
                    </ul>

                    <h2 style={styles.sectionTitle}>Call Recording</h2>
                    <p style={styles.text}>
                        Calls may be recorded for quality assurance, compliance, and training purposes.
                    </p>

                    <h2 style={styles.sectionTitle}>SMS Communications</h2>
                    <p style={styles.text}>
                        If consent is provided, we may send text message updates regarding your Marketplace inquiry.
                    </p>

                    <h2 style={styles.sectionTitle}>Information Sharing</h2>
                    <p style={styles.text}>
                        We may share your information with licensed insurance agents and partners involved in assisting your request.
                    </p>

                    <h2 style={styles.sectionTitle}>Data Security</h2>
                    <p style={styles.text}>
                        We maintain reasonable administrative and technical safeguards to protect your data.
                    </p>

                    <h2 style={styles.sectionTitle}>Contact Us</h2>
                    <p style={styles.text}>
                        For questions regarding this Privacy Policy, please contact us via our website.
                    </p>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default PrivacyPolicy;