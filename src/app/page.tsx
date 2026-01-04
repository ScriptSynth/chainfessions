
import React from 'react';
import { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import ValueProps from '@/components/landing/ValueProps';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';

export const metadata: Metadata = {
  title: 'Chainfessions | Automated Link Exchange & AI SEO',
  description: 'Scale your Domain Authority with Chainfessions. The first zero-outreach, peer-to-peer backlink exchange network powered by AI.',
  applicationName: 'Chainfessions',
  keywords: ['Automated Link Exchange', 'AI SEO Content Automation', 'PBN Alternatives', 'Backlink Building Software'],
  authors: [{ name: 'Chainfessions Team' }],
  openGraph: {
    title: 'Chainfessions - Zero Outreach SEO Growth',
    description: 'Automate your backlink strategy with our AI-driven exchange engine.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Hero />
      <ValueProps />
      <Pricing />
      <FAQ />

      {/* Simple Footer */}
      <footer className="py-12 border-t border-gray-900 text-center text-gray-500 text-sm bg-black relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© {new Date().getFullYear()} Chainfessions SEO. All rights reserved.</p>
            <p className="text-gray-600">Contact: <a href="mailto:hackswap@outlook.com" className="hover:text-red-500 transition-colors">hackswap@outlook.com</a></p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
