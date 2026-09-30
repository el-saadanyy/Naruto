import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <img
        className="footer-konoha-watermark"
        src="/assets/image/konohaL.png"
        alt=""
        aria-hidden="true"
      />
      <div className="info">
        <div className="right">
          <img src="/assets/image/footer.png" alt="Naruto Emblem" />
        </div>
        <div className="left">
          <nav>
            <a
              href="https://www.facebook.com/mohamed.el.saadany.529585/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </nav>
          <nav>
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </nav>
          <nav>
            <a href="#" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </nav>
          <nav>
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </nav>
          <nav>
            <a href="#" aria-label="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </nav>
        </div>
      </div>
      <div className="foot">
        <div className="right">
          <p>NARUTO © 2025 • The Will of Fire • 木ノ葉隠れの里 • All rights reserved</p>
        </div>
        <div className="lefts">
          <nav>
            <a href="#">Legal notice</a>
          </nav>
          <nav>•</nav>
          <nav>
            <a href="#">Privacy Policy</a>
          </nav>
          <nav>•</nav>
          <nav>
            <a href="#">Cookies Policy</a>
          </nav>
          <nav>•</nav>
          <nav>
            <Link to="/">NARUTO.COM</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
