import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/reports?my=true');
        setReports(res.data);
        setLoading(false);
      } catch (err) {
        setAlert({
          type: 'error',
          message: err.response?.data?.message || 'Failed to fetch dashboard statistics.'
        });
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalReports = reports.length;
  const anonymousReports = reports.filter(r => r.anonymous).length;
  const publicReports = totalReports - anonymousReports;

  return (
    <div className="container">
      {loading && <Spinner />}
      {alert && (
        <div className="alert-container">
          <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}

      <header className="dashboard-header">
        <div>
          <h1 style={{ marginBottom: '0.2rem' }}>Welcome, <span className="gradient-text">{user?.name}</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Protecting yourself and others on campus.</p>
        </div>
        <Link to="/report-incident" className="btn btn-primary">
          ➕ File New Report
        </Link>
      </header>

      {/* Statistics Section */}
      <section className="stats-grid">
        <div className="glass-card stat-card">
          <span className="stat-label">My Reports</span>
          <div className="stat-value">{totalReports}</div>
        </div>
        <div className="glass-card stat-card blue">
          <span className="stat-label">Anonymous Submissions</span>
          <div className="stat-value">{anonymousReports}</div>
        </div>
        <div className="glass-card stat-card cyan">
          <span className="stat-label">Identified Submissions</span>
          <div className="stat-value">{publicReports}</div>
        </div>
        <div className="glass-card stat-card green">
          <span className="stat-label">Platform Status</span>
          <div className="stat-value">Active</div>
        </div>
      </section>

      {/* Quick Access Actions */}
      <section className="quick-actions-panel">
        <h2 style={{ marginBottom: '1.5rem' }}>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/report-incident" className="glass-card quick-action-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✍️</div>
            <h3>File a Report</h3>
            <p>Log a cyberbullying incident either anonymously or under your name.</p>
            <span className="btn btn-secondary btn-full" style={{ marginTop: '0.5rem' }}>Report Incident</span>
          </Link>

          <Link to="/my-reports" className="glass-card quick-action-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📂</div>
            <h3>Manage Reports</h3>
            <p>Search, review details, and delete cases you have logged.</p>
            <span className="btn btn-secondary btn-full" style={{ marginTop: '0.5rem' }}>View My Reports</span>
          </Link>
        </div>
      </section>

      {/* Campus Support & Resources */}
      <section className="support-section">
        <h2 style={{ marginBottom: '1.5rem' }}>Confidential Support Network</h2>
        <div className="support-grid">
          <div className="glass-card support-card">
            <div>
              <div className="support-title">Student Counselling Center</div>
              <p className="support-desc">Talk directly with a professional psychologist who understands campus bullying dynamics.</p>
            </div>
            <div className="support-number">📞 1-800-273-8255</div>
          </div>

          <div className="glass-card support-card">
            <div>
              <div className="support-title">Anti-Bullying Cell / Dean Office</div>
              <p className="support-desc">Report severe offences directly to the university disciplinary committee.</p>
            </div>
            <div className="support-number">📧 safety@university.edu</div>
          </div>

          <div className="glass-card support-card">
            <div>
              <div className="support-title">Cyber Crime Cell</div>
              <p className="support-desc">For technical issues like hacking, impersonation, profile leaks, or blackmail.</p>
            </div>
            <div className="support-number">📞 1930 Helpline</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
