import React from 'react';
import VillagesHeroSection from '../components/villages/VillagesHeroSection';
import WorldMapSection from '../components/villages/WorldMapSection';
import BijuuStickyHud from '../components/villages/BijuuStickyHud';
import BijuuTransitionSection from '../components/villages/BijuuTransitionSection';
import BijuuStagesSection from '../components/villages/BijuuStagesSection';
import JinchurikiVesselsSection from '../components/villages/JinchurikiVesselsSection';
import CrossPortalSection from '../components/villages/CrossPortalSection';

function VillagesPage() {
  return (
    <>
      <VillagesHeroSection />
      <WorldMapSection />
      <BijuuStickyHud />
      <BijuuTransitionSection />
      <BijuuStagesSection />
      <JinchurikiVesselsSection />
      <CrossPortalSection />
    </>
  );
}

export default VillagesPage;
