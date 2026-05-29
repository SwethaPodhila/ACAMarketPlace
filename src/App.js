import React from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import EligibilityPage from './pages/EligibilityPage';
import UserDetailsPage from './pages/UserDetailsPage';
import ThankYouPage from './pages/ThankYouPage';

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

    </Routes>

  );

}

export default App;