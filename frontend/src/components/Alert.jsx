import React, { useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Dismiss automatically after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type === 'error' ? 'error' : 'success'}`}>
      <span>{message}</span>
      <button className="alert-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
