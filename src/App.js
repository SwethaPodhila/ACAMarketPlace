import React, { useState } from 'react';
import axios from 'axios';
import {
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaPhoneAlt,
} from 'react-icons/fa';

function App() {

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    ageRange: '',
    benefits: '',
    income: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    consent: false,
  });

  const styles = {

    mainWrapper: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#eff6ff,#ffffff)',
      padding: '40px 15px',
      display: 'flex',
      alignItems: 'center',
    },

    formCard: {
      background: '#fff',
      borderRadius: '28px',
      padding: '45px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
    },

    badge: {
      display: 'inline-block',
      background: '#dbeafe',
      color: '#2563eb',
      padding: '10px 20px',
      borderRadius: '999px',
      fontWeight: '700',
      fontSize: '14px',
      marginBottom: '20px',
    },

    title: {
      fontSize: '40px',
      fontWeight: '800',
      color: '#0f172a',
      textAlign: 'center',
      lineHeight: '1.2',
    },

    subtitle: {
      color: '#64748b',
      marginTop: '15px',
      marginBottom: '35px',
      lineHeight: '1.7',
      textAlign: 'center',
      fontSize: '17px',
    },

    questionTitle: {
      fontSize: '19px',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '15px',
      marginTop: '30px',
    },

    optionGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
    },

    optionCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '18px',
      padding: '18px',
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: '700',
      transition: '0.3s',
      background: '#fff',
      fontSize: '16px',
    },

    activeCard: {
      border: '2px solid #2563eb',
      background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
      color: '#fff',
      boxShadow: '0 10px 25px rgba(37,99,235,0.25)',
    },

    input: {
      height: '60px',
      borderRadius: '16px',
      paddingLeft: '18px',
      border: '2px solid #e2e8f0',
      fontSize: '16px',
      marginTop: '18px',
      width: '100%',
      outline: 'none',
    },

    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
    },

    phoneWrapper: {
      display: 'flex',
      marginTop: '18px',
    },

    phoneCode: {
      width: '75px',
      height: '60px',
      background: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRight: 'none',
      borderRadius: '16px 0 0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
    },

    phoneInput: {
      flex: 1,
      height: '60px',
      border: '2px solid #e2e8f0',
      borderRadius: '0 16px 16px 0',
      paddingLeft: '18px',
      fontSize: '16px',
      outline: 'none',
    },

    consentBox: {
      background: '#f8fafc',
      borderRadius: '18px',
      padding: '22px',
      marginTop: '25px',
      border: '1px solid #e2e8f0',
    },

    submitBtn: {
      background: 'linear-gradient(to right,#2563eb,#1d4ed8)',
      border: 'none',
      color: '#fff',
      padding: '16px',
      borderRadius: '16px',
      fontWeight: '700',
      width: '100%',
      marginTop: '28px',
      fontSize: '17px',
      boxShadow: '0 12px 30px rgba(37,99,235,0.25)',
      cursor: 'pointer',
    },

    successBox: {
      textAlign: 'center',
      padding: '20px',
    },

    trustBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: '30px',
      gap: '15px',
    },

    trustItem: {
      flex: '1',
      minWidth: '140px',
      background: '#f8fafc',
      padding: '14px',
      borderRadius: '14px',
      textAlign: 'center',
      color: '#475569',
      fontWeight: '600',
      fontSize: '14px',
    }

  };

  const updateField = (field, value) => {

    setFormData({
      ...formData,
      [field]: value,
    });

  };

  const optionCards = (field) => {

    return (

      <div style={styles.optionGrid}>

        {['Yes', 'No'].map((item, index) => (

          <div
            key={index}

            style={{
              ...styles.optionCard,
              ...(formData[field] === item
                ? styles.activeCard
                : {})
            }}

            onClick={() => updateField(field, item)}
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

      setStep(2);

    } else {

      alert(
        'Sorry, you do not qualify for ACA Marketplace assistance based on your answers.'
      );

    }

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

      // GOOGLE SHEET

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
            submittedAt: new Date().toISOString(),
          }),

        }
      );

      // MAKE WEBHOOK

      await axios.post(
        'https://hook.eu2.make.com/c8gfquo9pkgacltw36vrab22msm4wgs2',
        {
          ...formData,
          submittedAt: new Date().toISOString(),
        }
      );

      setLoading(false);

      setSubmitted(true);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <div style={styles.mainWrapper}>

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            <div style={styles.formCard}>

              {!submitted ? (

                <>

                  <div className="text-center">

                    <div style={styles.badge}>
                      ACA Health Coverage Assistance
                    </div>

                  </div>

                  <h1 style={styles.title}>
                    Check Your ACA Eligibility
                  </h1>

                  <p style={styles.subtitle}>
                    Answer a few quick questions to connect with a licensed health insurance specialist.
                  </p>

                  {/* STEP 1 */}

                  {step === 1 && (
                    <>

                      <div style={styles.questionTitle}>
                        Are you between the age of 18 to 64?
                      </div>

                      {optionCards('ageRange')}

                      <div style={styles.questionTitle}>
                        Do you have Medicare, Medicaid or VA benefits?
                      </div>

                      {optionCards('benefits')}

                      <div style={styles.questionTitle}>
                        Is your household income less than $50K?
                      </div>

                      {optionCards('income')}

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

                    </>
                  )}

                  {/* STEP 2 */}

                  {step === 2 && (
                    <>

                      <div style={styles.row}>

                        <input
                          type="text"
                          placeholder="First Name"
                          style={styles.input}
                          value={formData.firstName}
                          onChange={(e) =>
                            updateField('firstName', e.target.value)
                          }
                        />

                        <input
                          type="text"
                          placeholder="Last Name"
                          style={styles.input}
                          value={formData.lastName}
                          onChange={(e) =>
                            updateField('lastName', e.target.value)
                          }
                        />

                      </div>

                      <input
                        type="email"
                        placeholder="Email Address"
                        style={styles.input}
                        value={formData.email}
                        onChange={(e) =>
                          updateField('email', e.target.value)
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
                              e.target.value.replace(/\D/g, '')
                            )
                          }
                          maxLength={10}
                        />

                      </div>

                      <div style={styles.consentBox}>

                        <div className="d-flex gap-2 align-items-start">

                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) =>
                              updateField('consent', e.target.checked)
                            }
                            style={{ marginTop: '4px' }}
                          />

                          <div>

                            <div
                              style={{
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '8px',
                              }}
                            >
                              I agree to receive calls and text messages regarding ACA health coverage options.
                            </div>

                            <div
                              style={{
                                color: '#64748b',
                                lineHeight: '1.6',
                                fontSize: '14px',
                              }}
                            >
                              By clicking submit, you consent to receive calls and SMS messages from licensed insurance agents using automated technology.
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
                          : 'Submit'}

                      </button>

                    </>
                  )}

                  {/* TRUST */}

                  <div style={styles.trustBox}>

                    <div style={styles.trustItem}>
                      <FaShieldAlt /> Secure
                    </div>

                    <div style={styles.trustItem}>
                      <FaLock /> Privacy Protected
                    </div>

                    <div style={styles.trustItem}>
                      <FaPhoneAlt /> Licensed Agents
                    </div>

                  </div>

                </>

              ) : (

                <div style={styles.successBox}>

                  <FaCheckCircle
                    style={{
                      fontSize: '85px',
                      color: '#16a34a',
                    }}
                  />

                  <h2
                    className="mt-4"
                    style={{
                      fontWeight: '800',
                      color: '#0f172a',
                    }}
                  >
                    Thank You!
                  </h2>

                  <p
                    className="mt-3"
                    style={{
                      color: '#64748b',
                      fontSize: '17px',
                      lineHeight: '1.8',
                    }}
                  >
                    A licensed ACA agent will contact you shortly at
                    <strong>
                      {' '}
                      {formData.phone}
                    </strong>
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;