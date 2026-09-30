import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function AllianceFactionsSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const stages = containerRef.current?.querySelectorAll('.faction-stage');

      stages?.forEach((stage) => {
        const headerBar = stage.querySelector('.faction-header-bar');
        const visualCol = stage.querySelector('.faction-visual-col');
        const intelCol = stage.querySelector('.faction-intel-col');

        if (headerBar) {
          gsap.fromTo(
            headerBar,
            { opacity: 0, y: isMobile ? 15 : 30 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.7 : 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: isMobile ? 'top 88%' : 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (visualCol) {
          gsap.fromTo(
            visualCol,
            { opacity: 0, scale: isMobile ? 0.98 : 0.95, y: isMobile ? 20 : 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: isMobile ? 0.8 : 1.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: isMobile ? 'top 85%' : 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (intelCol) {
          gsap.fromTo(
            intelCol.children,
            { opacity: 0, x: isMobile ? 0 : 25, y: isMobile ? 15 : 0 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              stagger: isMobile ? 0.08 : 0.12,
              duration: isMobile ? 0.7 : 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: isMobile ? 'top 85%' : 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* FACTION 01: ALLIED SHINOBI FORCES */}
      <section className="faction-stage faction-allied" id="faction-allied-forces">
        <div className="faction-bg-aura aura-allied"></div>
        <div className="faction-container">
          <div className="faction-header-bar">
            <div className="faction-rank-badge">
              <span className="rank-num">RANK 01</span>
              <span className="rank-type">TOTAL MILITARY COALITION // 忍連合軍</span>
            </div>
            <div className="faction-era-tag">
              <i className="fa-solid fa-flag"></i> FOURTH SHINOBI WORLD WAR
            </div>
          </div>

          <div className="faction-layout-grid">
            <div className="faction-visual-col">
              <div className="faction-media-frame manga-panel">
                <img
                  className="faction-img"
                  src="/assets/image/faction_allied_forces_cliff.png"
                  alt="Allied Shinobi Forces Army and Five Kage on Cliff"
                />
                <div className="faction-media-overlay"></div>
                <div className="faction-insignia-stamp">
                  <span className="insignia-kanji">忍</span>
                  <span className="insignia-label">UNIVERSAL EMBLEM</span>
                </div>
              </div>

              {/* Key Metrics Matrix */}
              <div className="faction-metric-strip manga-panel">
                <div className="f-metric">
                  <span className="fm-label">ESTIMATED COMBAT FORCE</span>
                  <span className="fm-value highlight-gold">80,000+ SHINOBI & SAMURAI</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">SUPREME COMMAND</span>
                  <span className="fm-value">FIVE KAGE & GENERAL MIFUNE</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">MILITARY STATUS</span>
                  <span className="fm-value highlight-green">VICTORIOUS // WORLD PRESERVED</span>
                </div>
              </div>
            </div>

            <div className="faction-intel-col">
              <span className="intel-classification">
                <i className="fa-solid fa-shield"></i> CLASSIFIED DOSSIER // 01
              </span>
              <h2 className="faction-name">ALLIED SHINOBI FORCES</h2>
              <div className="faction-kanji-title">忍連合軍 (SHINOBI RENGŌGUN)</div>

              <p className="faction-synopsis">
                The grandest and most formidable military coalition in recorded shinobi history.
                Formed during the emergency Five Kage Summit to combat the existential threat of Tobi
                (Obito Uchiha), Kabuto Yakushi&apos;s Edo Tensei legions, and the Ten-Tails, this coalition
                marked the first time the Five Great Shinobi Nations united alongside the Land of
                Iron Samurai under a single banner and shared headband bearing the kanji for{' '}
                <strong>&quot;Shinobi&quot; (忍)</strong>.
              </p>

              <div className="faction-breakdown-card manga-panel">
                <h3 className="breakdown-title">
                  <i className="fa-solid fa-network-wired"></i> COALITION BASTIONS & PARTICIPATING
                  POWERS
                </h3>
                <div className="allied-powers-list">
                  <span className="power-tag">
                    <i className="fa-solid fa-leaf"></i> Hidden Leaf (Konohagakure)
                  </span>
                  <span className="power-tag">
                    <i className="fa-solid fa-wind"></i> Hidden Sand (Sunagakure)
                  </span>
                  <span className="power-tag">
                    <i className="fa-solid fa-mountain"></i> Hidden Stone (Iwagakure)
                  </span>
                  <span className="power-tag">
                    <i className="fa-solid fa-bolt"></i> Hidden Cloud (Kumogakure)
                  </span>
                  <span className="power-tag">
                    <i className="fa-solid fa-water"></i> Hidden Mist (Kirigakure)
                  </span>
                  <span className="power-tag samurai-tag">
                    <i className="fa-solid fa-khanda"></i> Land of Iron (Samurai Army)
                  </span>
                </div>

                <h3 className="breakdown-title mt-4">
                  <i className="fa-solid fa-chess"></i> BATTLEFIELD DIVISION COMMANDERS
                </h3>
                <div className="division-grid">
                  <div className="div-item">
                    <span className="div-name">FIRST DIVISION (MID-RANGE)</span>
                    <span className="div-leader">Commander Darui</span>
                  </div>
                  <div className="div-item">
                    <span className="div-name">SECOND DIVISION (CLOSE-RANGE)</span>
                    <span className="div-leader">Commander Kitsuchi</span>
                  </div>
                  <div className="div-item">
                    <span className="div-name">THIRD DIVISION (SHORT-MID RANGE)</span>
                    <span className="div-leader">Commander Kakashi Hatake</span>
                  </div>
                  <div className="div-item">
                    <span className="div-name">FOURTH DIVISION (LONG-RANGE / PROXY GENERAL)</span>
                    <span className="div-leader">Regimental Commander Gaara</span>
                  </div>
                  <div className="div-item">
                    <span className="div-name">FIFTH DIVISION (SPECIAL OPERATIONS)</span>
                    <span className="div-leader">General Mifune (Samurai)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTION 02: AKATSUKI */}
      <section className="faction-stage faction-akatsuki-stage" id="faction-akatsuki">
        <div className="faction-bg-aura aura-akatsuki"></div>
        <div className="faction-container">
          <div className="faction-header-bar">
            <div className="faction-rank-badge rank-crimson">
              <span className="rank-num">RANK 02</span>
              <span className="rank-type">SHADOW MERCENARY SYNDICATE // 暁</span>
            </div>
            <div className="faction-era-tag">
              <i className="fa-solid fa-cloud-moon"></i> GLOBAL S-RANK THREAT ERA
            </div>
          </div>

          <div className="faction-layout-grid">
            <div className="faction-visual-col">
              <div className="faction-media-frame manga-panel frame-akatsuki">
                <img
                  className="faction-img"
                  src="/assets/image/faction_akatsuki_members.png"
                  alt="Akatsuki Organization Members"
                />
                <div className="faction-media-overlay overlay-akatsuki"></div>
                <div className="faction-insignia-stamp stamp-akatsuki">
                  <span className="insignia-kanji">暁</span>
                  <span className="insignia-label">RED CLOUD EMBLEM</span>
                </div>
              </div>

              {/* Threat Matrix */}
              <div className="faction-metric-strip manga-panel">
                <div className="f-metric">
                  <span className="fm-label">THREAT TIER</span>
                  <span className="fm-value highlight-red">CATASTROPHIC // CONTINENTAL</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">MEMBERSHIP SCALE</span>
                  <span className="fm-value">10 S-RANK ROGUE SPECIALISTS</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">PRIMARY OBJECTIVE</span>
                  <span className="fm-value highlight-red">
                    TAILED BEAST EXTRACTION & MOON EYE PLAN
                  </span>
                </div>
              </div>
            </div>

            <div className="faction-intel-col">
              <span className="intel-classification intel-crimson">
                <i className="fa-solid fa-triangle-exclamation"></i> CLASSIFIED DOSSIER // 02
              </span>
              <h2 className="faction-name text-crimson">AKATSUKI</h2>
              <div className="faction-kanji-title text-crimson">
                暁 (THE RED CLOUD SYNDICATE)
              </div>

              <p className="faction-synopsis">
                The most notorious and lethal criminal organization in modern ninja history.
                Originally founded in Amegakure by Yahiko, Nagato, and Konan as a pacifist coalition,
                it was subsequently co-opted and restructured into a mercenary syndicate composed of
                S-rank missing-nin from the major hidden villages, operating in two-man cells to
                systematically hunt and extract the Nine Tailed Beasts.
              </p>

              <div className="faction-breakdown-card manga-panel card-akatsuki-border">
                <h3 className="breakdown-title text-crimson">
                  <i className="fa-solid fa-users-viewfinder"></i> CORE S-RANK ROSTER & TWO-MAN
                  CELLS
                </h3>
                <div className="akatsuki-roster-grid">
                  <div className="ak-member">
                    <span className="ring-badge">玉 • Jewel</span>{' '}
                    <strong>Sasori / Tobi</strong>{' '}
                    <small>Human Puppetry / Kamui</small>
                  </div>
                  <div className="ak-member">
                    <span className="ring-badge">青 • Blue</span>{' '}
                    <strong>Deidara</strong>{' '}
                    <small>Explosion Clay (Bakuton)</small>
                  </div>
                  <div className="ak-member">
                    <span className="ring-badge">三 • Three</span>{' '}
                    <strong>Hidan</strong>{' '}
                    <small>Jashin Immortality / Curse</small>
                  </div>
                  <div className="ak-member">
                    <span className="ring-badge">北 • North</span>{' '}
                    <strong>Kakuzu</strong>{' '}
                    <small>Earth Grudge / Five Hearts</small>
                  </div>
                  <div className="ak-member">
                    <span className="ring-badge">空 • Void</span>{' '}
                    <strong>Orochimaru (Former)</strong>{' '}
                    <small>Living Reincarnation</small>
                  </div>
                  <div className="ak-member">
                    <span className="ring-badge">亥 • Boar</span>{' '}
                    <strong>Zetsu (Black & White)</strong>{' '}
                    <small>Infiltration & Intelligence</small>
                  </div>
                </div>

                <div className="intel-quote mt-4">
                  <em>
                    &quot;True peace cannot exist without knowing pain. When the world witnesses
                    catastrophe, deterrence brings harmony.&quot;
                  </em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTION 03: KARA */}
      <section className="faction-stage faction-kara-stage" id="faction-kara">
        <div className="faction-bg-aura aura-kara"></div>
        <div className="faction-container">
          <div className="faction-header-bar">
            <div className="faction-rank-badge rank-cyan">
              <span className="rank-num">RANK 03</span>
              <span className="rank-type">SCIENTIFIC SECRET SOCIETY // 殻</span>
            </div>
            <div className="faction-era-tag">
              <i className="fa-solid fa-microchip"></i> BORUTO ERA // POST-WAR MODERN AGE
            </div>
          </div>

          <div className="faction-layout-grid">
            <div className="faction-visual-col">
              <div className="faction-media-frame manga-panel frame-kara">
                <img
                  className="faction-img"
                  src="/assets/image/faction_kara.png"
                  alt="Kara Organization Inners and Jigen"
                />
                <div className="faction-media-overlay overlay-kara"></div>
                <div className="faction-insignia-stamp stamp-kara">
                  <span className="insignia-kanji">殻</span>
                  <span className="insignia-label">CYBERNETIC COVEN</span>
                </div>
              </div>

              {/* Tech Matrix */}
              <div className="faction-metric-strip manga-panel">
                <div className="f-metric">
                  <span className="fm-label">ORGANIZATION ARCHITECTURE</span>
                  <span className="fm-value highlight-cyan">
                    INNERS & OUTERS (ROMAN NUMERALS)
                  </span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">CORE TECHNOLOGY</span>
                  <span className="fm-value">SCIENTIFIC NINJA TOOLS & KARMA</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">SUPREME THREAT FOCUS</span>
                  <span className="fm-value highlight-red">
                    ŌTSUTSUKI DIVINE TREE HARVEST
                  </span>
                </div>
              </div>
            </div>

            <div className="faction-intel-col">
              <span className="intel-classification intel-cyan">
                <i className="fa-solid fa-code-branch"></i> CLASSIFIED DOSSIER // 03
              </span>
              <h2 className="faction-name text-cyan">KARA</h2>
              <div className="faction-kanji-title">
                殻 (THE HUSK) — SECRET CYBERNETIC ORDER
              </div>

              <p className="faction-synopsis">
                A secret, highly advanced syndicate operating during the Boruto era. Led by Jigen
                (the vessel of Isshiki Ōtsutsuki) and powered by the genius cybernetic engineering of
                Head Researcher Amado, Kara operated completely outside conventional chakra doctrine.
                Its core members possessed microscopic Shinobi-Ware modifications, regenerative
                cellular implants, and space-time transportation capabilities that posed a direct
                planetary threat to Naruto Uzumaki and Sasuke Uchiha.
              </p>

              <div className="faction-breakdown-card manga-panel card-dark-cyan">
                <h3 className="breakdown-title text-cyan">
                  <i className="fa-solid fa-sitemap"></i> KARA HIERARCHY & INNER CIRCLE
                </h3>
                <div className="kara-roster-grid">
                  <div className="kara-node">
                    <strong>Leader: Jigen (IV)</strong> — Vessel of Isshiki Ōtsutsuki / Sukunahikona
                    Shrinking
                  </div>
                  <div className="kara-node">
                    <strong>Delta (I)</strong> — Complete Shinobi-Ware Body / Destructive Drone Eye
                  </div>
                  <div className="kara-node">
                    <strong>Boro (III)</strong> — Microscopic Virus Fog / Core-Based Regeneration
                  </div>
                  <div className="kara-node">
                    <strong>Victor (V)</strong> — Quadruple Nature Regeneration / Pharmaceutical
                    Front
                  </div>
                  <div className="kara-node">
                    <strong>Code (VI)</strong> — White Karma Vessel / Limitless Claw Marks
                  </div>
                  <div className="kara-node">
                    <strong>Kashin Koji</strong> — Jiraiya Clone / True Fire of Samadhi Infiltrator
                  </div>
                  <div className="kara-node">
                    <strong>Amado</strong> — Chief of Research / Architect of Cybernetic Bodies
                  </div>
                </div>

                <div className="era-badge mt-4">
                  <i className="fa-solid fa-atom"></i> Boruto-Era Intelligence File: Classified
                  Technological Threat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTION 04: KONOHA–SUNA ALLIANCE */}
      <section className="faction-stage faction-konoha-suna-stage" id="faction-konoha-suna">
        <div className="faction-bg-aura aura-konoha-suna"></div>
        <div className="faction-container">
          <div className="faction-header-bar">
            <div className="faction-rank-badge rank-gold">
              <span className="rank-num">RANK 04</span>
              <span className="rank-type">SOVEREIGN DIPLOMATIC TREATY // 木ノ葉・砂同盟</span>
            </div>
            <div className="faction-era-tag">
              <i className="fa-solid fa-handshake"></i> POST-CHUNIN EXAM ERA TO MODERN AGE
            </div>
          </div>

          <div className="faction-layout-grid">
            <div className="faction-visual-col">
              <div className="faction-media-frame manga-panel frame-dual">
                <img
                  className="faction-img"
                  src="/assets/image/faction_konoha_suna_handshake.png"
                  alt="Konoha and Suna Alliance Naruto and Gaara Handshake"
                />
                <div className="faction-media-overlay overlay-dual"></div>
                <div className="faction-insignia-stamp stamp-dual">
                  <span className="insignia-kanji">木 ✕ 砂</span>
                  <span className="insignia-label">BILATERAL PACT</span>
                </div>
              </div>

              {/* Diplomatic Matrix */}
              <div className="faction-metric-strip manga-panel">
                <div className="f-metric">
                  <span className="fm-label">TREATY STATUS</span>
                  <span className="fm-value highlight-gold">PERMANENT DEFENSIVE ALLIANCE</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">CORE ARCHITECTS</span>
                  <span className="fm-value">NARUTO UZUMAKI & GAARA (5TH KAZEKAGE)</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">MILITARY RELIABILITY</span>
                  <span className="fm-value highlight-green">UNBROKEN SOLIDARITY</span>
                </div>
              </div>
            </div>

            <div className="faction-intel-col">
              <span className="intel-classification intel-gold">
                <i className="fa-solid fa-landmark"></i> CLASSIFIED DOSSIER // 04
              </span>
              <h2 className="faction-name text-gold">KONOHA–SUNA ALLIANCE</h2>
              <div className="faction-kanji-title">
                木ノ葉隠れ・砂隠れの同盟 (LEAF × SAND SOLIDARITY)
              </div>

              <p className="faction-synopsis">
                The most resilient bilateral alliance in modern geopolitical history. Following
                Orochimaru&apos;s deceitful Konoha Crush manipulation, the bond forged between Naruto
                Uzumaki and Gaara transformed two historical rivals into inseparable allies. This
                alliance provided critical reinforcements during the Sasuke Retrieval Mission, mutual
                support during the Kazekage Rescue, and laid the ideological groundwork for the
                Allied Shinobi Forces.
              </p>

              <div className="faction-breakdown-card manga-panel card-dual-split">
                <div className="split-columns">
                  <div className="split-col-leaf">
                    <h4 className="col-title text-green">
                      <i className="fa-solid fa-leaf"></i> HIDDEN LEAF SECTOR
                    </h4>
                    <p>
                      Contributed elite medical support, tactical strike squads, and reconnaissance
                      divisions. Provided immediate emergency relief when Sunagakure was targeted by
                      Akatsuki.
                    </p>
                  </div>
                  <div className="split-col-sand">
                    <h4 className="col-title text-gold">
                      <i className="fa-solid fa-sun"></i> HIDDEN SAND SECTOR
                    </h4>
                    <p>
                      Contributed desert vanguard combatants, master puppeteers (Kankurō), and
                      gale-force wind battlers (Temari). Intercepted the Sound Four during the
                      Sasuke retrieval crisis.
                    </p>
                  </div>
                </div>

                <div className="historical-milestones mt-4">
                  <h4 className="breakdown-title">
                    <i className="fa-solid fa-scroll"></i> HISTORICAL TURNING POINTS
                  </h4>
                  <ul className="milestone-list">
                    <li>
                      <strong>Post-Invasion Reconciliation:</strong> Suna formally exposed the
                      Sound&apos;s deceit and ratified a non-aggression pact.
                    </li>
                    <li>
                      <strong>Sasuke Retrieval Interception:</strong> Suna siblings arrived to save
                      Shikamaru, Kiba, and Rock Lee.
                    </li>
                    <li>
                      <strong>Kazekage Rescue Deployment:</strong> Team Kakashi and Team Guy crossed
                      borders to rescue Gaara from Akatsuki.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTION 05: TAKA / HEBI */}
      <section className="faction-stage faction-taka-stage" id="faction-taka">
        <div className="faction-bg-aura aura-taka"></div>
        <div className="faction-container">
          <div className="faction-header-bar">
            <div className="faction-rank-badge rank-purple">
              <span className="rank-num">RANK 05</span>
              <span className="rank-type">AUTONOMOUS ELITE STRIKE SQUAD // 鷹 / 蛇</span>
            </div>
            <div className="faction-era-tag">
              <i className="fa-solid fa-feather-pointed"></i> SHIPPUDEN VENGEANCE & SUMMIT
              INFILTRATION
            </div>
          </div>

          <div className="faction-layout-grid">
            <div className="faction-visual-col">
              <div className="faction-media-frame manga-panel frame-taka">
                <img
                  className="faction-img"
                  src="/assets/image/faction_taka.png"
                  alt="Taka and Hebi Sasuke Karin Suigetsu Jugo"
                />
                <div className="faction-media-overlay overlay-taka"></div>
                <div className="faction-insignia-stamp stamp-taka">
                  <span className="insignia-kanji">鷹</span>
                  <span className="insignia-label">THE HAWK</span>
                </div>
              </div>

              {/* Strike Matrix */}
              <div className="faction-metric-strip manga-panel">
                <div className="f-metric">
                  <span className="fm-label">UNIT COMPOSITION</span>
                  <span className="fm-value highlight-purple">4 SPECIALIZED INDIVIDUALS</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">LEADERSHIP</span>
                  <span className="fm-value">SASUKE UCHIHA</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">OPERATIONAL ROLE</span>
                  <span className="fm-value highlight-gold">
                    HUNTING / HIGH-VALUE ASSASSINATION
                  </span>
                </div>
              </div>
            </div>

            <div className="faction-intel-col">
              <span className="intel-classification intel-purple">
                <i className="fa-solid fa-crosshairs"></i> CLASSIFIED DOSSIER // 05
              </span>
              <h2 className="faction-name text-purple">TAKA / HEBI</h2>
              <div className="faction-kanji-title">
                蛇 (HEBI - SNAKE) ➔ 鷹 (TAKA - HAWK)
              </div>

              <p className="faction-synopsis">
                A compact, elite rogue strike squad formed by Sasuke Uchiha after severing ties with
                Orochimaru. Classified not as a world-scale military alliance, but as an autonomous
                high-lethality strike unit. Originally named <strong>Hebi (Snake)</strong> to hunt
                Itachi Uchiha, the unit transitioned to <strong>Taka (Hawk)</strong> after learning
                the truth of the Uchiha Clan massacre, briefly aligning with Akatsuki to assault the
                Five Kage Summit.
              </p>

              <div className="faction-breakdown-card manga-panel card-dark-purple">
                <h3 className="breakdown-title text-purple">
                  <i className="fa-solid fa-user-ninja"></i> SQUAD ROSTER & COMBAT SPECIALTIES
                </h3>
                <div className="taka-roster-grid">
                  <div className="taka-card">
                    <strong>Sasuke Uchiha (Leader)</strong>
                    <span>
                      Chidori Flow, Curse Mark Stage 2, Mangekyō Sharingan & Amaterasu Flame
                      Control.
                    </span>
                  </div>
                  <div className="taka-card">
                    <strong>Suigetsu Hōzuki (Vanguard Swordsman)</strong>
                    <span>
                      Hydrification Technique (water body fluidity) and wielder of the
                      Executioner&apos;s Blade (Kubikiribōchō).
                    </span>
                  </div>
                  <div className="taka-card">
                    <strong>Karin Uzumaki (Sensory & Medical Support)</strong>
                    <span>
                      Mind&apos;s Eye of the Kagura long-range chakra sensory radar and Heal Bite
                      vitality transference.
                    </span>
                  </div>
                  <div className="taka-card">
                    <strong>Jūgo (Heavy Artillery & Sage Tank)</strong>
                    <span>
                      Originator of the Curse Mark enzyme; commands Sage Transformation cellular
                      cannons and kinetic shields.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTION 06: SEVEN NINJA SWORDSMEN OF THE MIST */}
      <section className="faction-stage faction-swordsmen-stage" id="faction-seven-swordsmen">
        <div className="faction-bg-aura aura-swordsmen"></div>
        <div className="faction-container">
          <div className="faction-header-bar">
            <div className="faction-rank-badge rank-mist">
              <span className="rank-num">RANK 06</span>
              <span className="rank-type">STATE MARTIAL ORDER // 霧の忍刀七人衆</span>
            </div>
            <div className="faction-era-tag">
              <i className="fa-solid fa-water"></i> BLOODY MIST HERITAGE & EDO TENSEI
            </div>
          </div>

          <div className="faction-layout-grid">
            <div className="faction-visual-col">
              <div className="faction-media-frame manga-panel frame-mist">
                <img
                  className="faction-img"
                  src="/assets/image/faction_seven_swordsmen.png"
                  alt="Seven Ninja Swordsmen of the Mist and Legendary Blades"
                />
                <div className="faction-media-overlay overlay-mist"></div>
                <div className="faction-insignia-stamp stamp-mist">
                  <span className="insignia-kanji">刀</span>
                  <span className="insignia-label">SEVEN BLADES</span>
                </div>
              </div>

              {/* Weapon Matrix */}
              <div className="faction-metric-strip manga-panel">
                <div className="f-metric">
                  <span className="fm-label">ORDER CLASSIFICATION</span>
                  <span className="fm-value highlight-mist">ELITE SPECIAL-OPS SLAUGHTER CORPS</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">WEAPONS ARSENAL</span>
                  <span className="fm-value">7 LEGENDARY SENTIENT & SPECIALIZED SWORDS</span>
                </div>
                <div className="f-metric">
                  <span className="fm-label">HOME VILLAGE</span>
                  <span className="fm-value">HIDDEN MIST (KIRIGAKURE)</span>
                </div>
              </div>
            </div>

            <div className="faction-intel-col">
              <span className="intel-classification intel-mist">
                <i className="fa-solid fa-khanda"></i> CLASSIFIED DOSSIER // 06
              </span>
              <h2 className="faction-name text-mist">SEVEN NINJA SWORDSMEN OF THE MIST</h2>
              <div className="faction-kanji-title">
                霧の忍刀七人衆 (KIRI NO NINDŌ NANANINSHŪ)
              </div>

              <p className="faction-synopsis">
                An elite martial order founded within Kirigakure consisting of the village&apos;s seven
                greatest bladed combatants. Passed down across bloody generations through brutal
                battlefield trials, each swordsman wielded one of the seven legendary swords forged to
                specialize in specific tactical slaughter, sensory destruction, and battlefield
                dismemberment.
              </p>

              <div className="faction-breakdown-card manga-panel card-dark-mist">
                <h3 className="breakdown-title text-mist">
                  <i className="fa-solid fa-shield-virus"></i> THE SEVEN LEGENDARY BLADES
                </h3>
                <div className="seven-blades-grid">
                  <div className="blade-card">
                    <span className="b-name">1. KUBIKIRIBŌCHŌ</span>
                    <span className="b-sub">Executioner&apos;s Blade</span>
                    <p>
                      Regenerates from broken iron using the iron harvested directly from the blood of
                      its victims.
                    </p>
                  </div>
                  <div className="blade-card">
                    <span className="b-name">2. SAMEHADA</span>
                    <span className="b-sub">Shark Skin</span>
                    <p>
                      Living sentient greatsword that shreds and consumes massive chakra reserves,
                      capable of fusing with its wielder.
                    </p>
                  </div>
                  <div className="blade-card">
                    <span className="b-name">3. NUIBARI</span>
                    <span className="b-sub">Sewing Needle</span>
                    <p>
                      Slender rapier attached to indestructible steel wire, puncturing and stitching
                      enemy lines together.
                    </p>
                  </div>
                  <div className="blade-card">
                    <span className="b-name">4. KABUTOWARI</span>
                    <span className="b-sub">Helmet Splitter</span>
                    <p>
                      Axe and hammer combo designed to shatter any defensive shield, armor, or
                      fortress wall.
                    </p>
                  </div>
                  <div className="blade-card">
                    <span className="b-name">5. SHIBUKI</span>
                    <span className="b-sub">Splash Blade</span>
                    <p>
                      Scroll-lined explosive broadsword combining physical cutting with devastating
                      continuous detonations.
                    </p>
                  </div>
                  <div className="blade-card">
                    <span className="b-name">6. KIBA</span>
                    <span className="b-sub">Lightning Fangs</span>
                    <p>
                      Twin lightning-imbued daggers claiming the title of the sharpest swords ever
                      crafted.
                    </p>
                  </div>
                  <div className="blade-card">
                    <span className="b-name">7. HIRAMEKAREI</span>
                    <span className="b-sub">Twin Broadsword</span>
                    <p>
                      Dual-handled blade capable of storing chakra and projecting gigantic blades,
                      hammers, or needle constructs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllianceFactionsSection;
