export type Language = 'en' | 'he';

export type Translations = {
  nav: { shop: string; about: string };
  about: { title: string; body: string[] };
  home: {
    badge: string;
    headline: [string, string, string];
    subtext: string;
    cta_order: string;
    cta_menu: string;
    f1_title: string; f1_desc: string;
    f2_title: string; f2_desc: string;
    f3_title: string; f3_desc: string;
    featured_badge: string;
    featured_title: string;
    full_menu: string;
  };
  products: { badge: string; title: string };
  categories: Record<'beef' | 'chicken' | 'turkey' | 'lamb' | 'fish', string>;
  cart: {
    title: string; empty: string; browse: string;
    total: string; place_order: string; flexible: string;
  };
  order: {
    back: string; title: string; summary: string; total: string;
    flex_title: string; flex_desc: string;
    std_title: string; std_desc: string; std_note: string;
    date_title: string; date_hint: string; date_selected: string;
    contact_title: string;
    name_label: string; name_placeholder: string;
    phone_label: string; phone_placeholder: string;
    notes_label: string; notes_optional: string; notes_placeholder: string;
    confirm_btn: string;
    success_title: string; success_msg: string;
    success_date: string; success_back: string;
    date_locale: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    nav: { shop: 'Shop', about: 'About' },
    about: {
      title: 'Our Story',
      body: [
        "Yael's father grew up with BBQ in his blood - a proud American patriot who carried the tradition of slow-smoking whole cuts wherever he went.",
        "In his twenties, he fell in love with Israel and made the move, bringing with him not just his heart but his hard-earned knowledge of the pit: the patient art of oak and fruit wood, the secrets of the bark and the brine, and the belief that good meat can't be rushed.",
        "Those long evenings tending the smoker, those lessons passed down at the fire - they found their way into his daughter Yael's hands. Today she carries that tradition forward in her own kitchen, honoring both the American craft and the Israeli home it found its way into.",
        "Every cut is a piece of that story.",
      ],
    },
    home: {
      badge: 'Handcrafted · High quality',
      headline: ['Whole cuts.', 'Slow smoked.', 'Delivered fresh.'],
      subtext: 'Brisket, short ribs, turkey and chicken — made at home in small batches and available every week.',
      cta_order: 'Order Now', cta_menu: 'Browse the Menu',
      f1_title: 'Real hardwood smoke',
      f1_desc: 'Every cut is smoked low and slow over oak and fruit wood — no shortcuts.',
      f2_title: '10 – 14 hours in the smoker',
      f2_desc: "Good BBQ can't be rushed. Each batch is tended from start to finish.",
      f3_title: 'Weekly delivery',
      f3_desc: 'Available Thursday & Friday. Orders over ₪900 unlock any-day delivery.',
      featured_badge: 'This week', featured_title: 'Featured cuts', full_menu: 'Full menu →',
    },
    products: { badge: 'Weekly menu', title: 'Smoked Meats' },
    categories: { beef: 'Beef', chicken: 'Chicken', turkey: 'Turkey', lamb: 'Lamb', fish: 'Fish' },
    cart: {
      title: 'Your Order', empty: 'Your cart is empty.', browse: 'Browse smoked meats →',
      total: 'Total', place_order: 'Place Order',
      flexible: '🎉 Your order qualifies for flexible delivery — pick any day except Saturday!',
    },
    order: {
      back: 'Back to products', title: 'Place Your Order', summary: 'Order Summary', total: 'Total',
      flex_title: '🎉 Flexible delivery unlocked',
      flex_desc: 'Your order qualifies for delivery on any day of the week, except Saturday.',
      std_title: 'Delivery days',
      std_desc: 'Standard orders are delivered on Thursdays and Fridays only.',
      std_note: 'Order over ₪900 to unlock any-day delivery (except Saturday).',
      date_title: 'Choose Delivery Date', date_hint: 'Please select a delivery date from the calendar.', date_selected: 'Selected:',
      contact_title: 'Contact Details',
      name_label: 'Full Name', name_placeholder: 'Your name',
      phone_label: 'Phone Number', phone_placeholder: '050-000-0000',
      notes_label: 'Notes', notes_optional: 'optional', notes_placeholder: 'Any special requests or delivery instructions',
      confirm_btn: 'Confirm Order',
      success_title: 'Order Received!',
      success_msg: "Thank you, {name}. We'll be in touch at {phone} to confirm your order.",
      success_date: 'Delivery date:', success_back: 'Back to Home', date_locale: 'en-GB',
    },
  },
  he: {
    nav: { shop: 'תפריט', about: 'אודות' },
    about: {
      title: 'הסיפור שלנו',
      body: [
        'אביה של יעל גדל עם BBQ בדם - פטריוט אמריקאי גאה שנשא את מסורת העישון האיטי של נתחים שלמים לכל מקום שהלך.',
        'בשנות העשרים לחייו, הוא התאהב בישראל ועבר לגור בה, ולקח איתו לא רק את ליבו אלא גם את הידע שצבר ליד המעשנה: אומנות הסבלנות של עץ אלון ופרי, סודות הקראסט והמשרה, והאמונה שבשר טוב לא ניתן למהר.',
        'הערבים הארוכים האלה ליד האש, השיעורים שעברו לידיים ליד הגחלים - מצאו את דרכם לידיה של בתו יעל. היום היא ממשיכת המסורת הזו במטבח שלה, מכבדת הן את המלאכה האמריקאית והן את הבית הישראלי שמצאה בו את דרכה.',
        'כל נתח הוא חלק מהסיפור הזה.',
      ],
    },
    home: {
      badge: 'עבודת יד ·  איכות גבוהה',
      headline: ['נתחים שלמים.', 'מעושנים לאט.', 'מגיעים טריים.'],
      subtext: 'בריסקט, שורט ריבס, הודו ועוף - עבודת יד ומוכן כל שבוע.',
      cta_order: 'להזמין עכשיו', cta_menu: 'לתפריט המלא',
      f1_title: 'עשן עץ אמיתי',
      f1_desc: 'כל נתח מעושן לאט על עץ אלון ועצי פרי — בלי קיצורי דרך.',
      f2_title: '10 – 14 שעות בעשן',
      f2_desc: 'בשר מעושן טוב לא ניתן למהר. כל אצווה מלווה מתחילה ועד סוף.',
      f3_title: 'משלוח שבועי',
      f3_desc: 'זמין בחמישי ושישי. הזמנות מעל ₪900 פותחות משלוח בכל יום.',
      featured_badge: 'השבוע', featured_title: 'נתחים נבחרים', full_menu: '← לתפריט המלא',
    },
    products: { badge: 'תפריט שבועי', title: 'בשר מעושן' },
    categories: { beef: 'בקר', chicken: 'עוף', turkey: 'הודו', lamb: 'כבש', fish: 'דג' },
    cart: {
      title: 'ההזמנה שלך', empty: 'העגלה שלך ריקה.', browse: '← לתפריט',
      total: 'סה״כ', place_order: 'להמשיך להזמנה',
      flexible: '🎉 ההזמנה שלך זכאית למשלוח גמיש — בחר כל יום חוץ משבת!',
    },
    order: {
      back: 'חזרה לתפריט', title: 'פרטי ההזמנה', summary: 'סיכום הזמנה', total: 'סה״כ',
      flex_title: '🎉 משלוח גמיש נפתח',
      flex_desc: 'ההזמנה שלך זכאית למשלוח בכל יום בשבוע, חוץ משבת.',
      std_title: 'ימי משלוח',
      std_desc: 'הזמנות רגילות מגיעות רק בימי חמישי ושישי.',
      std_note: 'הזמן מעל ₪900 לפתוח משלוח בכל יום (חוץ משבת).',
      date_title: 'בחר תאריך משלוח', date_hint: 'אנא בחר תאריך מהלוח.', date_selected: 'נבחר:',
      contact_title: 'פרטי יצירת קשר',
      name_label: 'שם מלא', name_placeholder: 'השם שלך',
      phone_label: 'מספר טלפון', phone_placeholder: '050-000-0000',
      notes_label: 'הערות', notes_optional: 'אופציונלי', notes_placeholder: 'בקשות מיוחדות או הוראות משלוח',
      confirm_btn: 'אישור הזמנה',
      success_title: 'ההזמנה התקבלה!',
      success_msg: 'תודה, {name}. ניצור איתך קשר במספר {phone} לאישור ההזמנה.',
      success_date: 'תאריך משלוח:', success_back: 'חזרה לדף הבית', date_locale: 'he-IL',
    },
  },
};

export default translations;
