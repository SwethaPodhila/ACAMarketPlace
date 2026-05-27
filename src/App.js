import React, { useState } from 'react';
import axios from 'axios';
import {
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaPhoneAlt,
} from 'react-icons/fa';

function App() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ageRange: '',
    benefits: '',
    income: '',
    fullName: '',
    phone: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const styles = {

    page: {
      minHeight: '100vh',
      background:
        'linear-gradient(180deg,#f8fbff 0%,#eef4ff 100%)',
      padding: '40px 15px',
      display: 'flex',
      alignItems: 'center',
    },

    card: {
      background: '#ffffff',
      borderRadius: '28px',
      padding: '48px',
      boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
      border: '1px solid #e2e8f0',
    },

    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 18px',
      borderRadius: '999px',
      background: '#eff6ff',
      color: '#2563eb',
      fontWeight: '700',
      fontSize: '14px',
      marginBottom: '25px',
    },

    title: {
      fontSize: '44px',
      fontWeight: '800',
      lineHeight: '1.1',
      color: '#0f172a',
      marginBottom: '18px',
      textAlign: 'center',
    },

    subtitle: {
      textAlign: 'center',
      color: '#64748b',
      fontSize: '17px',
      lineHeight: '1.8',
      marginBottom: '38px',
    },

    question: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '18px',
      marginTop: '35px',
    },

    optionWrap: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px',
    },

    option: {
      border: '2px solid #e2e8f0',
      borderRadius: '18px',
      padding: '18px',
      textAlign: 'center',
      fontWeight: '700',
      cursor: 'pointer',
      transition: '0.25s ease',
      background: '#ffffff',
      color: '#0f172a',
      fontSize: '16px',
    },

    activeOption: {
      background:
        'linear-gradient(135deg,#2563eb,#1d4ed8)',
      color: '#ffffff',
      border: '2px solid #2563eb',
      boxShadow: '0 10px 25px rgba(37,99,235,0.25)',
      transform: 'translateY(-2px)',
    },

    input: {
      width: '100%',
      height: '62px',
      borderRadius: '18px',
      border: '2px solid #e2e8f0',
      padding: '0 18px',
      fontSize: '16px',
      marginTop: '18px',
      outline: 'none',
      fontWeight: '500',
    },

    phoneWrap: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '18px',
    },

    phoneCode: {
      height: '62px',
      minWidth: '75px',
      borderRadius: '18px 0 0 18px',
      border: '2px solid #e2e8f0',
      borderRight: 'none',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      color: '#0f172a',
    },

    phoneInput: {
      flex: 1,
      height: '62px',
      borderRadius: '0 18px 18px 0',
      border: '2px solid #e2e8f0',
      borderLeft: 'none',
      padding: '0 18px',
      fontSize: '16px',
      outline: 'none',
      fontWeight: '500',
    },

    consentBox: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '22px',
      marginTop: '24px',
    },

    submitBtn: {
      width: '100%',
      height: '62px',
      border: 'none',
      borderRadius: '18px',
      background:
        'linear-gradient(135deg,#2563eb,#1d4ed8)',
      color: '#ffffff',
      fontWeight: '700',
      fontSize: '17px',
      marginTop: '28px',
      boxShadow: '0 14px 35px rgba(37,99,235,0.28)',
      transition: '0.3s ease',
    },

    trustBox: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      marginTop: '30px',
      flexWrap: 'wrap',
    },

    trustItem: {
      background: '#f8fafc',
      padding: '14px 18px',
      borderRadius: '14px',
      color: '#334155',
      fontWeight: '600',
      fontSize: '14px',
      flex: 1,
      minWidth: '140px',
      textAlign: 'center',
    },

    successBox: {
      textAlign: 'center',
      padding: '20px 10px',
    },

  };

  const updateField = (field, value) => {

    setFormData({
      ...formData,
      [field]: value,
    });

  };

  const renderOptions = (field) => {

    return (

      <div style={styles.optionWrap}>

        {['Yes', 'No'].map((item, index) => (

          <div
            key={index}

            style={{
              ...styles.option,
              ...(formData[field] === item
                ? styles.activeOption
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

  const submitForm = async () => {

    if (
      !formData.ageRange ||
      !formData.benefits ||
      !formData.income ||
      !formData.fullName ||
      formData.phone.length < 10 ||
      !formData.consent
    ) {
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        'https://hook.eu2.make.com/c8gfquo9pkgacltw36vrab22msm4wgs2',
        {
          ...formData,
          submittedAt: new Date().toISOString(),
        }
      );

      setSubmitted(true);
      setLoading(false);

    } catch (error) {

      console.log(error);
      setLoading(false);

    }

  };

  return (

    <div style={styles.page}>

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            <div style={styles.card}>

              {!submitted ? (
                <>

                  <div className="text-center">

                    <div style={styles.badge}>
                      ACA Health Coverage
                    </div>

                  </div>

                  <h1 style={styles.title}>
                    Check Your ACA Eligibility
                  </h1>

                  <p style={styles.subtitle}>
                    Complete this quick eligibility check to speak with
                    a licensed health coverage specialist.
                  </p>

                  {/* QUESTION 1 */}

                  <div style={styles.question}>
                    Are you between the age of 18 to 64?
                  </div>

                  {renderOptions('ageRange')}

                  {/* QUESTION 2 */}

                  <div style={styles.question}>
                    Do you have Medicare, Medicaid or VA benefits?
                  </div>

                  {renderOptions('benefits')}

                  {/* QUESTION 3 */}

                  <div style={styles.question}>
                    Is your household income less than $50K?
                  </div>

                  {renderOptions('income')}

                  {/* NAME */}

                  <input
                    type="text"
                    placeholder="Full Name"
                    style={styles.input}
                    value={formData.fullName}
                    onChange={(e) =>
                      updateField('fullName', e.target.value)
                    }
                  />

                  {/* PHONE */}

                  <div style={styles.phoneWrap}>

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

                  {/* CONSENT */}

                  <div style={styles.consentBox}>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >

                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) =>
                          updateField('consent', e.target.checked)
                        }
                        style={{
                          marginTop: '5px',
                        }}
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
                            lineHeight: '1.7',
                            fontSize: '14px',
                          }}
                        >
                          By clicking submit, you consent to receive calls and SMS messages from licensed agents using automated technology.
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <button
                    style={{
                      ...styles.submitBtn,
                      opacity:
                        formData.ageRange &&
                          formData.benefits &&
                          formData.income &&
                          formData.fullName &&
                          formData.phone.length >= 10 &&
                          formData.consent
                          ? 1
                          : 0.5,
                      cursor:
                        formData.ageRange &&
                          formData.benefits &&
                          formData.income &&
                          formData.fullName &&
                          formData.phone.length >= 10 &&
                          formData.consent
                          ? 'pointer'
                          : 'not-allowed',
                    }}

                    disabled={
                      !formData.ageRange ||
                      !formData.benefits ||
                      !formData.income ||
                      !formData.fullName ||
                      formData.phone.length < 10 ||
                      !formData.consent
                    }

                    onClick={submitForm}
                  >

                    {loading
                      ? 'Submitting...'
                      : 'Check My Eligibility'}

                  </button>

                  {/* TRUST */}

                  <div style={styles.trustBox}>

                    <div style={styles.trustItem}>
                      <FaShieldAlt /> Secure & Encrypted
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
                    style={{
                      marginTop: '25px',
                      fontWeight: '800',
                      color: '#0f172a',
                    }}
                  >
                    Thank You!
                  </h2>

                  <p
                    style={{
                      marginTop: '18px',
                      color: '#64748b',
                      fontSize: '17px',
                      lineHeight: '1.8',
                    }}
                  >
                    Your information has been received successfully.
                    A licensed agent will contact you shortly at
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

      <style>
        {`
          body{
            margin:0;
            font-family: Inter, sans-serif;
          }

          *{
            box-sizing:border-box;
          }

          @media(max-width:768px){

            .container{
              padding-left:8px;
              padding-right:8px;
            }

          }
        `}
      </style>

    </div>

  );

}

export default App;