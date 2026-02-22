'use client';

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Product, getLineItemLabel } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const { lang } = useLanguage();
  const cartItem = items.find(i => i.product.id === product.id);
  const name = lang === 'he' ? product.nameHe : product.name;
  const description = lang === 'he' ? product.descriptionHe : product.description;

  return (
    <div className="group flex flex-col">
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl mb-4">
        <Image src={product.image} alt={name} width={600} height={450}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-[#1C1C1C] leading-snug">{name}</h3>
        <p className="text-xs text-gray-400 mt-0.5 mb-2">{product.weight}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex items-end justify-between mt-auto">
          <div>
            {product.pricePerKg ? (
              <>
                <p className="font-bold text-[#1C1C1C]">₪{product.pricePerKg}<span className="text-xs font-normal text-gray-400">/kg</span></p>
                <p className="text-xs text-gray-400">min. {product.minKg} kg</p>
              </>
            ) : (
              <p className="font-bold text-[#1C1C1C]">₪{product.price}</p>
            )}
          </div>
          <button onClick={() => addItem(product)}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full font-medium transition-colors ${cartItem ? 'bg-amber-500 text-white hover:bg-amber-400' : 'bg-[#1C1C1C] text-white hover:bg-amber-600'}`}>
            {cartItem ? <Check size={13} /> : <Plus size={13} />}
            {cartItem ? `${getLineItemLabel(product, cartItem.quantity)} in cart` : lang === 'he' ? 'הוסף' : 'Add to order'}
          </button>
        </div>
      </div>
    </div>
  );
}
