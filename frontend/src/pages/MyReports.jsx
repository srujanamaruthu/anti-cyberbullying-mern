import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReports = async () => {
    try {
      const res = await api.get('/reports?my=true');
      setReports(res.data);
      setLoading(false);
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Failed to load reports. Please try again.'
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this incident report? This action is permanent.')) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/reports/${id}`);
      setAlert({
        type: 'success',
        message: 'Report deleted successfully.'
      });
      fetchReports();
    } catch (err) {
      setLoading(false);
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Failed to delete report.'
      });
    }
  };

  const filteredReports = reports.filter((report) => {
    const titleMatch = report.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = report.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descMatch;
  });

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      {loading && <Spinner />}
      {alert && (
        <div className="alert-container">
          <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}

      <header className="reports-header">
        <div>
          <h1>My <span className="gradient-text">Submitted Reports</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review, search, or remove incidents you have logged.</p>
        </div>

        <div className="search-bar-container">
          <input
            type="text"
            className="form-input"
            placeholder="Search reports by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {filteredReports.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon">📂</div>
          {reports.length === 0 ? (
            <>
              <h3>No Reports Logged Yet</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>If you have experienced cyberbullying, please document it using the form.</p>
              <Link to="/report-incident" className="btn btn-primary">
                ➕ File A Report
              </Link>
            </>
          ) : (
            <>
              <h3>No Matches Found</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search term.</p>
            </>
          )}
        </div>
      ) : (
        <div className="reports-grid">
          {filteredReports.map((report) => (
            <div key={report._id} className="glass-card report-item-card">
              <div className="report-item-top">
                <div>
                  <h3 className="report-title">{report.title}</h3>
                  <div className="report-badges" style={{ marginTop: '0.5rem' }}>
                    <span className="badge badge-type">{report.type}</span>
                    {report.anonymous ? (
                      <span className="badge badge-anon">🔒 Anonymous</span>
                    ) : (
                      <span className="badge badge-public">👤 Identified (Name Public)</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="btn btn-danger"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  title="Delete Report"
                >
                  🗑️ Delete
                </button>
              </div>

              <div className="report-description">
                {report.description}
              </div>

              <div className="report-item-footer">
                <span className="report-author">
                  Logged by: {report.anonymous ? 'Anonymous Student (You)' : report.user?.name}
                </span>
                <span>
                  Date: {new Date(report.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
