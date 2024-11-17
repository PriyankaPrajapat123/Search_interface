import React from "react";
import "./footer.css"; // Importing the CSS file


function Footer() {
  return (
    <footer className="footer">
      <ul>
        <li>
          <a href="#">Pro</a>
        </li>
        <li>
          <a href="#">Enterprise</a>
        </li>
        <li>
          <a href="#">Store</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <select>
          <option value="English">English</option>
            <option value="Español">Español</option>
            <option value="Français">Français</option>
            <option value="Deutsch">Deutsch</option>
            <option value="Italiano">Italiano</option>          </select>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
