import React, { useState } from 'react';
import axios from 'axios';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaPhoneAlt,
} from 'react-icons/fa';

function App() {

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    zipCode: '',
    coverageType: '',
    income: '',
    householdSize: 1,
    employerInsurance: '',
    lifeChange: '',
    fullName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const styles = {

    mainWrapper: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#eff6ff,#ffffff)',
      padding: '40px 0',
    },

    formCard: {
      background: '#fff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
    },

    title: {
      fontSize: '34px',
      fontWeight: '700',
      color: '#0f172a',
    },

    subtitle: {
      color: '#64748b',
      marginTop: '10px',
      marginBottom: '25px',
      lineHeight: '1.7',
    },

    optionCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '18px',
      padding: '22px',
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: '600',
      transition: '0.3s',
      background: '#fff',
    },

    activeCard: {
      border: '2px solid #2563eb',
      background: '#eff6ff',
      color: '#2563eb',
    },

    mainBtn: {
      background: 'linear-gradient(to right,#2563eb,#1d4ed8)',
      border: 'none',
      color: '#fff',
      padding: '14px 30px',
      borderRadius: '14px',
      fontWeight: '700',
      width: '100%',
    },

    backBtn: {
      border: '1px solid #dbe2ea',
      background: '#fff',
      padding: '14px 30px',
      borderRadius: '14px',
      fontWeight: '600',
    },

    input: {
      height: '58px',
      borderRadius: '14px',
      paddingLeft: '18px',
    },

    trustBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: '30px',
      gap: '15px',
      color: '#475569',
      fontWeight: '600',
    },

    successBox: {
      background: '#f0fdf4',
      borderRadius: '20px',
      padding: '30px',
      marginTop: '30px',
    }

  };

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
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

    if (!formData.consent) {
      return;
    }

    try {

      setLoading(true);

      // GOOGLE SHEET SAVE

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

      // CALL WEBHOOK

      await axios.post(
        'https://hook.eu2.make.com/c8gfquo9pkgacltw36vrab22msm4wgs2',
        {
          ...formData,
          submittedAt: new Date().toISOString(),
        }
      );

      setTimeout(() => {
        setLoading(false);
        setStep(9);
      }, 2000);

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

            <div className="text-center mb-3">

              <span
                className="badge px-4 py-3"
                style={{
                  background: '#dbeafe',
                  color: '#1d4ed8',
                  borderRadius: '999px',
                  fontSize: '14px',
                }}
              >
                ACA Health Coverage Assistance
              </span>

            </div>

            <div style={styles.formCard}>

              {step <= 8 && (
                <>
                  <div className="progress mb-4" style={{ height: '10px' }}>

                    <div
                      className="progress-bar"
                      style={{
                        width: `${(step / 8) * 100}%`,
                        background:
                          'linear-gradient(to right,#2563eb,#1d4ed8)'
                      }}
                    ></div>

                  </div>

                  <div className="text-muted fw-semibold mb-3">
                    Step {step} of 8
                  </div>
                </>
              )}

              {/* STEP 1 */}

              {step === 1 && (
                <>

                  <h2 style={styles.title}>
                    Find ACA Plans In Your Area
                  </h2>

                  <p style={styles.subtitle}>
                    Enter your ZIP code to check available health coverage options.
                  </p>

                  <input
                    type="text"
                    className="form-control"
                    style={styles.input}
                    placeholder="Enter ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                  />

                  <button
                    className="mt-4"
                    style={{
                      ...styles.mainBtn,
                      opacity:
                        formData.zipCode.length === 5 ||
                          formData.zipCode.length === 6
                          ? 1
                          : 0.5,

                      cursor:
                        formData.zipCode.length === 5 ||
                          formData.zipCode.length === 6
                          ? 'pointer'
                          : 'not-allowed',
                    }}

                    disabled={
                      !(
                        formData.zipCode.length === 5 ||
                        formData.zipCode.length === 6
                      )
                    }

                    onClick={nextStep}
                  >
                    Continue
                  </button>

                </>
              )}

              {/* STEP 2 */}

              {step === 2 && (
                <>

                  <h2 style={styles.title}>
                    Who Needs Coverage?
                  </h2>

                  <p style={styles.subtitle}>
                    Select the option that best describes your household.
                  </p>

                  {optionCards([
                    'Just Me',
                    'Me & Spouse',
                    'Me & Family',
                    'Just My Children',
                  ], 'coverageType')}

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                        opacity:
                          formData.coverageType
                            ? 1
                            : 0.5,
                      }}
                      disabled={!formData.coverageType}
                      onClick={nextStep}
                    >
                      Continue
                    </button>

                  </div>

                </>
              )}

              {/* STEP 3 */}

              {step === 3 && (
                <>

                  <h2 style={styles.title}>
                    Estimated Household Income
                  </h2>

                  <p style={styles.subtitle}>
                    This helps determine savings eligibility.
                  </p>

                  {optionCards([
                    'Under $20K',
                    '$20K - $35K',
                    '$35K - $50K',
                    'Over $50K',
                  ], 'income')}

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                        opacity:
                          formData.income
                            ? 1
                            : 0.5,
                      }}
                      disabled={!formData.income}
                      onClick={nextStep}
                    >
                      Continue
                    </button>

                  </div>

                </>
              )}

              {/* STEP 4 */}

              {step === 4 && (
                <>

                  <h2 style={styles.title}>
                    Tax Household Size
                  </h2>

                  <p style={styles.subtitle}>
                    Include yourself and dependents.
                  </p>

                  <div className="d-flex justify-content-center align-items-center gap-4 mt-4">

                    <button
                      className="btn btn-primary rounded-circle"
                      style={{
                        width: '60px',
                        height: '60px',
                        fontSize: '26px',
                      }}
                      onClick={() => {
                        if (formData.householdSize > 1) {
                          updateField(
                            'householdSize',
                            formData.householdSize - 1
                          );
                        }
                      }}
                    >
                      -
                    </button>

                    <h1>{formData.householdSize}</h1>

                    <button
                      className="btn btn-primary rounded-circle"
                      style={{
                        width: '60px',
                        height: '60px',
                        fontSize: '26px',
                      }}
                      onClick={() => {
                        updateField(
                          'householdSize',
                          formData.householdSize + 1
                        );
                      }}
                    >
                      +
                    </button>

                  </div>

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                      }}
                      onClick={nextStep}
                    >
                      Continue
                    </button>

                  </div>

                </>
              )}

              {/* STEP 5 */}

              {step === 5 && (
                <>

                  <h2 style={styles.title}>
                    Employer Sponsored Insurance?
                  </h2>

                  <p style={styles.subtitle}>
                    Including coverage offered by your employer.
                  </p>

                  {optionCards([
                    'Yes, I Have It',
                    "No, I Don't",
                  ], 'employerInsurance')}

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                        opacity:
                          formData.employerInsurance
                            ? 1
                            : 0.5,
                      }}
                      disabled={!formData.employerInsurance}
                      onClick={nextStep}
                    >
                      Continue
                    </button>

                  </div>

                </>
              )}

              {/* STEP 6 */}

              {step === 6 && (
                <>

                  <h2 style={styles.title}>
                    Recent Life Change?
                  </h2>

                  <p style={styles.subtitle}>
                    Qualifying events may open special enrollment.
                  </p>

                  {optionCards([
                    'Lost Job',
                    'Moved',
                    'Got Married',
                    'Had a Baby',
                    'None Of The Above',
                  ], 'lifeChange')}

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                        opacity:
                          formData.lifeChange
                            ? 1
                            : 0.5,
                      }}
                      disabled={!formData.lifeChange}
                      onClick={nextStep}
                    >
                      Continue
                    </button>

                  </div>

                </>
              )}

              {/* STEP 7 */}

              {step === 7 && (
                <>

                  <h2 style={styles.title}>
                    Where Should We Send Your Savings?
                  </h2>

                  <p style={styles.subtitle}>
                    A licensed agent will share personalized plan options.
                  </p>

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    style={styles.input}
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control mt-3"
                    style={styles.input}
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />

                  <div className="input-group mt-3">

                    <span
                      className="input-group-text"
                      style={{
                        borderRadius: '14px 0 0 14px',
                        background: '#f8fafc',
                        fontWeight: '600',
                        padding: '0 18px',
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
                        borderRadius: '0 14px 14px 0',
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

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                        opacity:
                          formData.fullName &&
                            formData.email.includes('@') &&
                            formData.phone.length >= 10
                            ? 1
                            : 0.5,
                      }}
                      disabled={
                        !formData.fullName ||
                        !formData.email.includes('@') ||
                        formData.phone.length < 10
                      }
                      onClick={nextStep}
                    >
                      Continue
                    </button>

                  </div>

                </>
              )}

              {/* STEP 8 */}

              {step === 8 && (
                <>

                  <h2 style={styles.title}>
                    One Quick Agreement
                  </h2>

                  <p style={styles.subtitle}>
                    Review and confirm to continue.
                  </p>

                  <div
                    className="p-4 rounded"
                    style={{ background: '#f8fafc' }}
                  >

                    <div className="d-flex gap-2">

                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) =>
                          updateField('consent', e.target.checked)
                        }
                      />

                      <span>
                        I agree to receive calls and messages regarding ACA plans.
                      </span>

                    </div>

                    <p className="text-muted mt-3">
                      By submitting, I consent to receive calls, text messages,
                      and emails regarding ACA plans using automated technology.
                    </p>

                  </div>

                  <div className="d-flex justify-content-between mt-4">

                    <button
                      style={styles.backBtn}
                      onClick={prevStep}
                    >
                      <FaArrowLeft /> Back
                    </button>

                    <button
                      style={{
                        ...styles.mainBtn,
                        width: 'auto',
                        opacity:
                          formData.consent
                            ? 1
                            : 0.5,
                      }}
                      disabled={!formData.consent}
                      onClick={submitForm}
                    >
                      {loading
                        ? 'Submitting...'
                        : 'See My Plans'}
                    </button>

                  </div>

                </>
              )}

              {/* SUCCESS */}

              {step === 9 && (

                <div className="text-center py-4">

                  <FaCheckCircle
                    style={{
                      fontSize: '80px',
                      color: '#16a34a',
                    }}
                  />

                  <h2
                    className="mt-4 fw-bold"
                  >
                    Great News,
                    {' '}
                    {formData.fullName || 'John'}!
                  </h2>

                  <p className="text-muted mt-3">
                    Checking plans in {formData.zipCode}...
                  </p>

                  <div style={styles.successBox}>

                    <h5 className="fw-bold">
                      What Happens Next?
                    </h5>

                    <p className="mt-3">
                      A licensed agent will call you at
                      <strong>
                        {' '}
                        {formData.phone}
                      </strong>
                    </p>

                    <p>
                      Confirmation sent to
                      <strong>
                        {' '}
                        {formData.email}
                      </strong>
                    </p>

                  </div>

                </div>

              )}

              {step <= 8 && (

                <div style={styles.trustBox}>

                  <div>
                    <FaShieldAlt /> Secure & Protected
                  </div>

                  <div>
                    <FaLock /> Privacy Secured
                  </div>

                  <div>
                    <FaPhoneAlt /> Licensed Agents
                  </div>

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