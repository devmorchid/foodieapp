import React from "react";
import '../style/Footer.css'; // Assuming you have a CSS file for styling the footer
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure you have Bootstrap Icons for the social media

export default function Footer() {
  return (
    <footer className="footer-gradient py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} FoodieApp. Tous droits réservés.</p>
        <div className="d-flex align-items-center">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4">
            <i className="bi bi-tiktok"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
