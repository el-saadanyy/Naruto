import React from 'react';
import AllianceStickyHud from '../components/alliance/AllianceStickyHud';
import AllianceHeroSection from '../components/alliance/AllianceHeroSection';
import AllianceFactionsSection from '../components/alliance/AllianceFactionsSection';
import AllianceMatrixSection from '../components/alliance/AllianceMatrixSection';
import AlliancePortalSection from '../components/alliance/AlliancePortalSection';

function AlliancePage() {
  return (
    <div className="alliance_page_wrapper">
      <style>{`
        /* ==========================================================================
           ALLIANCE PAGE MOBILE RESPONSIVENESS & SCROLL CONTAINER PURGE
           ========================================================================== */

        /* Root Page & Main: NO overflow properties to guarantee pure document scroll */
        .alliance_page_wrapper {
          width: 100%;
          position: relative;
          background-color: var(--bg-ink, #080808);
          color: var(--text-cream, #f5f0eb);
          overflow: visible;
        }

        #alliance-main-root {
          width: 100%;
          position: relative;
          overflow: visible;
        }

        /* Scrollbar purge across all devices */
        html, body, #root, .alliance_page_wrapper, #alliance-main-root, * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Desktop vs Mobile Matrix Display */
        .matrix-desktop-only {
          display: block;
        }
        .matrix-mobile-only {
          display: none;
        }

        /* Tablet & Mobile Breakpoints (<= 992px) */
        @media (max-width: 992px) {
          .faction-container {
            padding-right: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          .faction-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .faction-media-frame {
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 10;
            max-height: 320px;
          }

          .portal-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* Show cards instead of wide table on all screens <= 992px */
          .matrix-desktop-only {
            display: none !important;
          }

          .matrix-mobile-only {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
          }
        }

        /* Mobile Breakpoints (<= 768px) */
        @media (max-width: 768px) {
          /* 1. Hero Section */
          .alliance-hero-section {
            padding: 100px 16px 36px !important;
            min-height: auto !important;
          }

          .alliance-title {
            font-size: clamp(2.2rem, 8.5vw, 3.4rem) !important;
            letter-spacing: 2px !important;
            line-height: 1.05 !important;
            margin-bottom: 6px !important;
          }

          .alliance-kanji-sub {
            font-size: clamp(0.78rem, 3.2vw, 0.95rem) !important;
            letter-spacing: 1.5px !important;
            margin-bottom: 12px !important;
          }

          .alliance-subtitle {
            font-size: clamp(0.95rem, 3.8vw, 1.2rem) !important;
            letter-spacing: 1px !important;
            margin-bottom: 12px !important;
          }

          .alliance-lead-desc {
            font-size: 0.88rem !important;
            line-height: 1.65 !important;
            margin-bottom: 20px !important;
            padding: 0;
          }

          .ranking-disclaimer-box {
            padding: 12px 14px !important;
            font-size: 0.78rem !important;
            gap: 10px !important;
            line-height: 1.55 !important;
          }

          .ranking-disclaimer-box i {
            font-size: 1.1rem !important;
            margin-top: 2px !important;
          }

          .hero-konoha-watermark {
            max-width: 140px !important;
            right: -10px !important;
          }

          /* 2. Faction Stages */
          .faction-container {
            padding-right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          /* 2. Faction Stages */
          .faction-stage {
            padding: 40px 14px !important;
          }

          .faction-header-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            margin-bottom: 16px !important;
            padding-bottom: 12px !important;
          }

          .faction-rank-badge {
            padding: 5px 12px !important;
            gap: 8px !important;
            flex-wrap: wrap !important;
          }

          .faction-rank-badge .rank-num {
            font-size: 0.95rem !important;
          }

          .faction-rank-badge .rank-type {
            font-size: 0.72rem !important;
            letter-spacing: 1px !important;
          }

          .faction-era-tag {
            font-size: 0.72rem !important;
            letter-spacing: 1px !important;
          }

          .faction-media-frame {
            width: 100% !important;
            max-width: 100% !important;
            height: 220px !important;
            max-height: 240px !important;
            aspect-ratio: 16 / 9 !important;
            border-radius: 8px !important;
          }

          .faction-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            padding: 0 !important;
          }

          .faction-insignia-stamp {
            bottom: 8px !important;
            left: 8px !important;
            padding: 2px 8px !important;
            gap: 6px !important;
          }

          .insignia-kanji {
            font-size: 0.95rem !important;
          }

          .insignia-label {
            font-size: 0.62rem !important;
          }

          /* 3. KEY STATS / COMMAND METRIC STRIP */
          .faction-metric-strip {
            margin-top: 12px !important;
            padding: 12px 14px !important;
            gap: 10px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            border-radius: 8px !important;
          }

          .f-metric {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 3px !important;
            padding-bottom: 8px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
            width: 100% !important;
          }

          .f-metric:last-child {
            padding-bottom: 0 !important;
            border-bottom: none !important;
          }

          .fm-label {
            font-size: 0.66rem !important;
            letter-spacing: 1px !important;
            color: var(--text-muted, #a8a29e) !important;
            text-transform: uppercase !important;
            line-height: 1.3 !important;
          }

          .fm-value {
            font-size: 0.82rem !important;
            letter-spacing: 0.5px !important;
            line-height: 1.35 !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            width: 100% !important;
          }

          /* 4. Faction Intel Details */
          .intel-classification {
            font-size: 0.68rem !important;
            letter-spacing: 1.5px !important;
            margin-bottom: 6px !important;
          }

          .faction-name {
            font-size: clamp(1.75rem, 6vw, 2.4rem) !important;
            letter-spacing: 1.5px !important;
            margin-bottom: 3px !important;
            line-height: 1.1 !important;
          }

          .faction-kanji-title {
            font-size: 0.80rem !important;
            letter-spacing: 1.5px !important;
            margin-bottom: 12px !important;
          }

          .faction-synopsis {
            font-size: 0.86rem !important;
            line-height: 1.62 !important;
            margin-bottom: 16px !important;
          }

          .faction-breakdown-card {
            padding: 14px 14px !important;
            gap: 10px !important;
            border-radius: 8px !important;
          }

          .breakdown-title {
            font-size: 0.76rem !important;
            letter-spacing: 1px !important;
            gap: 6px !important;
          }

          .allied-powers-list {
            gap: 6px !important;
          }

          .power-tag {
            padding: 4px 8px !important;
            font-size: 0.68rem !important;
            gap: 4px !important;
          }

          .division-grid,
          .akatsuki-roster-grid,
          .kara-roster-grid,
          .split-columns,
          .taka-roster-grid,
          .seven-blades-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }

          .div-item,
          .ak-member,
          .ak-cell,
          .kara-node,
          .taka-card,
          .blade-card {
            padding: 8px 10px !important;
            font-size: 0.76rem !important;
            line-height: 1.45 !important;
            border-radius: 6px !important;
          }

          .akatsuki-quote,
          .intel-quote {
            padding: 10px 12px !important;
            font-size: 0.78rem !important;
            gap: 8px !important;
            line-height: 1.5 !important;
          }

          /* 5. Matrix Section Responsive Transformation */
          .faction-matrix-section {
            padding: 40px 14px !important;
          }

          .matrix-kicker {
            font-size: 0.68rem !important;
            letter-spacing: 1.5px !important;
          }

          .matrix-title {
            font-size: clamp(1.75rem, 6vw, 2.4rem) !important;
            letter-spacing: 2px !important;
            margin-bottom: 4px !important;
          }

          .matrix-sub {
            font-size: 0.78rem !important;
            letter-spacing: 1px !important;
            margin-bottom: 10px !important;
          }

          .matrix-desc {
            font-size: 0.84rem !important;
            line-height: 1.58 !important;
            margin-bottom: 20px !important;
          }

          .matrix-mobile-card {
            background: rgba(12, 10, 8, 0.92);
            border: 1px solid var(--border-gold, rgba(197, 160, 89, 0.35));
            border-radius: 10px;
            padding: 12px 10px !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            gap: 8px !important;
          }

          .mm-card-header {
            display: flex;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            padding-bottom: 8px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          }

          .mm-card-title-group {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .mm-card-title {
            font-family: var(--font-display, "Street Culture", sans-serif);
            font-size: 0.95rem !important;
            letter-spacing: 1px;
            line-height: 1.15;
          }

          .mm-card-sub {
            font-size: 0.68rem !important;
            color: var(--text-muted, #a8a29e);
          }

          .tag-table {
            font-size: 0.64rem !important;
            padding: 2px 6px !important;
          }

          .mm-card-metrics-grid {
            display: grid;
            grid-template-columns: 1fr !important;
            gap: 5px !important;
          }

          .mm-metric-box {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 6px;
            padding: 6px 8px !important;
            display: flex;
            flex-direction: column;
            gap: 2px !important;
          }

          .mm-metric-label {
            font-family: var(--font-accent, "Varsity Team", sans-serif);
            font-size: 0.58rem !important;
            font-weight: 800;
            letter-spacing: 0.5px;
            color: var(--text-muted, #a8a29e);
            text-transform: uppercase;
          }

          .badge-eval {
            font-size: 0.66rem !important;
            padding: 2px 6px !important;
          }

          /* 6. Portal Conclusion Section */
          .faction-portal-section {
            padding: 40px 14px 80px !important;
          }

          .portal-quote-decor {
            font-size: 1.5rem !important;
            margin-bottom: 6px !important;
          }

          .portal-quote {
            font-size: clamp(1.3rem, 5vw, 1.85rem) !important;
            letter-spacing: 1.5px !important;
            line-height: 1.25 !important;
          }

          .portal-subquote {
            font-size: 0.82rem !important;
            line-height: 1.58 !important;
            margin-bottom: 20px !important;
          }

          .portal-card {
            padding: 16px 14px !important;
            gap: 8px !important;
          }
        }

        /* Compact Mobile (<= 540px) */
        @media (max-width: 540px) {
          .alliance-hero-section {
            padding: 85px 12px 28px !important;
          }

          .faction-stage {
            padding: 32px 12px !important;
          }

          .faction-rank-badge {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 6px 10px !important;
            gap: 6px 8px !important;
          }

          .faction-rank-badge .rank-type {
            font-size: 0.68rem !important;
            line-height: 1.3 !important;
          }

          .faction-media-frame {
            height: 195px !important;
            max-height: 210px !important;
            aspect-ratio: 16 / 9 !important;
          }

          .faction-metric-strip {
            padding: 10px 12px !important;
            gap: 8px !important;
          }

          .fm-label {
            font-size: 0.62rem !important;
          }

          .fm-value {
            font-size: 0.78rem !important;
            line-height: 1.35 !important;
          }

          .faction-name {
            font-size: clamp(1.65rem, 6.5vw, 2.1rem) !important;
          }

          .faction-synopsis {
            font-size: 0.83rem !important;
            line-height: 1.55 !important;
          }

          .faction-breakdown-card {
            padding: 12px 10px !important;
            gap: 8px !important;
          }

          .breakdown-title {
            font-size: 0.72rem !important;
          }

          .power-tag {
            padding: 3px 7px !important;
            font-size: 0.64rem !important;
          }

          .division-grid,
          .akatsuki-roster-grid,
          .kara-roster-grid,
          .split-columns,
          .taka-roster-grid,
          .seven-blades-grid {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }

          .div-item,
          .ak-member,
          .kara-node,
          .taka-card,
          .blade-card,
          .split-col-leaf,
          .split-col-sand {
            padding: 7px 9px !important;
            font-size: 0.74rem !important;
            line-height: 1.4 !important;
          }

          .ring-badge {
            font-size: 0.62rem !important;
            padding: 1px 5px !important;
          }

          .mm-card-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 5px !important;
          }

          .matrix-mobile-card {
            padding: 12px 10px !important;
            gap: 8px !important;
          }

          .mm-card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            padding-bottom: 8px !important;
          }

          .mm-metric-box {
            padding: 6px 8px !important;
            gap: 2px !important;
          }

          .mm-metric-label {
            font-size: 0.58rem !important;
          }

          .badge-eval {
            font-size: 0.66rem !important;
            padding: 2px 6px !important;
          }
        }

        /* Small Mobile Screens (<= 375px & 320px) */
        @media (max-width: 375px) {
          .alliance-hero-section {
            padding: 80px 10px 24px !important;
          }

          .faction-stage {
            padding: 26px 10px !important;
          }

          .ranking-disclaimer-box {
            padding: 10px 10px !important;
            font-size: 0.72rem !important;
          }

          .faction-media-frame {
            height: 175px !important;
            min-height: 165px !important;
          }

          .faction-name {
            font-size: 1.6rem !important;
          }

          .faction-kanji-title {
            font-size: 0.72rem !important;
            margin-bottom: 10px !important;
          }

          .faction-synopsis {
            font-size: 0.80rem !important;
            line-height: 1.5 !important;
            margin-bottom: 12px !important;
          }

          .faction-rank-badge .rank-type {
            font-size: 0.62rem !important;
          }

          .faction-metric-strip {
            padding: 8px 10px !important;
          }

          .fm-value {
            font-size: 0.74rem !important;
          }

          .div-item,
          .ak-member,
          .kara-node,
          .taka-card,
          .blade-card {
            padding: 6px 8px !important;
            font-size: 0.70rem !important;
          }

          .power-tag {
            padding: 2px 6px !important;
            font-size: 0.60rem !important;
          }

          .matrix-mobile-card {
            padding: 10px 8px !important;
          }
        }
      `}</style>

      <AllianceStickyHud />
      <main id="alliance-main-root">
        <AllianceHeroSection />
        <AllianceFactionsSection />
        <AllianceMatrixSection />
        <AlliancePortalSection />
      </main>
    </div>
  );
}

export default AlliancePage;
