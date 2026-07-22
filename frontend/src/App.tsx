import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProviders } from '@/providers';
import { AppRoutes } from '@/routes';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <Router>
        <AppRoutes />
      </Router>
    </AppProviders>
  );
};

export default App;
