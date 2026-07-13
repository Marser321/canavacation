import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSelector } from './components/ExperienceSelector';
import { TrustBar } from './components/TrustBar';
import { VideoTestimonials } from './components/VideoTestimonials';
import { ProductSection } from './components/ProductSection';
import { InteractiveQuoter } from './components/InteractiveQuoter';
import { OtherServices } from './components/OtherServices';
import { Logistics } from './components/Logistics';
import { LeadMagnet } from './components/LeadMagnet';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { StickyCTA } from './components/StickyCTA';
import { BookingModal } from './components/BookingModal';
import { products } from './data/products';

export const App: React.FC = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTourId, setModalTourId] = useState('');
  const [modalPlan, setModalPlan] = useState<'classic' | 'vip'>('classic');
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  // Calculator selector states
  const [quoterProductId, setQuoterProductId] = useState(products[0].id);
  const [quoterPlan, setQuoterPlan] = useState<'classic' | 'vip'>('classic');

  // Trigger modal for a direct package booking (from Navbar or plan cards)
  const handleOpenBooking = (productId?: string, plan?: 'classic' | 'vip') => {
    setModalTourId(productId || products[0].id);
    setModalPlan(plan || 'classic');
    setSelectedQuote(null); // Clear quote context since it's a direct card click
    setIsModalOpen(true);
  };

  // Triggered when clicking "Calcular cotización" on a product card:
  // Smooth scrolls to quoter and sets the selected tour/plan values.
  const handleSelectForQuoter = (productId: string, plan: 'classic' | 'vip') => {
    setQuoterProductId(productId);
    setQuoterPlan(plan);
    const quoterElement = document.querySelector('#cotizador');
    if (quoterElement) {
      quoterElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Triggered from inside the quoter component to proceed to book that specific quote
  const handleBookQuote = (quoteData: any) => {
    setModalTourId(quoteData.productId);
    setModalPlan(quoteData.plan);
    setSelectedQuote(quoteData); // Provide quote parameters
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-navy-deep text-white/95 overflow-x-hidden selection:bg-coral selection:text-navy-deep">
      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Header */}
      <Hero />

      {/* Bento selector */}
      <ExperienceSelector />

      {/* Authority reviews */}
      <TrustBar />

      {/* Video testimonials */}
      <VideoTestimonials />

      {/* 4 Detail Product Sections */}
      <div className="space-y-0">
        {products.map((prod) => (
          <ProductSection 
            key={prod.id} 
            product={prod} 
            onOpenBooking={handleOpenBooking}
            onSelectForQuoter={handleSelectForQuoter}
          />
        ))}
      </div>

      {/* Interactive Family Pricing Calculator */}
      <InteractiveQuoter 
        initialProductId={quoterProductId}
        initialPlan={quoterPlan}
        onBookQuote={handleBookQuote}
      />

      {/* Outbound travel services */}
      <OtherServices />

      {/* Logistics & Policies */}
      <Logistics />

      {/* Free travel guide email signup */}
      <LeadMagnet />

      {/* Accordion FAQs */}
      <FAQ />

      {/* Bottom Footer info */}
      <Footer />

      {/* Support floating chat */}
      <WhatsAppFloat />

      {/* Mobile Sticky Action Bar */}
      <StickyCTA />

      {/* Slide-over checkout modal */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={modalTourId}
        plan={modalPlan}
        quoteData={selectedQuote}
      />
    </div>
  );
};
