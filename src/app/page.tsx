'use client';

import Image from "next/image";
import Link from "next/link";
import { Flame, Clock, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/lib/products";

const FEATURED_IDS = ['brisket', 'short-ribs', 'chicken', 'turkey'];

export default function Home() {
  const { t, lang } = useLanguage();
  const h = t.home;
  const featuredProducts = FEATURED_IDS.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;

  return (
    <>
      {/* Hero — no logo here, it lives in the sticky navbar */}
      <section className="relative h-[92vh] min-h-[560px] max-h-[860px] overflow-hidden bg-[#1C1C1C]">
        <Image src="/images/short-ribs.jpg" alt="Smoked short ribs" fill className="object-cover opacity-55" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5">{h.badge}</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-7 max-w-xl">
            {h.headline[0]}<br />{h.headline[1]}<br />{h.headline[2]}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md">{h.subtext}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-lg text-sm font-semibold transition-colors">
              {h.cta_order}
            </Link>
            <Link href="/products" className="inline-block border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors">
              {h.cta_menu}
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/10">
          {[
            { Icon: Flame, title: h.f1_title, desc: h.f1_desc },
            { Icon: Clock, title: h.f2_title, desc: h.f2_desc },
            { Icon: Truck, title: h.f3_title, desc: h.f3_desc },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} className={`flex items-start gap-4 ${i === 0 ? 'sm:pe-10' : i === 1 ? 'sm:px-10' : 'sm:ps-10'}`}>
              <Icon className="text-amber-400 flex-shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-semibold mb-1">{title}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cuts */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-2">{h.featured_badge}</p>
            <h2 className="text-3xl font-bold">{h.featured_title}</h2>
          </div>
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">{h.full_menu}</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <Link key={product.id} href={`/products#${product.category}`} className="group block">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-200 mb-3">
                <Image src={product.image} alt={lang === 'he' ? product.nameHe : product.name}
                  width={400} height={400} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-xs text-amber-600 font-medium mb-0.5">{t.categories[product.category]}</p>
              <p className="font-semibold text-sm">{lang === 'he' ? product.nameHe : product.name}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 sm:hidden text-center">
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-800">{h.full_menu}</Link>
        </div>
      </section>
    </>
  );
}
