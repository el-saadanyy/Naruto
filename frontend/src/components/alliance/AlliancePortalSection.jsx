import React from 'react';
import { Link } from 'react-router-dom';

function AlliancePortalSection() {
  return (
    <section className="faction-portal-section" id="faction-final-portal">
      <div className="portal-container text-center">
        <div className="portal-quote-decor">
          <i className="fa-solid fa-scroll"></i>
        </div>
        <h2 className="portal-quote">&quot;POWER IS NOT ALWAYS MEASURED BY NUMBERS.&quot;</h2>
        <p className="portal-subquote">
          From vast armies of eighty thousand to solitary rogue squads, the balance of the Shinobi
          World was forged through conviction, sacrifice, and the clash of unyielding wills.
        </p>

        {/* Cross-Page Archive Portals */}
        <div className="portal-cards-grid">
          <Link to="/villages" className="portal-card manga-panel">
            <i className="fa-solid fa-mountain-sun"></i>
            <h3>VILLAGES ARCHIVE</h3>
            <p>Explore the Five Great Shinobi Nations, geopolitical bastions, and territories.</p>
            <span className="portal-btn-label">
              VIEW WORLD MAP <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <Link to="/clans" className="portal-card manga-panel">
            <i className="fa-solid fa-dna"></i>
            <h3>CLANS CODEX</h3>
            <p>Discover the noble bloodlines, Kekkei Genkai, and ancestral clan legacies.</p>
            <span className="portal-btn-label">
              VIEW CLAN CODEX <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <Link to="/archive" className="portal-card manga-panel">
            <i className="fa-solid fa-address-book"></i>
            <h3>SHINOBI ARCHIVE</h3>
            <p>Inspect the complete intelligence dossier of 45 legendary shinobi records.</p>
            <span className="portal-btn-label">
              VIEW SHINOBI DOSSIER <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AlliancePortalSection;
