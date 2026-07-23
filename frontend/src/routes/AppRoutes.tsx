import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { Landing, Login, Register, Dashboard, Board, NotFound } from '@/pages';
import { ROUTES } from '@/constants';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* MainLayout (Landing Navbar wrapper) ONLY wraps Landing Page */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.LANDING} element={<Landing />} />
      </Route>

      {/* Authentication Pages (Use AuthLayout internally) */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      {/* Workspace App & Canvas Pages */}
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.BOARD} element={<Board />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
