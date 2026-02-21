'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLineItemPrice, getLineItemLabel } from '@/lib/products';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, total } = useCart();
  const { t, lang, isRTL } = useLanguage();
  const router = useRouter();

  const handleOrder = () => { setIsOpen(false); router.push('/order'); };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}
      <div className={`fixed top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
        ${isRTL ? 'left-0' : 'right-0'}
        ${isOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{t.cart.title}</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={40} className="text-gray-300" />
              <p className="text-gray-500">{t.cart.empty}</p>
              <button onClick={() => setIsOpen(false)} className="text-sm text-amber-600 hover:underline">{t.cart.browse}</button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map(({ product, quantity }) => {
                const name = lang === 'he' ? product.nameHe : product.name;
                return (
                  <li key={product.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.image} alt={name} width={64} height={64} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{name}</p>
                      <p className="text-xs text-gray-500">{getLineItemLabel(product, quantity)}</p>
                      <p className="text-sm font-semibold mt-1">₪{getLineItemPrice(product, quantity)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                      </button>
                      <span className="w-4 text-center text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-4">
            {total > 900 && (
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">{t.cart.flexible}</p>
            )}
            <div className="flex items-center justify-between font-semibold text-base">
              <span>{t.cart.total}</span><span>₪{total}</span>
            </div>
            <button onClick={handleOrder} className="w-full bg-[#1C1C1C] text-white py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm">
              {t.cart.place_order}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
