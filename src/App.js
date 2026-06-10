import React from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import EligibilityPage from './pages/EligibilityPage';
import UserDetailsPage from './pages/UserDetailsPage';
import ThankYouPage from './pages/ThankYouPage';
import TermsConditions from './pages/Terms';
import PrivacyPolicy from './pages/Policy';
import Hero from './pages/Hero';

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<EligibilityPage />}
      />

      <Route
        path="/details"
        element={<UserDetailsPage />}
      />

      <Route
        path="/thank-you"
        element={<ThankYouPage />}
      />

      <Route
        path="/terms-conditions"
        element={<TermsConditions />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/hero"
        element={<Hero />}
      />  

    </Routes>

  );

}

export default App;