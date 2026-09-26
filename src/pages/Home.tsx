import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { Pricing } from '../components/Pricing';
import { CostCalculator } from '../components/CostCalculator';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { ContactForm } from '../components/ContactForm';
import { OrderModal } from '../components/OrderModal';

export const Home: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    amount: number;
  } | null>(null);

  const handleSelectPackage = (packageName: string, price: number) => {
    setSelectedPackage({ name: packageName, amount: price });
  };

  return (
    <div className="space-y-16 pb-16 pt-4 container mx-auto px-4">
      <Hero />
      
      <div id="pricing">
        <Pricing onSelectPackage={handleSelectPackage} />
      </div>

      <CostCalculator />

      <Testimonials />
      
      <FAQ />
      
      <section id="contact" className="pt-6">
        <ContactForm />
      </section>

      {selectedPackage && (
        <OrderModal
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          packageName={selectedPackage.name}
          amount={selectedPackage.amount}
        />
      )}
    </div>
  );
};
