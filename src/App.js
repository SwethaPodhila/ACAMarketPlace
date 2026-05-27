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

    mainWrapper: {
      minHeight: '100vh',
      background:
        'linear-gradient(135deg,#dbeafe 0%,#eff6ff 35%,#ffffff 100%)',
      padding: '50px 15px',
      display: 'flex',
      alignItems: 'center',
    },

    formCard: {
      background: '#ffffff',
      borderRadius: '32px',
      padding: '45px',
      boxShadow: '0 25px 60px rgba(37,99,235,0.12)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden',
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
      marginTop: '14px',
      marginBottom: '35px',
      lineHeight: '1.8',
      textAlign: 'center',
      fontSize: '16px',
    },

    questionTitle: {
      marginTop: '35px',
      color: '#0f172a',
      fontSize: '20px',
      fontWeight: '700',
    },

    optionCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '20px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: '700',
      transition: 'all 0.3s ease',
      background: '#ffffff',
      fontSize: '16px',
      minHeight: '74px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    activeCard: {
      border: '2px solid #2563eb',
      background: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
      color: '#2563eb',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(37,99,235,0.15)',
    },

    mainBtn: {
      background:
        'linear-gradient(135deg,#2563eb,#1d4ed8)',
      border: 'none',
      color: '#ffffff',
      padding: '17px',
      borderRadius: '16px',
      fontWeight: '700',
      width: '100%',
      marginTop: '25px',
      fontSize: '17px',
      boxShadow: '0 12px 30px rgba(37,99,235,0.28)',
      transition: '0.3s ease',
    },

    input: {
      height: '60px',
      borderRadius: '16px',
      paddingLeft: '18px',
      marginTop: '18px',
      border: '2px solid #e2e8f0',
      fontSize: '16px',
      fontWeight: '500',
    },

    consentBox: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '22px',
      marginTop: '25px',
    },

    trustBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: '35px',
      gap: '14px',
      color: '#475569',
      fontWeight: '600',
      background: '#f8fafc',
      padding: '18px',
      borderRadius: '18px',
    },

    successBox: {
      background:
        'linear-gradient(135deg,#f0fdf4,#dcfce7)',
      borderRadius: '28px',
      padding: '40px',
      marginTop: '10px',
      textAlign: 'center',
      border: '1px solid #bbf7d0',
    }

  };

  const updateField = (field, value) => {

    setFormData({
      ...formData,
      [field]: value,
    });

  };

  const optionCards = (options, field) => {

    return (
      <div className="row g-3 mt-2">

        {options.map((item, index) => (

          <div className="col-md-6" key={index}>

            <div
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

                  {/* TOP BADGE */}

                  <div className="text-center mb-4">

                    <span
                      style={{
                        background: '#dbeafe',
                        color: '#2563eb',
                        padding: '10px 22px',
                        borderRadius: '999px',
                        fontWeight: '700',
                        fontSize: '14px',
                        display: 'inline-block',
                      }}
                    >
                      ACA Health Coverage Assistance
                    </span>

                  </div>

                  {/* TITLE */}

                  <h2 style={styles.title}>
                    Check Your ACA Eligibility
                  </h2>

                  <p style={styles.subtitle}>
                    Answer a few quick questions to see if you may qualify for affordable health coverage options.
                  </p>

                  {/* QUESTION 1 */}

                  <h5 style={styles.questionTitle}>
                    Are you between the age of 18 to 64?
                  </h5>

                  {optionCards(
                    ['Yes', 'No'],
                    'ageRange'
                  )}

                  {/* QUESTION 2 */}

                  <h5 style={styles.questionTitle}>
                    Do you have Medicare, Medicaid or VA benefits?
                  </h5>

                  {optionCards(
                    ['Yes', 'No'],
                    'benefits'
                  )}

                  {/* QUESTION 3 */}

                  <h5 style={styles.questionTitle}>
                    Is your household income less than $50K?
                  </h5>

                  {optionCards(
                    ['Yes', 'No'],
                    'income'
                  )}

                  {/* NAME */}

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    style={styles.input}
                    value={formData.fullName}
                    onChange={(e) =>
                      updateField('fullName', e.target.value)
                    }
                  />

                  {/* PHONE */}

                  <div className="input-group mt-3">

                    <span
                      className="input-group-text"
                      style={{
                        borderRadius: '16px 0 0 16px',
                        background: '#f8fafc',
                        fontWeight: '700',
                        padding: '0 20px',
                        border: '2px solid #e2e8f0',
                        borderRight: 'none',
                      }}
                    >
                      +1
                    </span>

                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="form-control"
                      style={{
                        ...styles.input,
                        borderRadius: '0 16px 16px 0',
                        marginTop: '0px',
                        borderLeft: 'none',
                      }}

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

                    <div className="d-flex gap-2 align-items-start">

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

                      <span
                        style={{
                          fontWeight: '600',
                          color: '#0f172a',
                        }}
                      >
                        I agree to receive calls and text messages regarding ACA health coverage options.
                      </span>

                    </div>

                    <p className="text-muted mt-3 mb-0">

                      By clicking submit, you consent to receive calls and SMS messages
                      from licensed insurance agents using automated technology.
                      Message & data rates may apply.

                    </p>

                  </div>

                  {/* SUBMIT BUTTON */}

                  <button
                    style={{
                      ...styles.mainBtn,
                      opacity:
                        formData.ageRange &&
                          formData.benefits &&
                          formData.income &&
                          formData.fullName &&
                          formData.phone.length >= 10 &&
                          formData.consent
                          ? 1
                          : 0.5,
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

                  {/* TRUST SECTION */}

                  <div style={styles.trustBox}>

                    <div>
                      <FaShieldAlt /> Secure
                    </div>

                    <div>
                      <FaLock /> Privacy Protected
                    </div>

                    <div>
                      <FaPhoneAlt /> Licensed Agents
                    </div>

                  </div>

                </>
              ) : (

                <div style={styles.successBox}>

                  <FaCheckCircle
                    style={{
                      fontSize: '80px',
                      color: '#16a34a',
                    }}
                  />

                  <h2 className="mt-4 fw-bold">
                    Thank You!
                  </h2>

                  <p className="mt-4 text-success fw-bold">
                    Your request has been received successfully.
                  </p>

                  <p className="mt-3 text-muted">

                    A licensed agent will contact you shortly at
                    <strong>
                      {' '}
                      {formData.phone}
                    </strong>

                  </p>

                  <h4 className="mt-4 fw-bold">
                    What Happens Next?
                  </h4>

                  <p className="mt-3 text-muted">
                    An agent will discuss your eligibility and available ACA health coverage options with you.
                    There is no obligation to enroll.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      <style>
        {`
          @media (max-width:768px){

            .container{
              padding-left:12px;
              padding-right:12px;
            }

            h2{
              font-size:30px !important;
            }

          }
        `}
      </style>

    </div>

  );
}

export default App;