import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <span className="hero-badge">Confidentiality & Security Guaranteed</span>
          <h1 className="hero-title">
            Speak Up Against <br />
            <span className="gradient-text">Cyberbullying</span> Safely.
          </h1>
          <p className="hero-subtitle">
            A secure and anonymous space for students to report cyberbullying, track incidents, and access supportive resources.
          </p>
          <div className="hero-ctas">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">
                Access Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Report Incident
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About the Platform</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Cyberbullying is a critical issue that harms students' mental health, self-esteem, and studies. Many students stay silent because they fear social isolation, retaliation, or a lack of privacy.
              </p>
              <p>
                The <strong>Anti-Cyberbullying Student Network</strong> is designed to remove these barriers. By providing a secure portal where you can report incidents anonymously, we offer a safe path to seek help and document online harassment.
              </p>
            </div>
            <div className="about-img-box">
              <div className="inner-img">
                <h3 className="gradient-text">Encrypted & Secure</h3>
                <p style={{ color: 'var(--text-secondary)' }}>All submissions are stored using modern databases with toggleable anonymity options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <div className="features-grid">
            <div className="glass-card feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>JWT Protected Accounts</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Secure token validation and hashed passwords ensure that your account details remain private.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">🕶️</div>
              <h3>Anonymous Reporting</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Report bullying anonymously. Your username is hidden from general views and only visible to you.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Manage & Search Reports</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Track your logged cases, filter by incident title or description, and remove reports if resolved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
