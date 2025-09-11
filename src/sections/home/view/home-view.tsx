'use client';


import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';

// ----------------------------------------------------------------------
interface FetchedHomeData {
  data: {
    _id: string;
    heading: string;
    body: string;
    image: string;
    __v: number;
  }[];
}

interface HomeViewProps {
  homeData: FetchedHomeData;
}

export function HomeView({ homeData }: HomeViewProps) {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <HomeHero data={homeData} />

      {/* <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeHighlightFeatures />

        <HomeIntegrations />

        <HomePricing />

        <HomeTestimonials />

        <HomeFAQs />

        <HomeZoneUI />

        <HomeAdvertisement />
      </Stack> */}
    </>
  );
}
