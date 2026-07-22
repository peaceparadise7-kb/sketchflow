import React from 'react';

const Logo: React.FC = () => <div className="nav-logo">SketchFlow</div>;

const Navigation: React.FC = () => <div className="nav-navigation" />;

const Actions: React.FC = () => <div className="nav-actions" />;

export const Navbar: React.FC = () => {
  return (
    <nav className="nav-container">
      <Logo />
      <Navigation />
      <Actions />
    </nav>
  );
};
