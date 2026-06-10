import React from "react";

function Hero() {
    const styles = {
        hero: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "60px 8%",
            minHeight: "60vh",
            background: "linear-gradient(to right, #f5f9ff, #ffffff)",
            gap: "50px",
            flexWrap: "wrap",
            position: "relative",
        },

        content: {
            flex: 1,
            minWidth: "300px",
        },

        heading: {
            fontSize: "3rem",
            color: "#0f172a",
            marginBottom: "20px",
            lineHeight: "1.2",
        },

        paragraph: {
            fontSize: "1.1rem",
            color: "#64748b",
            marginBottom: "30px",
            lineHeight: "1.8",
        },

        features: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            color: "#334155",
            fontWeight: "500",
        },

        imageContainer: {
            flex: 1,
            minWidth: "300px",
        },

        image: {
            width: "100%",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        },

        arrow: {
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "40px",
            cursor: "pointer",
            color: "#2563eb",
            animation: "bounce 1.5s infinite",
        },
    };

    const scrollToEligibility = () => {
        document
            .getElementById("eligibility-section")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    };

    return (
        <section style={styles.hero}>
            <div style={styles.content}>
                <h1 style={styles.heading}>
                    Find Affordable Marketplace Health Coverage
                </h1>

                <p style={styles.paragraph}>
                    Get personalized assistance exploring Marketplace
                    health coverage options. Our licensed specialists
                    can help you understand available plans and guide
                    you through the enrollment process.
                </p>

                <div style={styles.features}>
                    <span>✓ Licensed Specialists</span>
                    <span>✓ Fast Eligibility Review</span>
                    <span>✓ Personalized Assistance</span>
                </div>
            </div>

            <div style={styles.imageContainer}>
                <img
                    style={styles.image}
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                    alt="Healthcare Assistance"
                />
            </div>

            <div
                style={styles.arrow}
                onClick={scrollToEligibility}
            >
                ↓
            </div>
        </section>
    );
}

export default Hero;