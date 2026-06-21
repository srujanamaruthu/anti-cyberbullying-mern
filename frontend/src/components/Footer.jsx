import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Anti-Cyberbullying Student Network. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          A confidential, secure platform built for student protection and support.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
