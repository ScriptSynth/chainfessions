'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-black flex flex-col font-sans">

      {/* Load Spline Viewer Script */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.29/build/spline-viewer.js"
        strategy="lazyOnload"
      />

      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* @ts-ignore */}
        <spline-viewer
          url="https://prod.spline.design/qOrbveZm1jZA2Pq5/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Navbar Overlay */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-3">
          <div className="text-2xl font-bold text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            Chainfessions
          </div>
          <a href="https://www.producthunt.com/products/chainfessions-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-chainfessions-3" target="_blank" rel="noopener noreferrer">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1057976&theme=dark&t=1767502570499"
              alt="Chainfessions - Fully managed SEO that actually scales your traffic. | Product Hunt"
              width="250"
              height="54"
              style={{ width: '250px', height: '54px' }}
            />
          </a>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-red-500 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-red-500 transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-red-500 transition-colors">Login</Link>
        </div>
        <Link href="/register" className="px-5 py-2.5 bg-red-600/10 border border-red-600/50 hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]">
          Get Access
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 pointer-events-none">

        <div className="text-center max-w-5xl mt-auto mb-20 md:mb-32 pointer-events-auto">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl animate-fade-in-up">
            DOMINATE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 animate-pulse">ALGORITHM</span>
          </h1>

          {/* Spacer as requested (h-38 approx 9.5rem) */}
          <div className="h-32 md:h-40"></div>

          <p className="text-lg md:text-2xl text-gray-300 mb-10 font-medium max-w-3xl mx-auto drop-shadow-lg animate-fade-in-up delay-100">
            93% of online experiences begin with a search engine. <span className="text-white font-bold">Stop being invisible.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Link href="/register" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
              Start Dominating
            </Link>
            <Link href="#pricing" className="px-8 py-4 bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 text-white font-medium text-lg rounded-xl transition-all">
              View Pricing
            </Link>
          </div>

          <div className="mt-12 animate-fade-in-up delay-300">
            <a href="https://www.producthunt.com/products/chainfessions-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-chainfessions-3" target="_blank" rel="noopener noreferrer">
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1057976&theme=dark&t=1767502570499"
                alt="Chainfessions - Fully managed SEO that actually scales your traffic. | Product Hunt"
                width="250"
                height="54"
                style={{ width: '250px', height: '54px' }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] bg-radial-gradient from-transparent via-black/20 to-black pointer-events-none" />
    </div>
  );
}
