export function getLineItemPrice(product: Product, quantity: number): number {
  if (product.pricePerKg && product.minKg) {
    return product.pricePerKg * (product.minKg + quantity - 1);
  }
  return product.price * quantity;
}

export function getLineItemLabel(product: Product, quantity: number): string {
  if (product.pricePerKg && product.minKg) {
    return `${product.minKg + quantity - 1} kg`;
  }
  return `× ${quantity}`;
}

export type Category = 'beef' | 'chicken' | 'turkey' | 'lamb' | 'fish';

export type Product = {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  weight: string;
  price: number;
  image: string;
  category: Category;
  pricePerKg?: number;
  minKg?: number;
};

export const categories: Category[] = ['beef', 'chicken', 'turkey', 'lamb', 'fish'];

export const products: Product[] = [
  {
    id: 'brisket',
    name: 'Smoked Brisket',
    nameHe: 'בריסקט מעושן',
    description: 'Whole brisket smoked 12+ hours over oak until fall-apart tender with a deep bark.',
    descriptionHe: 'בריסקט שלם מעושן מעל 12 שעות על עץ אלון עד לרכות מושלמת עם קראסט עמוק.',
    weight: 'min. 2 kg',
    price: 600,
    pricePerKg: 300,
    minKg: 2,
    category: 'beef',
    image: '/images/Smoked-Brisket.webp',
  },
  {
    id: 'short-ribs',
    name: 'Smoked Short Ribs',
    nameHe: 'שורט ריבס מעושנות',
    description: 'Thick beef ribs smoked low and slow until the meat pulls clean from the bone.',
    descriptionHe: 'צלעות בקר עבות מעושנות לאט עד שהבשר נשלף נקי מהעצם.',
    weight: 'min. 2 kg',
    price: 600,
    pricePerKg: 300,
    minKg: 2,
    category: 'beef',
    image: '/images/short-ribs.jpg',
  },
  {
    id: 'chicken',
    name: 'Smoked Chicken',
    nameHe: 'עוף מעושן',
    description: 'Whole chicken marinated and smoked over fruit wood for a delicate, juicy finish.',
    descriptionHe: 'עוף שלם ממורינד ומעושן על עץ פרי לגמר עדין ועסיסי.',
    weight: '1–1.5 kg',
    price: 160,
    category: 'chicken',
    image: '/images/smoked-chicken.jpg',
  },
  {
    id: 'turkey',
    name: 'Smoked Turkey',
    nameHe: 'הודו מעושן',
    description: 'Whole turkey brined overnight and smoked slowly for exceptional moisture and flavour.',
    descriptionHe: 'הודו שלם בשרייה לילה ומעושן לאט לעסיסיות ועומק טעם יוצאי דופן.',
    weight: '2.5–3 kg',
    price: 190,
    category: 'turkey',
    image: '/images/turkey.jpg',
  },
];
