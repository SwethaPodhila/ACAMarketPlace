import React, { useState } from 'react';
import Hero from './Hero';

import {
    useNavigate,
} from 'react-router-dom';
import Footer from "./Footer";

function EligibilityPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ageRange: '',
        benefits: '',
        income: '',
    });

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

        formCard: {
            width: '100%',
            maxWidth: '820px',
            background: '#ffffff',
            borderRadius: '32px',
            padding: '50px',
            boxShadow:
                '0 20px 60px rgba(15,23,42,0.12)',

            border: '1px solid #e2e8f0',
            position: 'relative',
            overflow: 'hidden',
        },

        topCircle: {
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background:
                'rgba(37,99,235,0.08)',

            top: '-60px',
            right: '-60px',
        },

        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#dbeafe',
            color: '#2563eb',
            padding: '10px 18px',
            borderRadius: '999px',
            fontWeight: '700',
            fontSize: '14px',
            marginBottom: '24px',
        },

        title: {
            fontSize: '44px',
            fontWeight: '800',
            color: '#0f172a',
            lineHeight: '1.2',
            textAlign: 'center',
            marginBottom: '16px',
        },

        subtitle: {
            textAlign: 'center',
            color: '#64748b',
            fontSize: '17px',
            lineHeight: '1.7',
            marginBottom: '40px',
        },

        questionBox: {
            background: '#f8fafc',
            borderRadius: '22px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0',
        },

        questionTitle: {
            fontSize: '19px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '18px',
        },

        optionGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
        },

        optionCard: {
            border: '2px solid #dbeafe',
            borderRadius: '18px',
            padding: '18px',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '16px',
            background: '#ffffff',
            transition: '0.3s',
        },

        activeCard: {
            background:
                'linear-gradient(135deg,#2563eb,#1d4ed8)',

            color: '#ffffff',
            border: '2px solid #2563eb',
            boxShadow:
                '0 10px 25px rgba(37,99,235,0.25)',
        },

        submitBtn: {
            width: '100%',
            height: '62px',
            border: 'none',
            borderRadius: '18px',
            background:
                'linear-gradient(to right,#2563eb,#1d4ed8)',

            color: '#ffffff',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            marginTop: '18px',
            boxShadow:
                '0 14px 30px rgba(37,99,235,0.25)',

            transition: '0.3s',
        },

        trustWrapper: {
            display: 'grid',
            gridTemplateColumns:
                'repeat(auto-fit,minmax(150px,1fr))',

            gap: '16px',
            marginTop: '32px',
        },

        trustCard: {
            background: '#f8fafc',
            borderRadius: '18px',
            padding: '18px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
        },

        trustIcon: {
            fontSize: '26px',
            marginBottom: '10px',
        },

        trustText: {
            fontWeight: '700',
            color: '#334155',
            fontSize: '15px',
        },

    };

    const updateField = (field, value) => {

        setFormData({
            ...formData,
            [field]: value,
        });

    };

    const optionCards = (field) => {

        return (

            <div style={styles.optionGrid} id="eligibility-section">

                {['Yes', 'No'].map((item, index) => (

                    <div
                        key={index}

                        style={{
                            ...styles.optionCard,

                            ...(formData[field] === item
                                ? styles.activeCard
                                : {}),
                        }}

                        onClick={() =>
                            updateField(field, item)
                        }
                    >
                        {item}
                    </div>

                ))}

            </div>

        );

    };

    const goNext = () => {

        if (
            formData.ageRange === 'Yes' &&
            formData.benefits === 'No' &&
            formData.income === 'Yes'
        ) {

            localStorage.setItem(
                'acaData',
                JSON.stringify(formData)
            );

            navigate('/details');

        } else {

            alert(
                'Sorry, you do not qualify for ACA Marketplace assistance.'
            );

        }

    };

    return (
        <>
            <Hero />
            <div style={styles.mainWrapper}>

                <div style={styles.formCard}>

                    <div style={styles.topCircle}></div>

                    <div style={{ textAlign: 'center' }}>

                        <div style={styles.badge}>
                            ACA Health Coverage Assistance
                        </div>

                    </div>

                    <h1 style={styles.title}>
                        Check Your ACA Eligibility
                    </h1>

                    <p style={styles.subtitle}>
                        Answer a few quick questions to
                        connect with a licensed health
                        insurance specialist.
                    </p>

                    <div style={styles.questionBox}>

                        <div style={styles.questionTitle}>
                            Are you between the age of 18 to 64?
                        </div>

                        {optionCards('ageRange')}

                    </div>

                    <div style={styles.questionBox}>

                        <div style={styles.questionTitle}>
                            Do you have Medicare, Medicaid or
                            VA benefits?
                        </div>

                        {optionCards('benefits')}

                    </div>

                    <div style={styles.questionBox}>

                        <div style={styles.questionTitle}>
                            Is your household income less than
                            $50K?
                        </div>

                        {optionCards('income')}

                    </div>

                    <button
                        style={{
                            ...styles.submitBtn,

                            opacity:
                                formData.ageRange &&
                                    formData.benefits &&
                                    formData.income
                                    ? 1
                                    : 0.5,
                        }}

                        disabled={
                            !formData.ageRange ||
                            !formData.benefits ||
                            !formData.income
                        }

                        onClick={goNext}
                    >
                        Continue
                    </button>

                    <div style={styles.trustWrapper}>

                        <div style={styles.trustCard}>

                            <div style={styles.trustIcon}>
                                🔒
                            </div>

                            <div style={styles.trustText}>
                                Secure & Encrypted
                            </div>

                        </div>

                        <div style={styles.trustCard}>

                            <div style={styles.trustIcon}>
                                📞
                            </div>

                            <div style={styles.trustText}>
                                Licensed Agents
                            </div>

                        </div>

                        <div style={styles.trustCard}>

                            <div style={styles.trustIcon}>
                                ✅
                            </div>

                            <div style={styles.trustText}>
                                Quick Approval Process
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <Footer />
        </>
    );

}

export default EligibilityPage;