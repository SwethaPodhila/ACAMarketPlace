import React, { useState } from 'react';

import axios from 'axios';

import {
    useNavigate,
} from 'react-router-dom';

function DetailsPage() {

    const navigate = useNavigate();

    const oldData = JSON.parse(
        localStorage.getItem('acaData')
    );

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        ...oldData,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        consent: false,
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
            maxWidth: '760px',
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
            fontSize: '42px',
            fontWeight: '800',
            color: '#0f172a',
            lineHeight: '1.2',
            textAlign: 'center',
            marginBottom: '14px',
        },

        subtitle: {
            textAlign: 'center',
            color: '#64748b',
            fontSize: '17px',
            lineHeight: '1.7',
            marginBottom: '40px',
        },

        row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '18px',
        },

        input: {
            width: '100%',
            height: '62px',
            border: '2px solid #e2e8f0',
            borderRadius: '18px',
            paddingLeft: '18px',
            fontSize: '16px',
            outline: 'none',
            marginBottom: '18px',
            background: '#ffffff',
        },

        phoneWrapper: {
            display: 'flex',
            marginBottom: '18px',
        },

        phoneCode: {
            width: '80px',
            height: '62px',
            border:
                '2px solid #e2e8f0',

            borderRight: 'none',
            borderRadius: '18px 0 0 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            fontWeight: '700',
            color: '#0f172a',
        },

        phoneInput: {
            flex: 1,
            height: '62px',
            border:
                '2px solid #e2e8f0',

            borderRadius: '0 18px 18px 0',
            paddingLeft: '18px',
            fontSize: '16px',
            outline: 'none',
        },

        consentBox: {
            background: '#f8fafc',
            borderRadius: '22px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            marginTop: '10px',
        },

        consentTitle: {
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '8px',
            lineHeight: '1.5',
        },

        consentText: {
            color: '#64748b',
            fontSize: '14px',
            lineHeight: '1.7',
        },

        submitBtn: {
            width: '100%',
            height: '64px',
            border: 'none',
            borderRadius: '18px',
            background:
                'linear-gradient(to right,#2563eb,#1d4ed8)',

            color: '#ffffff',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            marginTop: '28px',
            boxShadow:
                '0 14px 30px rgba(37,99,235,0.25)',
        },

        trustWrapper: {
            display: 'grid',
            gridTemplateColumns:
                'repeat(auto-fit,minmax(150px,1fr))',

            gap: '16px',
            marginTop: '34px',
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

    const submitForm = async () => {

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email.includes('@') ||
            formData.phone.length < 10 ||
            !formData.consent
        ) {

            return;

        }

        try {

            setLoading(true);

            await fetch(
                'https://script.google.com/macros/s/AKfycbwgJwMCdJaIVKi7XQ1w7NgYVj3fIrmot2cvc515IMl2AJ4ApAoGt_kSTTtbVJma1U8GzQ/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/plain',
                    },

                    body: JSON.stringify({
                        ...formData,
                        submittedAt:
                            new Date().toISOString(),
                    }),

                }
            );

            await axios.post(
                'https://hook.eu2.make.com/c8gfquo9pkgacltw36vrab22msm4wgs2',
                {
                    ...formData,
                    submittedAt:
                        new Date().toISOString(),
                }
            );

            localStorage.setItem(
                'acaData',
                JSON.stringify(formData)
            );

            navigate('/thank-you');

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div style={styles.mainWrapper}>

            <div style={styles.formCard}>

                <div style={styles.topCircle}></div>

                <div style={{ textAlign: 'center' }}>

                    <div style={styles.badge}>
                        ACA Enrollment Assistance
                    </div>

                </div>

                <h1 style={styles.title}>
                    Complete Your Details
                </h1>

                <p style={styles.subtitle}>
                    Enter your information to connect
                    with a licensed ACA health
                    insurance specialist.
                </p>

                <div style={styles.row}>

                    <input
                        type="text"
                        placeholder="First Name"
                        style={styles.input}
                        value={formData.firstName}
                        onChange={(e) =>
                            updateField(
                                'firstName',
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        style={styles.input}
                        value={formData.lastName}
                        onChange={(e) =>
                            updateField(
                                'lastName',
                                e.target.value
                            )
                        }
                    />

                </div>

                <input
                    type="email"
                    placeholder="Email Address"
                    style={styles.input}
                    value={formData.email}
                    onChange={(e) =>
                        updateField(
                            'email',
                            e.target.value
                        )
                    }
                />

                <div style={styles.phoneWrapper}>

                    <div style={styles.phoneCode}>
                        +1
                    </div>

                    <input
                        type="text"
                        placeholder="Phone Number"
                        style={styles.phoneInput}
                        value={formData.phone}
                        onChange={(e) =>
                            updateField(
                                'phone',
                                e.target.value.replace(
                                    /\D/g,
                                    ''
                                )
                            )
                        }

                        maxLength={10}
                    />

                </div>

                <div style={styles.consentBox}>

                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                        }}
                    >

                        <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) =>
                                updateField(
                                    'consent',
                                    e.target.checked
                                )
                            }

                            style={{
                                marginTop: '4px',
                            }}
                        />

                        <div>

                            <div style={styles.consentTitle}>
                                I agree to receive calls and
                                text messages regarding ACA
                                health coverage options.
                            </div>

                            <div style={styles.consentText}>
                                By clicking submit, you
                                consent to receive calls and
                                SMS messages from licensed
                                insurance agents using
                                automated technology.
                            </div>

                        </div>

                    </div>

                </div>

                <button
                    style={{
                        ...styles.submitBtn,

                        opacity:
                            formData.firstName &&
                                formData.lastName &&
                                formData.email.includes('@') &&
                                formData.phone.length >= 10 &&
                                formData.consent
                                ? 1
                                : 0.5,
                    }}

                    disabled={
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.email.includes('@') ||
                        formData.phone.length < 10 ||
                        !formData.consent
                    }

                    onClick={submitForm}
                >

                    {loading
                        ? 'Submitting...'
                        : 'Submit Application'}

                </button>

                <div style={styles.trustWrapper}>

                    <div style={styles.trustCard}>

                        <div style={styles.trustIcon}>
                            🔒
                        </div>

                        <div style={styles.trustText}>
                            Secure Information
                        </div>

                    </div>

                    <div style={styles.trustCard}>

                        <div style={styles.trustIcon}>
                            📞
                        </div>

                        <div style={styles.trustText}>
                            Licensed ACA Agents
                        </div>

                    </div>

                    <div style={styles.trustCard}>

                        <div style={styles.trustIcon}>
                            ✅
                        </div>

                        <div style={styles.trustText}>
                            Fast Response
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DetailsPage;