'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLineItemPrice, getLineItemLabel } from '@/lib/products';

function isDateDisabled(date: Date, cartTotal: number): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return true;
  const day = date.getDay();
  if (cartTotal > 1000) return day === 6;
  return day !== 4 && day !== 5;
}

export default function OrderPage() {
  const { items, total, clearCart } = useCart();
  const { t, lang, isRTL } = useLanguage();
  const o = t.order;
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmedDate, setConfirmedDate] = useState<Date | undefined>();

  useEffect(() => {
    if (items.length === 0 && !submitted) router.push('/products');
  }, [items.length, submitted, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !name.trim() || !phone.trim()) return;
    setConfirmedDate(selectedDate);
    setSubmitted(true);
    clearCart();
  };

  const canSubmit = !!selectedDate && name.trim().length > 0 && phone.trim().length > 0;
  const formatMsg = (tpl: string) => tpl.replace('{name}', name).replace('{phone}', phone);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <Image src="/images/logo.png" alt="Yael's BBQ" width={96} height={96} className="rounded-full mx-auto mb-6 shadow-lg" />
        <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
        <h1 className="text-3xl font-bold mb-3">{o.success_title}</h1>
        <p className="text-gray-600 mb-2">{formatMsg(o.success_msg)}</p>
        <p className="text-gray-600 mb-10">
          {o.success_date} <strong>{confirmedDate?.toLocaleDateString(o.date_locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
        </p>
        <Link href="/" className="inline-block bg-[#1C1C1C] text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium">
          {o.success_back}
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors">
        <BackArrow size={16} />{o.back}
      </Link>
      <h1 className="text-3xl font-bold mb-10">{o.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-xl font-semibold mb-6">{o.summary}</h2>
          <ul className="space-y-4 mb-6">
            {items.map(({ product, quantity }) => {
              const name = lang === 'he' ? product.nameHe : product.name;
              return (
                <li key={product.id} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={product.image} alt={name} width={56} height={56} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{getLineItemLabel(product, quantity)}</p>
                  </div>
                  <p className="font-semibold text-sm">₪{getLineItemPrice(product, quantity)}</p>
                </li>
              );
            })}
          </ul>
          <div className="border-t pt-4 flex justify-between items-center font-bold text-lg mb-5">
            <span>{o.total}</span><span>₪{total}</span>
          </div>
          {total > 1000 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">{o.flex_title}</p><p>{o.flex_desc}</p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-1">{o.std_title}</p>
              <p>{o.std_desc}</p>
              <p className="mt-1.5 text-xs text-gray-400">{o.std_note}</p>
            </div>
          )}
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">{o.date_title}</h2>
              <div className="border border-gray-200 rounded-xl p-2 inline-block bg-white shadow-sm">
                <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate}
                  disabled={date => isDateDisabled(date, total)} startMonth={new Date()} dir={isRTL ? 'rtl' : 'ltr'} />
              </div>
              {!selectedDate && <p className="text-sm text-gray-400 mt-2">{o.date_hint}</p>}
              {selectedDate && (
                <p className="text-sm text-amber-700 font-medium mt-2">
                  {o.date_selected} {selectedDate.toLocaleDateString(o.date_locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{o.contact_title}</h2>
              {[
                { label: o.name_label, value: name, setter: setName, type: 'text', placeholder: o.name_placeholder },
                { label: o.phone_label, value: phone, setter: setPhone, type: 'tel', placeholder: o.phone_placeholder },
              ].map(({ label, value, setter, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {o.notes_label} <span className="text-gray-400 font-normal">({o.notes_optional})</span>
                </label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={o.notes_placeholder} rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none bg-white" />
              </div>
            </div>
            <button type="submit" disabled={!canSubmit}
              className="w-full bg-[#1C1C1C] text-white py-3.5 rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1C1C1C]">
              {o.confirm_btn} — ₪{total}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
