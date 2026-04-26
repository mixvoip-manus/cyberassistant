import Header from '@/components/Header';
import { useHashScroll } from '@/hooks/useHashScroll';
import CyberSuite from '@/components/CyberSuite';
import SocPricing from '@/components/SocPricing';
import CrossNavigation from '@/components/CrossNavigation';
import Footer from '@/components/Footer';

export default function SocaasPage() {
  useHashScroll();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CyberSuite highlightPartner="socaas" />
        <SocPricing />
        <CrossNavigation currentPage="socaas" />
      </main>
      <Footer />
    </div>
  );
}
