import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>&copy; 2024 Assignment-15. Built with React + Vite.</p>
        <p>Data from <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a></p>
      </div>
    </footer>
  );
}