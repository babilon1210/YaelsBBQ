'use client';

import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { t } = useLanguage();
  const filledCategories = categories.filter(id => products.some(p => p.category === id));

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      <div className="mb-14">
        <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-2">{t.products.badge}</p>
        <h1 className="text-4xl font-bold text-[#1C1C1C]">{t.products.title}</h1>
      </div>
      <div className="space-y-20">
        {filledCategories.map(id => (
          <section key={id} id={id} className="scroll-mt-28">
            <div className="flex items-center gap-5 mb-8">
              <h2 className="text-lg font-semibold tracking-wide uppercase text-gray-400">
                {t.categories[id]}
              </h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter(p => p.category === id).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
