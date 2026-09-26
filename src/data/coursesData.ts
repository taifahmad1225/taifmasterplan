export interface CourseLevel {
  levelNumber: number;
  titleUrdu: string;
  subtitleUrdu: string;
  durationUrdu: string;
  isLocked: boolean;
  topicsUrdu: string[];
  toolsCovered: string[];
}

export interface MicroCourse {
  id: string;
  slug: string;
  titleUrdu: string;
  durationUrdu: string;
  categoryUrdu: string;
  thumbnailEmoji: string;
  instructorUrdu: string;
  viewsUrdu: string;
  youtubeEmbedUrl: string;
  summaryUrdu: string;
  stepsUrdu: string[];
  masterPromptUrdu: string;
  projectTaskUrdu: string;
}

export interface CuratedCourse {
  id: string;
  titleUrdu: string;
  channelName: string;
  durationUrdu: string;
  youtubeUrl: string;
  urduSummary: string;
  badgeUrdu: string;
}

export const MAIN_COURSE_LEVELS: CourseLevel[] = [
  {
    levelNumber: 1,
    titleUrdu: 'مرحلہ 1: بنیاد اور تعارف (Foundation)',
    subtitleUrdu: 'AI کیا ہے؟ پرامپٹ انجینئرنگ کے بنیادی اصول اور فری اکاؤنٹ بنانا',
    durationUrdu: '1.5 گھنٹے (مفت دستیاب)',
    isLocked: false,
    topicsUrdu: [
      'جنریٹو AI کا تعارف اور پاکستان میں اس کا مستقبل',
      'ChatGPT اور Claude میں فری اکاؤنٹ بنانے کا طریقہ',
      'پرامپٹ لکھنے کے 4 بنیادی ستون (Role, Task, Context, Output)',
      'اردو زبان میں درست اور بامعنی پرامپٹ کیسے دیں'
    ],
    toolsCovered: ['ChatGPT 4o', 'Claude 3.5', 'Gemini Pro']
  },
  {
    levelNumber: 2,
    titleUrdu: 'مرحلہ 2: ٹولز پر مہارت (Tools Mastery)',
    subtitleUrdu: 'تصاویر، آواز، ویڈیو اور کوڈنگ کے ٹاپ ٹولز کا عملی استعمال',
    durationUrdu: '2.5 گھنٹے (ان لاک کریں)',
    isLocked: true,
    topicsUrdu: [
      'Midjourney اور Leonardo سے 4K کمرشل تصاویر بنانا',
      'ElevenLabs سے قدرتی اردو اور پنجابی وائس اوور',
      'CapCut اور Runway سے خودکار ویڈیو ایڈیٹنگ',
      'Canva Magic Studio سے ایک کلک پر برانڈنگ کٹ'
    ],
    toolsCovered: ['Leonardo AI', 'ElevenLabs', 'CapCut', 'Canva']
  },
  {
    levelNumber: 3,
    titleUrdu: 'مرحلہ 3: آٹومیشن اور ورک فلوز (Automation)',
    subtitleUrdu: '1 کلک پر پورا بزنس ورک فلو چلانا اور بغیر انسانی مداخلت کام',
    durationUrdu: '3 گھنٹے (ان لاک کریں)',
    isLocked: true,
    topicsUrdu: [
      'فیس لیس یوٹیوب شارٹس کا بلک آٹومیشن سسٹم',
      'واٹس ایپ کسٹمر سپورٹ بوٹ تیار کرنا',
      'بلاگنگ اور ایس ای او آرٹیکلز کی خودکار پبلشنگ',
      'دراز پروڈکٹ لسٹنگز اور ایڈ ڈیزائنز آٹومیشن'
    ],
    toolsCovered: ['Voiceflow', 'Make.com', 'ChatGPT API', 'WordPress']
  },
  {
    levelNumber: 4,
    titleUrdu: 'مرحلہ 4: پیسہ کمانا (Paisa Kamana)',
    subtitleUrdu: 'Fiverr، Upwork اور لوکل کلائنٹس سے 50,000 تا 2 لاکھ ماہانہ کمائی',
    durationUrdu: '3.5 گھنٹے (ان لاک کریں)',
    isLocked: true,
    topicsUrdu: [
      'Fiverr پر ہائی ڈیمانڈ AI گگز بنانا جو 7 دن میں رینک کریں',
      'امریکی اور یورپی کلائنٹس کو کولڈ ای میل بھیجنے کا راز',
      'پاکستانی دکانوں کو سوشل میڈیا مینجمنٹ بیچنا',
      'پیمنٹ میتھڈز: Payoneer، JazzCash اور بینک ٹرانسفر کے اصول'
    ],
    toolsCovered: ['Fiverr', 'Upwork', 'Apollo.io', 'Canva Pro']
  }
];

export const MICRO_COURSES: MicroCourse[] = [
  {
    id: 'mc-1',
    slug: 'leonardo-se-logo-fiverr',
    titleUrdu: 'Leonardo سے لوگو بنا کر Fiverr پر بیچیں — 7 منٹ',
    durationUrdu: '7 منٹ',
    categoryUrdu: 'فائور کمائی',
    thumbnailEmoji: '💎',
    instructorUrdu: 'حمزہ طارق (ٹاپ ریٹڈ سیلر، لاہور)',
    viewsUrdu: '42,500 طلباء نے دیکھا',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summaryUrdu: 'اس 7 منٹ کے مائیکرو کورس میں آپ سیکھیں گے کہ کیسے Leonardo AI پر 3D ویکٹر لوگو کا پرامپٹ لکھ کر Recraft سے SVG فائل بنائی جاتی ہے اور فائور پر 20 ڈالر (5,500 روپے) میں ڈلیور کی جاتی ہے۔',
    stepsUrdu: [
      'مرحلہ 1: فائور پر "Minimalist 3D Logo" کی گگ ریسرچ کرنا',
      'مرحلہ 2: Leonardo AI میں کلر پیلیٹ اور ویکٹر پرامپٹ درج کرنا',
      'مرحلہ 3: Recraft.ai سے بیک گراؤنڈ مٹا کر SVG ویکٹر فائل نکالنا',
      'مرحلہ 4: Canva میں وزٹنگ کارڈ پر 3D موک اپ لگا کر کلائنٹ کو زپ فائل بھیجنا'
    ],
    masterPromptUrdu: 'Minimalist 3D vector emblem logo for a luxury brand named [برانڈ کا نام], gold and deep emerald green, pure white studio background, clean geometric sharp outlines --no photorealism, text shadows',
    projectTaskUrdu: 'اپنے کسی خیالی برانڈ (مثلاً Royal Chai یا Lahore Bakers) کے لیے Leonardo پر 2 لوگوز بنائیں اور Canva میں کارڈ پر موک اپ تیار کریں۔'
  },
  {
    id: 'mc-2',
    slug: 'elevenlabs-voiceover-youtube',
    titleUrdu: 'ElevenLabs سے جاندار اردو وائس اوور — 5 منٹ',
    durationUrdu: '5 منٹ',
    categoryUrdu: 'وائس اوور',
    thumbnailEmoji: '🎙️',
    instructorUrdu: 'سعدیہ بیگم (وائس آرٹسٹ، اسلام آباد)',
    viewsUrdu: '38,100 طلباء نے دیکھا',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summaryUrdu: 'سیکھیں کہ بغیر مائیکروفون کے خالص ریڈیو کوالٹی اردو اور جذباتی لہجے میں ڈاکیومنٹری وائس اوور کیسے بنایا جاتا ہے۔',
    stepsUrdu: [
      'مرحلہ 1: ElevenLabs پر مفت اکاؤنٹ لاگ ان کریں',
      'مرحلہ 2: اردو کے لیے موزوں آواز (Multilingual v2) منتخب کریں',
      'مرحلہ 3: اردو متن میں وقفوں کے لیے کوما اور فل اسٹاپ ایڈجسٹ کریں',
      'مرحلہ 4: ایم پی 3 فائل ڈاؤنلوڈ کر کے ویڈیو پر ایڈجسٹ کریں'
    ],
    masterPromptUrdu: 'اس متن کو پرسکون اور سنجیدہ معلوماتی انداز میں بولیں، الفاظ کے تلفظ پر خصوصی توجہ دیں: [اردو پیراگراف درج کریں]',
    projectTaskUrdu: 'اپنے پسندیدہ قول کا 30 سیکنڈ کا اردو وائس اوور جنریٹ کریں اور ڈاؤنلوڈ کریں۔'
  },
  {
    id: 'mc-3',
    slug: 'capcut-ai-captions-reels',
    titleUrdu: 'CapCut سے آٹو کیپشنز اور وائرل ریلز — 6 منٹ',
    durationUrdu: '6 منٹ',
    categoryUrdu: 'ویڈیو ایڈیٹنگ',
    thumbnailEmoji: '🎬',
    instructorUrdu: 'فرحان علی (یوٹیوبر، کراچی)',
    viewsUrdu: '65,200 طلباء نے دیکھا',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summaryUrdu: 'سیکھیں کہ ویڈیو پر بولے جانے والے الفاظ کے مطابق چمکتے ہوئے اینیمیٹڈ کیپشنز لگا کر ویوز کو 5 گنا کیسے بڑھایا جاتا ہے۔',
    stepsUrdu: [
      'مرحلہ 1: CapCut میں 9:16 ریشو کی ویڈیو امپورٹ کریں',
      'مرحلہ 2: "Auto Captions" پر کلک کر کے اینیمیشن ٹیمپلیٹ منتخب کریں',
      'مرحلہ 3: کلیدی الفاظ کا رنگ پیلا یا ہرا کریں',
      'مرحلہ 4: 1080p 60fps میں بغیر واٹر مارک محفوظ کریں'
    ],
    masterPromptUrdu: 'Dynamic viral typography with high-contrast yellow stroke, bouncing text transition per word spoken.',
    projectTaskUrdu: 'ایک 20 سیکنڈ کی شارٹ ویڈیو پر رنگین آٹو کیپشنز لگا کر رینڈر کریں۔'
  },
  {
    id: 'mc-4',
    slug: 'chatgpt-seo-article-writing',
    titleUrdu: 'ChatGPT سے 1000 الفاظ کا SEO اردو آرٹیکل — 8 منٹ',
    durationUrdu: '8 منٹ',
    categoryUrdu: 'کنٹینٹ رائٹنگ',
    thumbnailEmoji: '✍️',
    instructorUrdu: 'کامران ملک (بلاگر، راولپنڈی)',
    viewsUrdu: '51,000 طلباء نے دیکھا',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summaryUrdu: 'گوگل پر پہلے نمبر پر رینک کرنے والے طویل مضامین جن میں ہیڈنگز، کی ورڈز اور ایف اے کیوز شامل ہوں، منٹوں میں تحریر کریں۔',
    stepsUrdu: [
      'مرحلہ 1: گوگل پر سرچ کیے جانے والے کی ورڈز نکالنا',
      'مرحلہ 2: ChatGPT سے آرٹیکل کی جامع آؤٹ لائن بنوانا',
      'مرحلہ 3: ہر ہیڈنگ کو الگ کمانڈ کے ذریعے گہرائی سے لکھوانا',
      'مرحلہ 4: ورڈپریس پر پوسٹ کر کے میٹا ڈسکرپشن لگانا'
    ],
    masterPromptUrdu: 'آپ ایک سینیئر SEO اردو رائٹر ہیں۔ [موضوع] پر ایک جامع 1000 الفاظ کا آرٹیکل لکھیں جس میں H2, H3 ہیڈنگز، بلٹ پوائنٹس اور عمومی سوالات کے جوابات شامل ہوں۔',
    projectTaskUrdu: 'پاکستان میں آن لائن کمائی کے کسی 1 طریقے پر مکمل بلاگ پوسٹ تیار کریں۔'
  },
  {
    id: 'mc-5',
    slug: 'photoroom-daraz-mockups',
    titleUrdu: 'PhotoRoom سے دراز پروڈکٹ فوٹو شوٹ — 5 منٹ',
    durationUrdu: '5 منٹ',
    categoryUrdu: 'ای کامرس',
    thumbnailEmoji: '🛍️',
    instructorUrdu: 'عمران قریشی (ای کامرس سیلر، فیصل آباد)',
    viewsUrdu: '29,400 طلباء نے دیکھا',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summaryUrdu: 'موبائل سے اتاری گئی تصویر سے بیک گراؤنڈ مٹا کر دراز اور ایمیزون کے لیے شاندار اسٹوڈیو تصویر بنانے کا طریقہ۔',
    stepsUrdu: [
      'مرحلہ 1: موبائل سے پروڈکٹ کی تصویر لینا',
      'مرحلہ 2: PhotoRoom میں ڈال کر خودکار بیک گراؤنڈ ریموول',
      'مرحلہ 3: ماربل ٹیبل یا لگژری اسٹوڈیو کا لائٹنگ ایفیکٹ چننا',
      'مرحلہ 4: ہائی ریزولوشن میں محفوظ کر کے دراز پر لسٹ کرنا'
    ],
    masterPromptUrdu: 'Polished white marble floor with morning sunlight and soft shadows, blurred high-end boutique background.',
    projectTaskUrdu: 'گھر میں موجود کسی بھی چیز (مثلاً عطر یا گھڑی) کی کمرشل پروڈکٹ تصویر بنائیں۔'
  },
  {
    id: 'mc-6',
    slug: 'canva-magic-social-kit',
    titleUrdu: 'Canva Magic سے سوشل میڈیا برانڈ کٹ — 7 منٹ',
    durationUrdu: '7 منٹ',
    categoryUrdu: 'گرافک ڈیزائن',
    thumbnailEmoji: '🎨',
    instructorUrdu: 'زینب خان (UI ڈیزائنر، پشاور)',
    viewsUrdu: '47,800 طلباء نے دیکھا',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summaryUrdu: 'فیس بک کور، انسٹاگرام پوسٹ اور واٹس ایپ بینر کا پورا برانڈ سیٹ صرف 1 ڈیزائن سے خودکار ری سائز کر کے تیار کریں۔',
    stepsUrdu: [
      'مرحلہ 1: Canva Magic Switch فیچر کا تعارف',
      'مرحلہ 2: ایک پوسٹ بنا کر تمام سوشل میڈیا سائزز میں بدلنا',
      'مرحلہ 3: برانڈ کلرز اور لوگو کو ایک کلک پر لاگو کرنا',
      'مرحلہ 4: پی این جی فارمیٹ میں بلک ڈاؤنلوڈ'
    ],
    masterPromptUrdu: 'Modern social media banner layout with high contrast emerald and white branding, bold Urdu typography.',
    projectTaskUrdu: 'اپنے کسی پروجیکٹ کے لیے فیس بک کور اور انسٹاگرام پوسٹ ایک ہی تھیم پر بنائیں۔'
  }
];

export const CURATED_COURSES: CuratedCourse[] = [
  {
    id: 'cur-1',
    titleUrdu: 'مکمل ChatGPT اور پرامپٹ انجینئرنگ ماسٹر کلاس',
    channelName: 'Hisham Sarwar (ہشام سرور)',
    durationUrdu: '45 منٹ',
    youtubeUrl: 'https://youtube.com',
    urduSummary: 'پاکستانی فری لانسرز کے لیے چیٹ جی پی ٹی سے کلائنٹ لانے اور گگ رینک کرنے کا جامع اور عملی طریقہ۔',
    badgeUrdu: 'سب سے مقبول'
  },
  {
    id: 'cur-2',
    titleUrdu: 'مڈجرنی v6 اور جدید تصویری ڈیزائننگ فل گائیڈ',
    channelName: 'Azad Chaiwala (آزاد چائے والا)',
    durationUrdu: '38 منٹ',
    youtubeUrl: 'https://youtube.com',
    urduSummary: 'بغیر کیمرے اور فوٹوشاپ کے ہائی ریزولوشن تصاویر اور لوگو بنا کر پیسے کمانے کا لائیو مظاہرہ۔',
    badgeUrdu: 'عملی تربیت'
  },
  {
    id: 'cur-3',
    titleUrdu: 'فیس لیس یوٹیوب چینل سے ماہانہ 1 لاکھ کمانے کا فارمولا',
    channelName: 'Kashif Majeed (کاشف مجید)',
    durationUrdu: '32 منٹ',
    youtubeUrl: 'https://youtube.com',
    urduSummary: 'AI آواز، ویڈیو اور اسکرپٹ جوڑ کر شارٹس بنانے اور یوٹیوب پارٹنر پروگرام سے آمدنی کا طریقہ۔',
    badgeUrdu: 'پیسیو انکم'
  },
  {
    id: 'cur-4',
    titleUrdu: 'فائور پر AI ٹولز سے پہلی سروس بیچنے کی حکمت عملی',
    channelName: 'GFX Mentor (عمران علی دینا)',
    durationUrdu: '50 منٹ',
    youtubeUrl: 'https://youtube.com',
    urduSummary: 'گرافک ڈیزائن اور AI کا ملاپ جس سے ڈیزائن کا معیار بلند ہوتا ہے اور کلائنٹ بار بار واپس آتا ہے۔',
    badgeUrdu: 'ماسٹر لیول'
  }
];
