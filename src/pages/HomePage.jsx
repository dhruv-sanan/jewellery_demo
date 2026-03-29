import HeroSection from '../components/HeroSection';
import MarqueeStrip from '../components/MarqueeStrip';
import CategoriesSection from '../components/CategoriesSection';
import StackedCategoriesSection from '../components/StackedCategoriesSection';
import CollectionsSection from '../components/CollectionsSection';
import GenderSection from '../components/GenderSection';
import CelebritySection from '../components/CelebritySection';
import CraftsmanshipSection from '../components/CraftsmanshipSection';
import InstagramSection from '../components/InstagramSection';
import VisitNudge from '../components/VisitNudge';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />

      <div className="h-24 bg-gradient-to-b from-[#0A0A0A] to-[#F5F0EB] w-full" />
      <div className="hidden md:block">
        <CategoriesSection />
      </div>
      <div className="md:hidden">
        <StackedCategoriesSection />
      </div>

      <div className="h-24 bg-gradient-to-b from-[#F5F0EB] to-[#0A0A0A] w-full" />
      <CollectionsSection />

      <GenderSection />

      <div className="h-24 bg-gradient-to-b from-[#0A0A0A] to-[#F5F0EB] w-full" />
      <CelebritySection />

      <CraftsmanshipSection />

      <div className="h-24 bg-gradient-to-b from-[#F5F0EB] to-[#0A0A0A] w-full" />
      <InstagramSection />

      <VisitNudge
        title="Begin Your Journey"
        description="Let us craft something extraordinary — a piece as unique as the story you carry"
        primaryBtnText="Book a Private Consultation"
        primaryBtnLink="/book-appointment"
        secondaryBtnText="Explore the Atelier"
        secondaryBtnLink="/atelier"
      />
    </>
  );
}
