import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ChakraAwakeningSection from '../components/home/ChakraAwakeningSection';
import StoryChaptersSection from '../components/home/StoryChaptersSection';
import ShinobiChronicleSection from '../components/home/ShinobiChronicleSection';
import ShinobiSystemSection from '../components/home/ShinobiSystemSection';
import MentorsSection from '../components/home/MentorsSection';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ChakraAwakeningSection />
      <StoryChaptersSection />
      <ShinobiChronicleSection />
      <ShinobiSystemSection />
      <MentorsSection />
    </>
  );
}

export default HomePage;
