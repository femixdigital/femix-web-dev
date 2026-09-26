import React, { useState } from 'react';
import { Pricing } from '../components/Pricing';
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
    <div className="space-y-20 pb-16 pt-8 container mx-auto px-4">
      <Pricing onSelectPackage={handleSelectPackage} />
      <Testimonials />
      <FAQ />
      
      <section id="contact" className="pt-10">
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
