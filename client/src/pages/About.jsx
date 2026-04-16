import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 className="section-title">About MiniShop</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto 4rem', background: 'var(--surface)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Our Story</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          MiniShop started as a university project and grew into a fully-functional e-commerce platform.
          Built with the MERN stack (MongoDB, Express, React, Node.js), it demonstrates modern
          full-stack web development practices including RESTful APIs, state management, and responsive design.
        </p>
        <h2 style={{ marginBottom: '1rem' }}>Our Technologies</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {['React', 'Node.js', 'Express', 'MongoDB', 'Vite', 'Axios', 'JWT Auth'].map(tech => (
            <span key={tech} style={{ background: '#EEF2FF', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 500, fontSize: '0.9rem' }}>
              {tech}
            </span>
          ))}
        </div>
        <h2 style={{ marginBottom: '1rem' }}>Contact Us</h2>
        <p style={{ color: 'var(--text-muted)' }}>Email: support@minishop.com</p>
        <p style={{ color: 'var(--text-muted)' }}>Phone: +1 234 567 8900</p>
      </div>
    </div>
  );
};

export default About;
