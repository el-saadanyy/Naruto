import React from 'react';
import ClansHeroSection from '../components/clans/ClansHeroSection';
import ClanCodexSection from '../components/clans/ClanCodexSection';
import BloodlineArchiveSection from '../components/clans/BloodlineArchiveSection';
import SupportingClansSection from '../components/clans/SupportingClansSection';

function ClansPage() {
  return (
    <div className="clans_page_wrapper">
      <ClansHeroSection />
      <ClanCodexSection />
      <BloodlineArchiveSection />
      <SupportingClansSection />
    </div>
  );
}

export default ClansPage;
