import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../application/redux/store';
import { AuthProvider } from '../../application/firebase/Auth';
import App from '../App';

export default function Root() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ReduxProvider>
  );
}
