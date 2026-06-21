import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const ReportIncident = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    anonymous: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.title.trim()) {
      tempErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      tempErrors.title = 'Title cannot be more than 100 characters';
    }

    if (!formData.type) {
      tempErrors.type = 'Incident type is required';
    }

    if (!formData.description.trim()) {
      tempErrors.description = 'Incident description is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post('/reports', formData);
      setLoading(false);
      setAlert({
        type: 'success',
        message: 'Incident reported successfully. Redirecting...'
      });
      setTimeout(() => {
        navigate('/my-reports');
      }, 1500);
    } catch (err) {
      setLoading(false);
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Failed to submit report. Please try again.'
      });
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      {loading && <Spinner />}
      {alert && (
        <div className="alert-container">
          <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Report <span className="gradient-text">Incident</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          Document the cyberbullying incident. Toggle anonymous reporting to hide your name on general feeds.
        </p>

        <div className="glass-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Report Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Brief summary of what occurred..."
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="error-msg">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="type">Incident Type</label>
              <select
                id="type"
                name="type"
                className="form-input"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">-- Select Incident Category --</option>
                <option value="Harassment">Harassment (Offensive or threatening texts/emails)</option>
                <option value="Cyberstalking">Cyberstalking (Monitoring or harassment online)</option>
                <option value="Exclusion">Exclusion (Intentional isolation from social groups)</option>
                <option value="Outing">Outing (Sharing private secrets/media without consent)</option>
                <option value="Impersonation">Impersonation (Posing as you using fake accounts)</option>
                <option value="Trolling">Trolling (Deliberate instigation of disputes)</option>
                <option value="Other">Other forms of online bullying</option>
              </select>
              {errors.type && <span className="error-msg">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Detailed Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                placeholder="Provide a description of the incident (platforms used, usernames involved, date, etc.)..."
                rows="6"
                value={formData.description}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
              />
              {errors.description && <span className="error-msg">{errors.description}</span>}
            </div>

            {/* Custom Interactive Toggle Switch */}
            <div className="toggle-wrapper">
              <div className="toggle-label-desc">
                <span className="toggle-title">Report Anonymously</span>
                <span className="toggle-subtitle">Keep my name confidential on this report.</span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 2 }}
                disabled={loading}
              >
                Submit Incident Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIncident;
