'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  isSwitchingLanguage: boolean;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.studio': 'Studio',
    'nav.collections': 'Collections',
    'nav.gallery': 'Gallery',
    'nav.encyclopedia': 'Encyclopedia',
    'nav.salon': 'Flagship Salon',
    'nav.faq': 'FAQ',
    'nav.contact': 'Concierge',
    'nav.startDesigning': 'Start Designing',
    'nav.cart': 'Cart',
    'nav.signIn': 'Sign In',
    'nav.shippingBanner': 'Free Tracked Shipping on Every Order &bull; Handcrafted in 48h',

    // Hero Section
    'hero.badge': 'Artixain Atelier • 100% Certified Natural Minerals',
    'hero.titleLine1': 'Designed by You',
    'hero.titleLine2': 'Crafted by Artixain',
    'hero.subtitle': 'Craft your bespoke gemstone bracelet. Interactive 120 FPS strand designer with millimeter wrist calibration and master bench fulfillment.',
    'hero.ctaPrimary': 'Start Designing',
    'hero.ctaSecondary': 'View Gallery',
    'hero.pill1': 'Grade-A Natural Minerals',
    'hero.pill2': 'Millimeter Wrist Fit',
    'hero.pill3': 'Lifetime Cord Warranty',
    'hero.slide1Tag': 'Master Atelier Craft',
    'hero.slide1Spec': 'Natural Luster Pearls &bull; Silk Thread',
    'hero.slide1Title': 'Triple-Strand Luminous Pearls',
    'hero.slide1Subtitle': 'Hand-threaded on fine silk cord with celestial luster and ergonomic wrist contour',
    'hero.slide2Tag': 'Natural Earth Minerals',
    'hero.slide2Spec': 'Raw Mineral Specimen &bull; Grade-A',
    'hero.slide2Title': 'Himalayan Salt Crystal Minerals',
    'hero.slide2Subtitle': 'Raw crystalline geological formation with natural saturation and geometric facets',
    'hero.slide3Tag': 'Signature Formulations',
    'hero.slide3Spec': 'Multi-Mineral Harmony &bull; Silk Cord',
    'hero.slide3Title': 'Handcrafted Mineral Strands',
    'hero.slide3Subtitle': 'Curated natural gemstones tuned to precision wrist circumference and ergonomic balance',

    // Walkthrough & Trust
    'trust.badge': 'Trusted by Artixain Patrons',
    'trust.heading': 'Helped patrons complete 60,000+ custom designs',
    'trust.subheading': 'Over 10,000 patrons have received bespoke handcrafted atelier bracelets.',
    'trust.designsStat': '60,000+ Designs',
    'trust.purchasesStat': '10,000+ Purchases',
    'walkthrough.badge': 'Master Bench Guide',
    'walkthrough.title': 'Step-by-Step Strand Creation',
    'walkthrough.desc': 'Explore how each Artixain bracelet is designed and assembled. Learn wrist caliper measurement, chakra gemstone balance, and our double surgeon knot silk-cord finishing.',
    'walkthrough.cta': 'Read Complete Design Guide',

    // Atelier Principles
    'principles.badge': 'Atelier Principles',
    'principles.titleLine1': 'Crafted by You',
    'principles.titleLine2': 'Refined by Artixain',
    'principles.card1Category': 'Geological Archives',
    'principles.card1Title': 'Crystal Encyclopedia',
    'principles.card1Desc': 'Explore natural gemstones, their unique properties, chakra connections, zodiac influences, and care rituals for all 32 varieties.',
    'principles.card2Category': 'Grade-A Certified',
    'principles.card2Title': "Nature's Finest",
    'principles.card2Desc': 'Ethically sourced gemstones, hand-picked to showcase their inherent natural beauty, crystal geometry, and positive vibration.',
    'principles.card3Category': 'Artisan Craftsmanship',
    'principles.card3Title': 'Master Bench Assembly',
    'principles.card3Desc': 'Meticulously handcrafted with passion on reinforced elastic, creating timeless pieces that mass production cannot replicate.',

    // Design Inspiration
    'gallery.badge': 'Design Inspiration',
    'gallery.titleLine1': 'Spark Your',
    'gallery.titleLine2': 'Imagination',
    'gallery.desc': 'Curated formulations to inspire your bespoke creation. Tap any piece to remix in the 120 FPS studio.',
    'gallery.filterAll': 'All',
    'gallery.filterProtection': 'Protection',
    'gallery.filterLove': 'Love',
    'gallery.filterAbundance': 'Abundance',
    'gallery.filterIntuition': 'Intuition',
    'gallery.remix': 'Remix in Studio',
    'gallery.viewAll': 'Explore All Curated Formulations',

    // Lookbook
    'lookbook.badge': 'Natural Mineral Calibration',
    'lookbook.title': 'The Artixain Atelier Gallery',
    'lookbook.desc': 'Every millimeter is calibrated. Every gemstone is authentic. Handcrafted with genuine crystalline minerals and multi-strand elasticity.',
    'lookbook.card1Title': 'Imperial Amethyst Geode',
    'lookbook.card1Desc': 'Deep violet crystal clusters with natural optical clarity and high mineral vibration.',
    'lookbook.card2Title': 'Deep Lapis Azure',
    'lookbook.card2Desc': 'Royal ultramarine mineral with golden pyrite flecks and throat chakra resonance.',
    'lookbook.card3Title': 'Tumbled Rose Quartz',
    'lookbook.card3Desc': 'Translucent pink crystalline softness representing unconditional compassion.',
    'lookbook.card4Title': 'Multi-Mineral Harmony',
    'lookbook.card4Desc': 'Harmoniously balanced bead sequencing creating serene tactile presence on wrist.',
    'lookbook.card5Title': 'Anthropometric Fit',
    'lookbook.card5Desc': 'Balanced circumference with zero pinch, comfortable all-day weight, and seamless fit.',
    'lookbook.card6Title': 'Gold Accent Strand',
    'lookbook.card6Desc': 'Faceted crystal beads accented with hand-knotted gold silk cord and tassel detailing.',
    'lookbook.card7Title': 'Black Obsidian Shield',
    'lookbook.card7Desc': 'Volcanic glassy obsidian paired with tiger eye for resolute energetic grounding.',
    'lookbook.card8Title': 'Gemologist Inspection',
    'lookbook.card8Desc': 'Rigorous optical loupe verification assessing internal inclusions and polish quality.',

    // Location
    'location.badge': 'Flagship Atelier',
    'location.title': 'Visit Our Paris Atelier',
    'location.desc': 'Experience our mineral archives in person. Book a private appointment with our master gemologists for personalized wrist fitting and bespoke gemstone curation.',
    'location.addressLabel': 'Address',
    'location.addressVal': '24 Place Vendôme, 75001 Paris, France',
    'location.hoursLabel': 'Salon Hours',
    'location.hoursVal': 'Monday - Saturday: 10:00 - 19:30 • Private Consultations by Appointment',
    'location.phoneLabel': 'Concierge Telephone',
    'location.phoneVal': '+33 1 42 68 00 00 • concierge@artixain.com',
    'location.bookBtn': 'Book Private Fitting',
    'location.guideBtn': 'Explore Salon Guide',

    // Contact
    'contact.badge': 'Concierge Inquiries',
    'contact.title': 'Connect with our Gemologist Team',
    'contact.desc': 'Have a bespoke mineral request, corporate gifting inquiry, or wrist calibration question? Our concierge desk replies within 1 business day.',
    'contact.nameLabel': 'Full Name',
    'contact.emailLabel': 'Email Address',
    'contact.messageLabel': 'Inquiry Message',
    'contact.submitBtn': 'Send Concierge Inquiry',
    'contact.successTitle': 'Inquiry Received',
    'contact.successDesc': 'Thank you for contacting Artixain Atelier. A master gemologist concierge will review your message shortly.',

    // FAQ
    'faq.badge': 'Patron Questions',
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'Clear answers regarding our geological mineral standards, wrist sizing calibration, and atelier craftsmanship.',
    'faq.viewAll': 'View All FAQ Archives',

    // Reviews
    'reviews.badge': 'Patron Experiences',
    'reviews.title': 'Loved by Crystal Enthusiasts Worldwide',
    'reviews.viewAll': 'View All 1,420+ Verified Patron Reviews'
  },
  ur: {
    // Navigation
    'nav.studio': 'اسٹوڈیو',
    'nav.collections': 'مجموعے',
    'nav.gallery': 'گیلری',
    'nav.encyclopedia': 'انسائیکلوپیڈیا',
    'nav.salon': 'مرکزی سیلون',
    'nav.faq': 'عام سوالات',
    'nav.contact': 'رابطہ',
    'nav.startDesigning': 'ڈیزائن شروع کریں',
    'nav.cart': 'ٹوکری',
    'nav.signIn': 'لاگ ان',
    'nav.shippingBanner': 'ہر آرڈر پر مفت ٹریک شدہ شپنگ &bull; ۴۸ گھنٹوں میں دستکاری سے تیار',

    // Hero Section
    'hero.badge': 'آرٹیکزین ایٹیلیئر • ۱۰۰٪ مصدقہ قدرتی معدنیات',
    'hero.titleLine1': 'آپ کا تخلیق کردہ',
    'hero.titleLine2': 'آرٹیکزین کا دستکاری شاہکار',
    'hero.subtitle': 'اپنا مخصوص قدرتی قیمتی پتھروں کا بریسلیٹ خود ڈیزائن کریں۔ ملی میٹر کلائی پیمائش اور ماسٹر بینچ کاریگری۔',
    'hero.ctaPrimary': 'ڈیزائن شروع کریں',
    'hero.ctaSecondary': 'گیلری دیکھیں',
    'hero.pill1': 'گریڈ اے قدرتی معدنیات',
    'hero.pill2': 'ملی میٹر پرفیکٹ فٹ',
    'hero.pill3': 'تار کی تاحیات وارنٹی',
    'hero.slide1Tag': 'ماسٹر ایٹیلیئر کاریگری',
    'hero.slide1Spec': 'قدرتی چمکدار موتی &bull; ریشمی دھاگہ',
    'hero.slide1Title': 'تین تہوں پر مشتمل تابناک موتی',
    'hero.slide1Subtitle': 'نفیس ریشمی تار پر پروئے ہوئے، آسمانی چمک اور کلائی کے بہترین زاویے کے ساتھ',
    'hero.slide2Tag': 'قدرتی زمینی معدنیات',
    'hero.slide2Spec': 'خام معدنی نمونہ &bull; گریڈ اے',
    'hero.slide2Title': 'ہمالیائی نمک کے کرسٹل معدنیات',
    'hero.slide2Subtitle': 'قدرتی رنگت اور ارضیاتی ساخت پر مشتمل خام قلمی کرسٹل',
    'hero.slide3Tag': 'خصوصی دستکاری فارمولیشن',
    'hero.slide3Spec': 'مخلوط معدنی ہم آہنگی &bull; ریشمی تار',
    'hero.slide3Title': 'دستکاری سے بنے معدنی لڑیوں کا مجموعہ',
    'hero.slide3Subtitle': 'کلائی کی قطعی پیمائش اور ارگونومک توازن کے مطابق منتخب قدرتی قیمتی پتھر',

    // Walkthrough & Trust
    'trust.badge': 'آرٹیکزین کے سرپرستوں کا اعتماد',
    'trust.heading': 'صارفین کی ۶۰،۰۰۰ سے زائد مخصوص ڈیزائن مکمل کرنے میں معاونت',
    'trust.subheading': 'دس ہزار سے زائد صارفین دستکاری سے بنے شاہکار حاصل کر چکے ہیں۔',
    'trust.designsStat': '۶۰،۰۰۰+ ڈیزائنز',
    'trust.purchasesStat': '۱۰،۰۰۰+ خریداری',
    'walkthrough.badge': 'ماسٹر بینچ گائیڈ',
    'walkthrough.title': 'مرحلہ وار بریسلیٹ کی تیاری',
    'walkthrough.desc': 'جانیں کہ آرٹیکزین کا ہر بریسلیٹ کس طرح ڈیزائن اور تیار کیا جاتا ہے۔ کلائی کی درست پیمائش، چکرا توازن اور ریشمی تار کی پائیداری۔',
    'walkthrough.cta': 'مکمل ڈیزائن گائیڈ پڑھیں',

    // Atelier Principles
    'principles.badge': 'ایٹیلیئر کے بنیادی اصول',
    'principles.titleLine1': 'آپ کا تخیل',
    'principles.titleLine2': 'آرٹیکزین کا نکھار',
    'principles.card1Category': 'ارضیاتی ذخائر',
    'principles.card1Title': 'کرسٹل انسائیکلوپیڈیا',
    'principles.card1Desc': 'تمام ۳۲ اقسام کے قدرتی قیمتی پتھروں، ان کی خصوصیات، چکرا تعلق اور دیکھ بھال کے طریقے دریافت کریں۔',
    'principles.card2Category': 'گریڈ اے مصدقہ',
    'principles.card2Title': 'قدرت کی نایاب معدنیات',
    'principles.card2Desc': 'اخلاقی اصولوں سے حاصل کردہ اصلی پتھر، جو اپنے قدرتی حسن اور مثبت توانائی کا مظہر ہیں۔',
    'principles.card3Category': 'ماہر کاریگری',
    'principles.card3Title': 'ماسٹر بینچ دستکاری',
    'principles.card3Desc': 'مضبوط لچکدار تار پر نفاست سے تیار کردہ لازوال شاہکار جنہیں فیکٹری مشین نہیں بنا سکتی۔',

    // Design Inspiration
    'gallery.badge': 'ڈیزائن کے نمونے',
    'gallery.titleLine1': 'اپنے تخیل کو',
    'gallery.titleLine2': 'جلا بخشیں',
    'gallery.desc': 'آپ کے لیے منتخب کردہ شاہکار۔ اپنی پسند کا بریسلیٹ ۱۲۰ ایف پی ایس اسٹوڈیو میں تبدیل کریں۔',
    'gallery.filterAll': 'سب',
    'gallery.filterProtection': 'حفاظت',
    'gallery.filterLove': 'محبت',
    'gallery.filterAbundance': 'خوشحالی',
    'gallery.filterIntuition': 'بصیرت',
    'gallery.remix': 'اسٹوڈیو میں تبدیل کریں',
    'gallery.viewAll': 'تمام منتخب ڈیزائنز دیکھیں',

    // Lookbook
    'lookbook.badge': 'قدرتی معدنی پیمائش',
    'lookbook.title': 'آرٹیکزین ایٹیلیئر گیلری',
    'lookbook.desc': 'ہر ملی میٹر ناپا گیا ہے۔ ہر نگینہ اصلی ہے۔ حقیقی کرسٹل اور لچکدار ریشم کی پائیدار ساخت۔',
    'lookbook.card1Title': 'شاہی یاقوت جیوڈ',
    'lookbook.card1Desc': 'گہرے جامنی کرسٹل کے خوشے جن میں قدرتی شفافیت اور بلند روحانی توانائی ہے۔',
    'lookbook.card2Title': 'گہرا لاجورد لازولی',
    'lookbook.card2Desc': 'سنہری پائرائٹ کے ذرات کے ساتھ شاہی نیلگوں پتھر، سچائی اور گلے کے چکرا کا مظہر۔',
    'lookbook.card3Title': 'تراشا ہوا گلابی کوارٹز',
    'lookbook.card3Desc': 'نیم شفاف نرم گلابی کرسٹل جو بے لوث محبت اور شفقت کی علامت ہے۔',
    'lookbook.card4Title': 'مخلوط معدنی ہم آہنگی',
    'lookbook.card4Desc': 'موتیوں کی متوازن ترتیب جو کلائی پر پرسکون اور دلکش احساس پیدا کرتی ہے۔',
    'lookbook.card5Title': 'کلائی کے عین مطابق فٹ',
    'lookbook.card5Desc': 'متوازن گھیراؤ، بغیر کسی دباؤ کے، دن بھر پہننے کے لیے انتہائی آرام دہ۔',
    'lookbook.card6Title': 'سنہری ریشمی بریسلیٹ',
    'lookbook.card6Desc': 'تراشے ہوئے کرسٹل کے دانے، ہاتھ سے گندھی ہوئی سنہری ریشم اور خوبصورت جھالر کے ساتھ۔',
    'lookbook.card7Title': 'سیاہ آبسیڈین حفاظتی شیلڈ',
    'lookbook.card7Desc': 'آتش فشانی شیشے نما آبسیڈین اور ٹائیگر آئی کا امتزاج، مضبوط تحفظ اور خود اعتمادی۔',
    'lookbook.card8Title': 'ماہر نگینہ کا معائنہ',
    'lookbook.card8Desc': 'خوردبین سے موتیوں کی اندرونی ساخت اور چمک کی سخت جانچ پڑتال۔',

    // Location
    'location.badge': 'مرکزی ایٹیلیئر',
    'location.title': 'ہمارے پیرس ایٹیلیئر تشریف لائیں',
    'location.desc': 'ہمارے معدنی ذخائر کو روبرو دیکھیں۔ اپنی کلائی کے عین مطابق ناپ اور مشاورت کے لیے وقت طے کریں۔',
    'location.addressLabel': 'پتہ',
    'location.addressVal': '۲۴ پلیس وینڈوم، ۷۵۰۰۱ پیرس، فرانس',
    'location.hoursLabel': 'اوقاتِ کار',
    'location.hoursVal': 'پیر تا ہفتہ: ۱۰:۰۰ تا ۱۹:۳۰ • نجی ملاقات وقت سے طے کریں',
    'location.phoneLabel': 'رابطہ نمبر',
    'location.phoneVal': '+33 1 42 68 00 00 • concierge@artixain.com',
    'location.bookBtn': 'ملاقات بک کریں',
    'location.guideBtn': 'سیلون گائیڈ دیکھیں',

    // Contact
    'contact.badge': 'خصوصی استفسار',
    'contact.title': 'ہماری ماہر ٹیم سے رابطہ کریں',
    'contact.desc': 'کیا آپ کے پاس مخصوص نگینوں یا کلائی کے سائز سے متعلق سوال ہے؟ ہماری ٹیم ایک دن میں جواب دیتی ہے۔',
    'contact.nameLabel': 'پورا نام',
    'contact.emailLabel': 'ای میل ایڈریس',
    'contact.messageLabel': 'پیغام',
    'contact.submitBtn': 'پیغام روانہ کریں',
    'contact.successTitle': 'پیغام موصول ہو گیا',
    'contact.successDesc': 'آرٹیکزین سے رابطہ کرنے کا شکریہ۔ ہمارے ماہرین جلد ہی آپ سے رابطہ کریں گے۔',

    // FAQ
    'faq.badge': 'اکثر پوچھے گئے سوالات',
    'faq.title': 'اہم سوالات و جوابات',
    'faq.desc': 'ہمارے ارضیاتی معیارات، سائز کے انتخاب اور دستکاری سے متعلق تمام معلومات۔',
    'faq.viewAll': 'تمام سوالات کے جوابات دیکھیں',

    // Reviews
    'reviews.badge': 'صارفین کے تاثرات',
    'reviews.title': 'دنیا بھر کے نگینہ شناسوں کی پہلی پسند',
    'reviews.viewAll': '۱،۴۲۰ سے زائد تصدیق شدہ جائزے دیکھیں'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isRTL: false,
  isSwitchingLanguage: false,
  t: (key: string) => key
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('artixain_language') as Language;
      if (saved && (saved === 'en' || saved === 'ur')) {
        setLanguageState(saved);
        updateHtmlAttributes(saved);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const updateHtmlAttributes = (lang: Language) => {
    if (typeof document !== 'undefined') {
      const isUrdu = lang === 'ur';
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', isUrdu ? 'rtl' : 'ltr');
      if (isUrdu) {
        document.documentElement.classList.add('lang-ur');
      } else {
        document.documentElement.classList.remove('lang-ur');
      }
      if (document.body) {
        document.body.setAttribute('dir', isUrdu ? 'rtl' : 'ltr');
        if (isUrdu) {
          document.body.classList.add('lang-ur');
        } else {
          document.body.classList.remove('lang-ur');
        }
      }
    }
  };

  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;

    // Trigger subtle luxury transition loader
    setIsSwitchingLanguage(true);
    setTimeout(() => {
      setLanguageState(newLang);
      updateHtmlAttributes(newLang);
      try {
        localStorage.setItem('artixain_language', newLang);
      } catch {
        // ignore
      }
      setTimeout(() => {
        setIsSwitchingLanguage(false);
      }, 350);
    }, 200);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language];
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const isRTL = language === 'ur';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRTL,
        isSwitchingLanguage,
        t
      }}
    >
      {/* Luxury Language Switching Loader Overlay */}
      {isSwitchingLanguage && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/70 dark:bg-[#0E0E10]/80 backdrop-blur-md transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 border-t-zinc-900 dark:border-t-white animate-spin mb-3" />
          <span className="text-xs font-serif tracking-widest text-zinc-900 dark:text-zinc-100 uppercase">
            {language === 'en' ? 'اردو میں منتقلی جاری ہے...' : 'Switching to English...'}
          </span>
        </div>
      )}
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
