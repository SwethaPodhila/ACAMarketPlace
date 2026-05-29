import React from 'react';

import {
    FaCheckCircle,
    FaShieldAlt,
    FaPhoneAlt,
    FaLock,
} from 'react-icons/fa';

function ThankYouPage() {

    const data = JSON.parse(
        localStorage.getItem('acaData')
    );

    const styles = {

        mainWrapper: {
            minHeight: '100vh',
            background:
                'linear-gradient(135deg,#eff6ff 0%,#ffffff 50%,#dbeafe 100%)',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '25px',
            fontFamily: 'Inter, sans-serif',
        },

        card: {
            width: '100%',
            maxWidth: '700px',
            background: '#ffffff',
            borderRadius: '32px',
            padding: '60px 45px',
            textAlign: 'center',
            boxShadow:
                '0 20px 60px rgba(15,23,42,0.12)',

            border: '1px solid #e2e8f0',
            position: 'relative',
            overflow: 'hidden',
        },

        topCircle: {
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background:
                'rgba(34,197,94,0.08)',

            top: '-80px',
            right: '-80px',
        },

        iconWrapper: {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background:
                'linear-gradient(135deg,#22c55e,#16a34a)',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 30px',
            boxShadow:
                '0 15px 35px rgba(34,197,94,0.25)',
        },

        title: {
            fontSize: '46px',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '18px',
        },

        subtitle: {
            color: '#64748b',
            fontSize: '18px',
            lineHeight: '1.8',
            maxWidth: '520px',
            margin: '0 auto',
        },

        phoneBox: {
            background: '#f8fafc',
            borderRadius: '22px',
            padding: '22px',
            marginTop: '35px',
            border: '1px solid #e2e8f0',
        },

        phoneTitle: {
            color: '#64748b',
            fontSize: '15px',
            marginBottom: '8px',
        },

        phoneText: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#2563eb',
        },

        trustWrapper: {
            display: 'grid',
            gridTemplateColumns:
                'repeat(auto-fit,minmax(150px,1fr))',

            gap: '16px',
            marginTop: '38px',
        },

        trustCard: {
            background: '#f8fafc',
            borderRadius: '18px',
            padding: '18px',
            border: '1px solid #e2e8f0',
        },

        trustIcon: {
            fontSize: '24px',
            marginBottom: '10px',
            color: '#2563eb',
        },

        trustText: {
            fontWeight: '700',
            color: '#334155',
            fontSize: '15px',
        },

        bottomText: {
            marginTop: '35px',
            color: '#94a3b8',
            fontSize: '14px',
            lineHeight: '1.7',
        },

    };

    return (

        <div style={styles.mainWrapper}>

            <div style={styles.card}>

                <div style={styles.topCircle}></div>

                <div style={styles.iconWrapper}>

                    <FaCheckCircle
                        style={{
                            fontSize: '62px',
                            color: '#ffffff',
                        }}
                    />

                </div>

                <h1 style={styles.title}>
                    Thank You!
                </h1>

                <p style={styles.subtitle}>
                    Your information has been submitted
                    successfully. A licensed ACA health
                    insurance specialist will contact
                    you shortly to discuss your coverage
                    options.
                </p>

                <div style={styles.phoneBox}>

                    <div style={styles.phoneTitle}>
                        We will contact you at
                    </div>

                    <div style={styles.phoneText}>
                        +1 {data?.phone}
                    </div>

                </div>

                <div style={styles.trustWrapper}>

                    <div style={styles.trustCard}>

                        <div style={styles.trustIcon}>
                            <FaShieldAlt />
                        </div>

                        <div style={styles.trustText}>
                            Secure Process
                        </div>

                    </div>

                    <div style={styles.trustCard}>

                        <div style={styles.trustIcon}>
                            <FaLock />
                        </div>

                        <div style={styles.trustText}>
                            Privacy Protected
                        </div>

                    </div>

                    <div style={styles.trustCard}>

                        <div style={styles.trustIcon}>
                            <FaPhoneAlt />
                        </div>

                        <div style={styles.trustText}>
                            Licensed Agents
                        </div>

                    </div>

                </div>

                <div style={styles.bottomText}>

                    Typical response time is within
                    a few minutes during business hours.

                </div>

            </div>

        </div>

    );

}

export default ThankYouPage;