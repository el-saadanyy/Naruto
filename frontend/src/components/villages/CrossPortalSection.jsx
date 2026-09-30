import React from 'react';
import { Link } from 'react-router-dom';

function CrossPortalSection() {
  return (
    <section className="bijuu-portal-section">
      <div className="portal-container text-center">
        <div className="portal-quote-decor">
          <i className="fa-solid fa-scroll"></i>
        </div>
        <h2 className="portal-quote">"A SINGLE SHINOBI'S HEART CAN CHANGE A BEAST."</h2>
        <p className="portal-subquote">
          From ancient territorial fortresses to the primordial beasts within, continue your
          exploration across noble bloodlines, classified operatives, and wartime coalitions.
        </p>

        <div className="portal-cards-grid">
          <Link to="/clans" className="portal-card manga-panel">
            <i className="fa-solid fa-dna"></i>
            <h3>ANCESTRAL CLANS</h3>
            <p>
              Explore the noble bloodlines, Kekkai Genkai inheritances, and founders of the hidden
              villages.
            </p>
            <span className="portal-btn-label">OPEN CLAN CODEX →</span>
          </Link>

          <Link to="/archive" className="portal-card manga-panel">
            <i className="fa-solid fa-id-card"></i>
            <h3>SHINOBI ARCHIVE</h3>
            <p>
              Inspect classified dossiers, nature affinities, rank certifications, and signature
              jutsu lists.
            </p>
            <span className="portal-btn-label">ACCESS DATABASE →</span>
          </Link>

          <Link to="/alliance" className="portal-card manga-panel">
            <i className="fa-solid fa-shield-halved"></i>
            <h3>MILITARY ALLIANCES</h3>
            <p>
              Examine the Allied Shinobi Forces, Akatsuki syndicate, Kara, and legendary tactical
              squads.
            </p>
            <span className="portal-btn-label">VIEW ALLIANCE ARCHIVE →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CrossPortalSection;
