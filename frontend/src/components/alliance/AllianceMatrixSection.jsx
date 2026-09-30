import React from 'react';

const FACTION_MATRIX_DATA = [
  {
    num: '01. ALLIED FORCES',
    sub: 'Five Nations + Samurai',
    type: 'Total Coalition',
    tagClass: 'tag-coalition',
    colorClass: 'text-gold',
    scale: 'COLOSSAL (80K+)',
    scaleClass: 'eval-max',
    threat: 'HIGH (Five Kage Tier)',
    threatClass: 'eval-high',
    influence: 'MAXIMUM (Planetary)',
    influenceClass: 'eval-max',
    impact: 'WORLD PRESERVATION',
    impactClass: 'eval-max',
    rowClass: 'row-allied',
  },
  {
    num: '02. AKATSUKI',
    sub: 'S-Rank Shadow Syndicate',
    type: 'Shadow Syndicate',
    tagClass: 'tag-shadow',
    colorClass: 'text-crimson',
    scale: 'ELITE CELL (10 Members)',
    scaleClass: 'eval-med',
    threat: 'CATASTROPHIC (S-Rank)',
    threatClass: 'eval-max',
    influence: 'CONTINENTAL THREAT',
    influenceClass: 'eval-max',
    impact: 'TRIGGERED 4TH WAR',
    impactClass: 'eval-max',
    rowClass: 'row-akatsuki',
  },
  {
    num: '03. KARA',
    sub: 'Cybernetic Coven (Boruto)',
    type: 'Cybernetic Cult',
    tagClass: 'tag-tech',
    colorClass: 'text-cyan',
    scale: 'COVEN (Inners/Outers)',
    scaleClass: 'eval-med',
    threat: 'TRANSCENDENT (Ōtsutsuki)',
    threatClass: 'eval-max',
    influence: 'GLOBAL COVERT',
    influenceClass: 'eval-high',
    impact: 'PLANETARY HARVEST CRISIS',
    impactClass: 'eval-high',
    rowClass: 'row-kara',
  },
  {
    num: '04. KONOHA × SUNA',
    sub: 'Leaf & Sand Diplomatic Pact',
    type: 'Bilateral Treaty',
    tagClass: 'tag-treaty',
    colorClass: 'text-green',
    scale: 'TWO MAJOR POWERS',
    scaleClass: 'eval-high',
    threat: 'HIGH (Hokage & Kazekage)',
    threatClass: 'eval-high',
    influence: 'REGIONAL STABILITY',
    influenceClass: 'eval-high',
    impact: 'FOUNDATION OF ALLIANCE',
    impactClass: 'eval-high',
    rowClass: 'row-konoha-suna',
  },
  {
    num: '05. TAKA / HEBI',
    sub: "Sasuke's Strike Unit",
    type: 'Strike Unit',
    tagClass: 'tag-strike',
    colorClass: 'text-purple',
    scale: 'COMPACT (4 Members)',
    scaleClass: 'eval-low',
    threat: 'EXTREME (Sasuke / Mangekyō)',
    threatClass: 'eval-high',
    influence: 'TACTICAL DISRUPTION',
    influenceClass: 'eval-med',
    impact: 'KAGE SUMMIT ASSAULT',
    impactClass: 'eval-med',
    rowClass: 'row-taka',
  },
  {
    num: '06. SEVEN SWORDSMEN',
    sub: 'Mist Martial Order',
    type: 'State Martial Order',
    tagClass: 'tag-order',
    colorClass: 'text-mist',
    scale: 'SPECIAL CORPS (7 Blades)',
    scaleClass: 'eval-low',
    threat: 'VERY HIGH (Master Swordsmen)',
    threatClass: 'eval-high',
    influence: 'REGIONAL TERROR',
    influenceClass: 'eval-med',
    impact: 'BLOODY MIST HERITAGE',
    impactClass: 'eval-med',
    rowClass: 'row-swordsmen',
  },
];

function AllianceMatrixSection() {
  return (
    <section className="faction-matrix-section" id="faction-comparative-matrix">
      <div className="matrix-container">
        <div className="matrix-header text-center">
          <span className="matrix-kicker">
            <i className="fa-solid fa-chart-line"></i> HISTORICAL FACTION ANALYSIS
          </span>
          <h2 className="matrix-title">THE POWER INDEX MATRIX</h2>
          <div className="matrix-sub">
            総合戦力比較 • 組織規模・個別脅威・歴史的影響力の定性評価
          </div>
          <p className="matrix-desc">
            A comparative qualitative assessment across military scale, individual threat tier,
            geopolitical influence, organizational discipline, and ultimate historical war impact.
          </p>
        </div>

        {/* 1. Desktop Table Presentation (>768px) */}
        <div className="matrix-table-wrap manga-panel matrix-desktop-only">
          <table className="faction-comparison-table">
            <thead>
              <tr>
                <th>FACTION // 組織</th>
                <th>ORGANIZATION TYPE</th>
                <th>MILITARY SCALE</th>
                <th>INDIVIDUAL THREAT</th>
                <th>GEOPOLITICAL INFLUENCE</th>
                <th>WAR IMPACT</th>
              </tr>
            </thead>
            <tbody>
              {FACTION_MATRIX_DATA.map((row, idx) => (
                <tr key={idx} className={row.rowClass}>
                  <td className="cell-faction-name">
                    <strong className={row.colorClass}>{row.num}</strong>
                    <small>{row.sub}</small>
                  </td>
                  <td>
                    <span className={`tag-table ${row.tagClass}`}>{row.type}</span>
                  </td>
                  <td>
                    <span className={`badge-eval ${row.scaleClass}`}>{row.scale}</span>
                  </td>
                  <td>
                    <span className={`badge-eval ${row.threatClass}`}>{row.threat}</span>
                  </td>
                  <td>
                    <span className={`badge-eval ${row.influenceClass}`}>{row.influence}</span>
                  </td>
                  <td>
                    <span className={`badge-eval ${row.impactClass}`}>{row.impact}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. Mobile Responsive Stacked Cards (<=768px) */}
        <div className="matrix-mobile-cards-wrap matrix-mobile-only">
          {FACTION_MATRIX_DATA.map((row, idx) => (
            <div key={idx} className="matrix-mobile-card manga-panel">
              <div className="mm-card-header">
                <div className="mm-card-title-group">
                  <strong className={`mm-card-title ${row.colorClass}`}>{row.num}</strong>
                  <span className="mm-card-sub">{row.sub}</span>
                </div>
                <span className={`tag-table ${row.tagClass}`}>{row.type}</span>
              </div>

              <div className="mm-card-metrics-grid">
                <div className="mm-metric-box">
                  <span className="mm-metric-label">MILITARY SCALE</span>
                  <span className={`badge-eval ${row.scaleClass}`}>{row.scale}</span>
                </div>

                <div className="mm-metric-box">
                  <span className="mm-metric-label">INDIVIDUAL THREAT</span>
                  <span className={`badge-eval ${row.threatClass}`}>{row.threat}</span>
                </div>

                <div className="mm-metric-box">
                  <span className="mm-metric-label">GEOPOLITICAL INFLUENCE</span>
                  <span className={`badge-eval ${row.influenceClass}`}>{row.influence}</span>
                </div>

                <div className="mm-metric-box">
                  <span className="mm-metric-label">WAR IMPACT</span>
                  <span className={`badge-eval ${row.impactClass}`}>{row.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllianceMatrixSection;
