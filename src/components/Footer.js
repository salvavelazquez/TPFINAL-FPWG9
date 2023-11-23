// src/components/Footer.js
import React from 'react';
import '../components/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p style={{ fontSize: '18px' }}>&copy; 2023 TPFGrupo 9.</p>
            </div>
        </footer>
    );
};

export default Footer;
