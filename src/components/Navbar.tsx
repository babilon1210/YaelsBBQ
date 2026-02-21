'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, X } from 'lucide-react';

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const { lang, setLang, t, isRTL } = useLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#1C1C1C] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

          <Link href="/" aria-label="Yael's BBQ — Home" onClick={() => setAboutOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Yael's BBQ logo"
              width={72}
              height={72}
              className="rounded-full hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/products" className="text-sm text-gray-300 hover:text-white transition-colors">
              {t.nav.shop}
            </Link>

            <button
              onClick={() => setAboutOpen(o => !o)}
              className={`text-sm transition-colors ${aboutOpen ? 'text-amber-400' : 'text-gray-300 hover:text-white'}`}
            >
              {t.nav.about}
            </button>

            {/* Language toggle */}
            <div className="flex items-center gap-1 text-xs font-medium border border-white/20 rounded-full px-2.5 py-1">
              <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                EN
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => setLang('he')}
                className={`transition-colors ${lang === 'he' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                עב
              </button>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* About panel — slides down from top, sits on the end side of the page */}
      <div
        className={`fixed top-20 ${isRTL ? 'left-0' : 'right-0'} w-full sm:w-[460px] z-30
          transform transition-transform duration-500 ease-in-out
          ${aboutOpen ? 'translate-y-0' : '-translate-y-[110%]'}
          overflow-hidden shadow-2xl`}
      >
        {/* Logo as full background */}
        <div className="relative bg-[#1C1C1C] min-h-[420px] flex flex-col justify-center overflow-hidden">

          {/* Logo fills the panel */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
            <Image
              src="/images/logo.png"
              alt=""
              width={520}
              height={520}
              className="rounded-full opacity-60"
            />
          </div>

          {/* Dark gradient so text stays readable over the logo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 px-8 py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{t.about.title}</h2>
              <button
                onClick={() => setAboutOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close about panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {t.about.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${i === t.about.body.length - 1 ? 'text-amber-400 font-medium italic' : 'text-gray-300 text-sm'}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop — closes the panel when clicking outside */}
      {aboutOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setAboutOpen(false)}
        />
      )}
    </>
  );
}
