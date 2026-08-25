import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyStatement } from './components/CompanyStatement';
import { TimelineSection } from './components/TimelineSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { VisualBreak } from './components/VisualBreak';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/ui/CustomCursor';
import { VisitingLinkPage } from './pages/VisitingLinkPage';
import { WebDevelopmentPage } from './pages/WebDevelopmentPage';
import { GraphicsPage } from './pages/GraphicsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WorkPage } from './pages/WorkPage';
import { ServiceItem } from './types';
import { ROUTES, getCurrentPage } from './routes';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function HomePage({
  onSelectService,
  onNavigateService,
  onNavigateContact,
  onExploreServices,
}: {
  onSelectService: (service: ServiceItem) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateContact: (serviceName?: string) => void;
  onExploreServices: () => void;
}) {
  return (
    <>
      <Hero
        onNavigateContact={() => onNavigateContact('General Project')}
        onExploreServices={onExploreServices}
      />
      <CompanyStatement />
      <TimelineSection />
      <ServicesSection
        onSelectService={onSelectService}
        onNavigateService={onNavigateService}
        onNavigateContact={onNavigateContact}
      />
      <VisualBreak />
      <TestimonialsSection />
      <CtaSection onNavigateContact={() => onNavigateContact('New Project Inquiry')} />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = getCurrentPage(location.pathname);

  const contactPreselect =
    (location.state as { service?: string } | null)?.service ?? 'VisitingLink';

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const navigateToHome = () => navigate(ROUTES.home);
  const navigateToPage = (page: string) => navigate(`/${page}`);
  const navigateToService = (serviceId: string) => navigate(ROUTES.service(serviceId));

  const navigateToContact = (serviceName?: string) => {
    navigate(ROUTES.contact, { state: serviceName ? { service: serviceName } : undefined });
  };

  const handleSelectServiceForDetail = (service: ServiceItem) => {
    setSelectedServiceDetail(service);
  };

  const handleInquireFromDetailModal = (serviceName: string) => {
    setSelectedServiceDetail(null);
    navigateToContact(serviceName);
  };

  const handleExploreServices = () => {
    const servicesEl = document.querySelector('#services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col selection:bg-black selection:text-white relative">
      <ScrollToTop />
      <CustomCursor />
      <ScrollProgress />

      <Navbar
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateService={navigateToService}
        onNavigatePage={navigateToPage}
        onNavigateContact={navigateToContact}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route
              path={ROUTES.home}
              element={
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <HomePage
                    onSelectService={handleSelectServiceForDetail}
                    onNavigateService={navigateToService}
                    onNavigateContact={navigateToContact}
                    onExploreServices={handleExploreServices}
                  />
                </motion.div>
              }
            />
            <Route
              path={ROUTES.about}
              element={
                <motion.div key="about" {...pageTransition}>
                  <AboutPage
                    onNavigateHome={navigateToHome}
                    onNavigateContact={() => navigateToContact()}
                  />
                </motion.div>
              }
            />
            <Route
              path={ROUTES.work}
              element={
                <motion.div key="work" {...pageTransition}>
                  <WorkPage
                    onNavigateHome={navigateToHome}
                    onNavigateContact={navigateToContact}
                  />
                </motion.div>
              }
            />
            <Route
              path={ROUTES.contact}
              element={
                <motion.div key="contact" {...pageTransition}>
                  <ContactPage
                    onNavigateHome={navigateToHome}
                    initialService={contactPreselect}
                  />
                </motion.div>
              }
            />
            <Route
              path="/service/visitinglink"
              element={
                <motion.div key="visitinglink" {...pageTransition}>
                  <VisitingLinkPage
                    onNavigateHome={navigateToHome}
                    onNavigateService={navigateToService}
                    onNavigateContact={navigateToContact}
                  />
                </motion.div>
              }
            />
            <Route
              path="/service/web-development"
              element={
                <motion.div key="web-development" {...pageTransition}>
                  <WebDevelopmentPage
                    onNavigateHome={navigateToHome}
                    onNavigateService={navigateToService}
                    onNavigateContact={navigateToContact}
                  />
                </motion.div>
              }
            />
            <Route
              path="/service/graphics"
              element={
                <motion.div key="graphics" {...pageTransition}>
                  <GraphicsPage
                    onNavigateHome={navigateToHome}
                    onNavigateService={navigateToService}
                    onNavigateContact={navigateToContact}
                  />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer
        onNavigateContact={navigateToContact}
        onNavigateService={navigateToService}
        onNavigatePage={navigateToPage}
      />

      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onInquireService={handleInquireFromDetailModal}
      />
    </div>
  );
}
