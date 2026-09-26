export interface ToolItem {
  id: string;
  name: string;
  urduName: string;
  englishName?: string;
  categoryId: string;
  categoryUrdu: string;
  categoryEnglish?: string;
  pricePKR: string;
  isFree: boolean;
  rating: number;
  usersCount: string;
  taglineUrdu: string;
  taglineEnglish?: string;
  descriptionUrdu: string;
  descriptionEnglish?: string;
  
  // Section A: "یہ ٹول کیا کرتا ہے؟" (2 lines)
  whatItDoesUrdu?: string;
  whatItDoesEnglish?: string;

  // Section B: "اس سے آپ کیا کما سکتے ہیں؟" with earning idea in PKR
  earningIdeaUrdu?: string;
  earningIdeaEnglish?: string;
  earningPKR?: string;

  // Section C: "استعمال کا طریقہ" in 3 steps
  howToUseStepsUrdu?: string[];
  howToUseStepsEnglish?: string[];

  // Point 4: اس سے کیا کر سکتے ہیں
  whatYouCanDoUrdu?: string;
  whatYouCanDoEnglish?: string;

  // Point 8: پاکستان کا متبادل (Alternative)
  alternativeUrdu?: string;

  // Point 10: پیسے کمانے کا آئیڈیا
  fiverrSellingIdeaUrdu?: string;

  // Point 11: لیول (مبتدی / درمیانہ / ماہر)
  levelUrdu?: 'مبتدی' | 'درمیانہ' | 'ماہر' | string;

  promptTemplate: string;
  videoTutorial: {
    title: string;
    duration: string;
    instructorUrdu: string;
    views: string;
    stepsUrdu: string[];
  };
  toolUrl: string;
  badgeUrdu?: string;
  badgeEnglish?: string;
}

export function enrichTool(tool: any): ToolItem {
  const categoryId = tool.categoryId || 'writing';
  
  // Category-specific presets for 11 points format
  const categoryAlternatives: Record<string, string> = {
    'writing': 'Claude 3.5 Sonnet / DeepSeek (مفت متبادل)',
    'image': 'Ideogram.ai / Recraft.ai (مفت متبادل)',
    'video': 'CapCut / Clipchamp (مفت متبادل)',
    'voice': 'PlayHT / Clipchamp (مفت متبادل)',
    'code': 'Cursor AI / Codeium (مفت متبادل)',
    'excel': 'ChatGPT / Google Sheets AI (0 روپے)',
    'design': 'Canva Free / Photopea (مفت متبادل)',
    'social-media': 'Buffer Free / Meta Business Suite (مفت)',
    'education': 'Perplexity Free / Khanmigo (مفت)',
    'business': 'Notion AI / ChatGPT (مفت متبادل)',
    'chatbot': 'Tidio Free / Botpress (مفت متبادل)',
    'marketing': 'ChatGPT Plus / Ubersuggest (سستا متبادل)',
    'music': 'MusicLM / Soundful (مفت متبادل)',
    '3d': 'Blender AI / Luma AI (مفت متبادل)',
    'email': 'Brevo / Mailchimp Free (مفت متبادل)',
    'ecommerce': 'Daraz Seller AI / Canva Product (مفت)',
    'pdf': 'ChatPDF / Adobe Acrobat AI (مفت)',
    'translation': 'DeepL Free / Google Translate (مفت)',
    'security': 'Cloudflare Free / VirusTotal (مفت)',
    'presentation': 'Gamma App Free / Canva Slides (مفت)',
    'gaming': 'Unity Muse / ChatGPT Lore (مفت)',
    'health': 'Gemini Health / MyFitnessPal (مفت)',
    'finance': 'Microsoft Copilot / TradingView Free (مفت)',
    'property': 'Zameen.com AI / Canva Property (مفت)',
    'productivity': 'Google Keep / Notion Free (مفت متبادل)',
  };

  const defaultLevel = tool.isFree ? 'مبتدی' : (tool.rating >= 4.8 ? 'درمیانہ' : 'ماہر');
  
  // Category-specific earning and capability presets
  const categoryDefaults: Record<string, {
    whatUrdu: string;
    whatEn: string;
    earnUrdu: string;
    earnEn: string;
    earnPKR: string;
    stepsUrdu: string[];
    stepsEn: string[];
    whatCanDoUrdu: string;
    fiverrIdea: string;
  }> = {
    'writing': {
      whatUrdu: 'انسانوں کی طرح اعلیٰ درجے کے اردو و انگریزی بلاگ مضامین، یوٹیوب اسکرپٹس اور ای میلز سیکنڈوں میں لکھتا ہے۔',
      whatEn: 'This tool generates high quality Urdu and English blog articles, video scripts and outreach emails in seconds.',
      earnUrdu: 'ماہانہ PKR 60,000 تا 150,000 — فائور اور اپ ورک پر آرٹیکل رائٹنگ، بلاگنگ اور یوٹیوب اسکرپٹ سروسز دے کر۔',
      earnEn: 'PKR 60,000 to 150,000 / month — Offering article writing, blog publishing, and YouTube script services on freelance platforms.',
      earnPKR: 'PKR 60,000 - 150,000 / ماہ',
      stepsUrdu: [
        'ٹول پر لاگ ان کریں اور موضوع یا عنوان درج کریں۔',
        'تیار شدہ ماسٹر پرامپٹ کاپی کر کے مطلوبہ ہدایات کے ساتھ پیسٹ کریں۔',
        'حاصل شدہ مواد کو چیک کریں اور کلائنٹ یا بلاگ پر پبلش کریں۔'
      ],
      stepsEn: [
        'Sign in to the tool and choose your preferred article topic or brief',
        'Copy the master prompt below, customize details in brackets, and hit generate',
        'Review the generated output, fine-tune formatting, and deliver to clients'
      ],
      whatCanDoUrdu: 'مضامین، ای بکس، پروپوزلز اور یوٹیوب اسکرپٹس کی خودکار تیاری اور 90% وقت کی بچت۔',
      fiverrIdea: 'Fiverr پر 500 روپے تا 2,500 روپے میں بلاگ پوسٹ یا اسکرپٹ سروس بیچیں'
    },
    'image': {
      whatUrdu: 'ٹیکسٹ پرامپٹ پڑھ کر فوٹو ریئلسٹک تصاویر، کمرشل لوگوز اور برانڈ ڈیزائنز تیار کرتا ہے۔',
      whatEn: 'This AI model converts text prompts into photorealistic images, logos and brand graphics in seconds.',
      earnUrdu: 'ماہانہ PKR 70,000 تا 200,000 — دراز اسٹورز کے لیے پروڈکٹ فوٹو شوٹ، لوگو ڈیزائن اور سوشل میڈیا پوسٹس بنا کر۔',
      earnEn: 'PKR 70,000 to 200,000 / month — Selling product mockups to Daraz sellers, custom logos and social media graphics.',
      earnPKR: 'PKR 70,000 - 200,000 / ماہ',
      stepsUrdu: [
        'ٹول کھولیں اور پرامپٹ باکس میں مطلوبہ تصویر کا خاکہ اور رنگ درج کریں۔',
        'اسپیکٹ ریشو (16:9 یا 1:1) منتخب کر کے جنریٹ کا بٹن دبائیں۔',
        'پسندیدہ تصویر کو ہائی ریزولوشن (HD) میں ڈاؤنلوڈ کر کے استعمال کریں۔'
      ],
      stepsEn: [
        'Open the tool and enter the visual details and color palette into the prompt box',
        'Choose your desired aspect ratio (16:9 or 1:1) and click Generate',
        'Download the best high-resolution render for your project or client'
      ],
      whatCanDoUrdu: 'برانڈ لوگوز، دراز پروڈکٹ موک اپس، یوٹیوب تھمب نیلز اور سوشل میڈیا پوسٹس کا فوری رینڈر۔',
      fiverrIdea: 'Fiverr پر 500 روپے تا 5,000 روپے میں AI لوگو یا پروڈکٹ بیک گراؤنڈ ریموول بیچیں'
    },
    'video': {
      whatUrdu: 'ٹیکسٹ سے مکمل ویڈیو کلپس، متحرک ریلز اور خودکار رنگین کیپشنز تیار کرتا ہے۔',
      whatEn: 'This video AI creates video clips, animated reels and captions directly from text prompts.',
      earnUrdu: 'ماہانہ PKR 80,000 تا 250,000 — فیس لیس یوٹیوب چینل، ٹک ٹاک مونیٹائزیشن اور ریلز ایڈیٹنگ سروسز سے۔',
      earnEn: 'PKR 80,000 to 250,000 / month — Monetizing faceless YouTube channels and offering reel editing to local creators.',
      earnPKR: 'PKR 80,000 - 250,000 / ماہ',
      stepsUrdu: [
        'ویڈیو کا آئیڈیا یا اسکرپٹ ان پٹ کریں اور مطلوبہ کیمرہ موشن منتخب کریں۔',
        'آٹو کیپشنز اور بیک گراؤنڈ میوزک لگا کر رینڈر کریں۔',
        'فائنل ویڈیو ایکسپورٹ کریں اور یوٹیوب شارٹس یا انسٹاگرام پر لگائیں۔'
      ],
      stepsEn: [
        'Input your video concept or script and select the desired camera motion',
        'Enable auto-captions, background score, and render the timeline',
        'Export the 1080p clip and publish to social channels'
      ],
      whatCanDoUrdu: 'کیمرے کے سامنے آئے بغیر فیس لیس یوٹیوب شارٹس، ٹک ٹاک ریلز اور اشتہاری ویڈیوز بنانا۔',
      fiverrIdea: 'Fiverr پر 500 روپے تا 4,000 روپے میں 30 سیکنڈ کی وائرل ریل ایڈٹ کر کے بیچیں'
    }
  };

  const defaults = categoryDefaults[categoryId] || {
    whatUrdu: `یہ ٹول ${tool.urduName || tool.name} کے شعبے میں جدید ترین اور تیز رفتار AI صلاحیتیں فراہم کرتا ہے۔`,
    whatEn: `This tool delivers cutting-edge generative AI capabilities for ${tool.name}.`,
    earnUrdu: 'ماہانہ PKR 50,000 تا 150,000 — آن لائن فری لانسنگ اور مقامی پاکستانی کلائنٹس کو سروسز فراہم کر کے۔',
    earnEn: 'PKR 50,000 to 150,000 / month — By delivering freelance services on platforms and to Pakistani local businesses.',
    earnPKR: 'PKR 50,000 - 150,000 / ماہ',
    stepsUrdu: [
      'اکاؤنٹ کھولیں یا ٹول کی آفیشل ویب سائٹ پر سائن اپ کریں۔',
      'ہماری سائٹ سے تیار ماسٹر پرامپٹ کاپی کر کے ٹول میں پیسٹ کریں۔',
      'فائنل نتائج حاصل کر کے اپنے کام یا کلائنٹ کو ڈیلیور کریں۔'
    ],
    stepsEn: [
      'Create an account or launch the tool web application',
      'Copy our verified master prompt and paste it with your custom parameters',
      'Export the final asset and deliver directly to your client or workflow'
    ],
    whatCanDoUrdu: 'روزمرہ پیچیدہ دفتری اور ڈیزائننگ کے کاموں کی 10 گنا تیز رفتار خودکاریت۔',
    fiverrIdea: 'Fiverr پر 500 روپے میں بیچیں (فوری گگ آرڈر حاصل کریں)'
  };

  return {
    ...tool,
    whatItDoesUrdu: tool.whatItDoesUrdu || defaults.whatUrdu,
    whatItDoesEnglish: tool.whatItDoesEnglish || defaults.whatEn,
    earningIdeaUrdu: tool.earningIdeaUrdu || defaults.earnUrdu,
    earningIdeaEnglish: tool.earningIdeaEnglish || defaults.earnEn,
    earningPKR: tool.earningPKR || defaults.earnPKR,
    howToUseStepsUrdu: tool.howToUseStepsUrdu || defaults.stepsUrdu,
    howToUseStepsEnglish: tool.howToUseStepsEnglish || defaults.stepsEn,
    whatYouCanDoUrdu: tool.whatYouCanDoUrdu || defaults.whatCanDoUrdu,
    fiverrSellingIdeaUrdu: tool.fiverrSellingIdeaUrdu || defaults.fiverrIdea,
    alternativeUrdu: tool.alternativeUrdu || categoryAlternatives[categoryId] || 'Canva / مفت متبادل دستیاب',
    levelUrdu: tool.levelUrdu || defaultLevel,
    badgeEnglish: tool.badgeUrdu === 'سب سے مقبول' ? 'Most Popular' : (tool.badgeUrdu === 'ٹاپ ریٹڈ' ? 'Top Rated' : (tool.isFree ? 'Free Access' : 'Pro Tool'))
  };
}

// 25 Categories * 10 tools = 250 tools with authentic Urdu copy, PKR pricing, prompts and tutorials
export const ALL_TOOLS: ToolItem[] = [
  // 1. لکھائی (Writing) - 10 Tools
  {
    id: 'tool-write-1',
    name: 'ChatGPT 4o',
    urduName: 'چیٹ جی پی ٹی 4 او',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'PKR 5,600 / ماہ (مفت ورژن دستیاب)',
    isFree: false,
    rating: 4.9,
    usersCount: '120K+ پاکستانی',
    taglineUrdu: 'مکمل اردو مضامین، بلاگ اور یوٹیوب اسکرپٹس کا بے تاج بادشاہ',
    descriptionUrdu: 'دنیا کا سب سے طاقتور AI ماڈل جو رواں اردو میں طویل مضامین، کہانی اور ای میلز سیکنڈوں میں لکھتا ہے۔',
    badgeUrdu: 'سب سے مقبول',
    promptTemplate: 'آپ ایک سینیئر اردو بلاگ رائٹر ہیں۔ میرے لیے "پاکستان میں AI سے آن لائن پیسے کمانے کے 5 آسان طریقے" پر ایک تفصیلی اور پرکشش 1000 الفاظ کا بلاگ پوسٹ لکھیں جس میں ہیڈنگز اور پریکٹیکل ٹپس شامل ہوں۔',
    videoTutorial: {
      title: 'ChatGPT سے اردو آرٹیکل لکھنے اور مونیٹائز کرنے کا طریقہ',
      duration: '14:20 منٹ',
      instructorUrdu: 'احسن خان (AI ایکسپرٹ، لاہور)',
      views: '45,200 ویوز',
      stepsUrdu: ['اکاؤنٹ بنانا اور اردو پرامپٹ سیٹ کرنا', 'آرٹیکل کی آؤٹ لائن تیار کروانا', 'سرچ انجن آپٹیمائزیشن (SEO) کی ورڈز شامل کرنا', 'فائنل رزلٹ کو بلاگ یا کلائنٹ کو بھیجنا']
    },
    toolUrl: 'https://chat.openai.com'
  },
  {
    id: 'tool-write-2',
    name: 'Claude 3.5 Sonnet',
    urduName: 'کلاڈ 3.5 سونیٹ',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'PKR 5,600 / ماہ (مفت پلان دستیاب)',
    isFree: false,
    rating: 4.9,
    usersCount: '65K+ پاکستانی',
    taglineUrdu: 'قدرتی انسانی لہجے میں گہری اور فکری اردو تحریر',
    descriptionUrdu: 'اینتھروپک کا جدید ترین ماڈل جو روبوٹک لہجے کے بجائے خالص ادبی اور پیشہ ورانہ اردو انداز فراہم کرتا ہے۔',
    badgeUrdu: 'اعلیٰ کوالٹی',
    promptTemplate: 'ایک تجربہ کار پاکستانی کیریئر کونسلر کا کردار ادا کریں۔ سافٹ ویئر انجینئرنگ کی تازہ ترین ڈگری رکھنے والے نوجوان کے لیے ایک زبردست موٹیویشنل لیٹر لکھیں جس میں لوکل مارکیٹ اور ریموٹ جابز کا تذکرہ ہو۔',
    videoTutorial: {
      title: 'Claude 3.5 سے انسانی لہجے والی اردو ریسرچ پیپر کیسے لکھیں',
      duration: '12:05 منٹ',
      instructorUrdu: 'ڈاکٹر طاہر مسعود (اسلام آباد)',
      views: '28,100 ویوز',
      stepsUrdu: ['کلاڈ انٹرفیس کا تعارف', 'طویل دستاویزات (PDF) اپلوڈ کرنا', 'اردو سمرائزیشن کمانڈز', 'ادبی اسلوب میں درستی']
    },
    toolUrl: 'https://claude.ai'
  },
  {
    id: 'tool-write-3',
    name: 'QuillBot Urdu',
    urduName: 'کوئل بوٹ ری فریزنگ',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'PKR 2,200 / ماہ (مفت ورژن دستیاب)',
    isFree: false,
    rating: 4.7,
    usersCount: '80K+ پاکستانی',
    taglineUrdu: 'جملوں کی ری فریزنگ اور گرامر کی درستگی',
    descriptionUrdu: 'طالب علموں اور اساتذہ کے لیے بہترین، جو تحریر کو پلیجیرزم سے پاک اور شستہ بناتا ہے۔',
    promptTemplate: 'مندرجہ ذیل پیراگراف کو دوبارہ اس طرح لکھیں کہ مفہوم وہی رہے مگر الفاظ زیادہ شائستہ، پُراثر اور گرائمر کے لحاظ سے بالکل درست ہو جائیں: [یہاں اپنا متن پیسٹ کریں]',
    videoTutorial: {
      title: 'QuillBot سے اسائنمنٹس اور تھیسز کو ری فریز کرنا',
      duration: '09:40 منٹ',
      instructorUrdu: 'مریم بلوچ (کراچی یونیورسٹی)',
      views: '34,900 ویوز',
      stepsUrdu: ['متن پیسٹ کرنے کا درست طریقہ', 'فلوانسی اور فارمل موڈ کا انتخاب', 'ہم معنی الفاظ کی تبدیلی', 'نتیجہ کاپی کرنا']
    },
    toolUrl: 'https://quillbot.com'
  },
  {
    id: 'tool-write-4',
    name: 'Jasper AI',
    urduName: 'جیسپر کاپی رائٹنگ',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'PKR 11,000 / ماہ (7 دن ٹرائل)',
    isFree: false,
    rating: 4.8,
    usersCount: '25K+ پاکستانی',
    taglineUrdu: 'مارکیٹنگ ایڈز اور سیلز لیٹرز کی خودکار تیاری',
    descriptionUrdu: 'فیس بک اور انسٹاگرام اشتہارات کے لیے ایسی کیچنگ سرخیاں بناتا ہے جو کلکس بڑھاتی ہیں۔',
    promptTemplate: 'ایک پاکستانی آن لائن کلاتھنگ برانڈ کے لیے فیس بک ایڈ کاپی بنائیں جس میں عید سیل کا اعلان ہو، کیش آن ڈیلیوری کی سہولت بتائی گئی ہو اور ایک محدود وقت کی آفر کا دباؤ ہو۔',
    videoTutorial: {
      title: 'Jasper AI سے ہائی کنورٹنگ فیس بک ایڈز تیار کرنے کی ٹپس',
      duration: '18:10 منٹ',
      instructorUrdu: 'حمزہ شیخ (ای کامرس کنسلٹنٹ)',
      views: '19,400 ویوز',
      stepsUrdu: ['برانڈ وائس فیچر سیٹ کرنا', 'AIDA فریم ورک کا استعمال', 'کیچنگ ہیڈ لائنز بنانا', 'سیلز پیج کاپی تیار کرنا']
    },
    toolUrl: 'https://jasper.ai'
  },
  {
    id: 'tool-write-5',
    name: 'Copy.ai',
    urduName: 'کاپی ڈاٹ اے آئی',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'مفت (بنیادی) / PKR 7,000 پریمیم',
    isFree: true,
    rating: 4.6,
    usersCount: '45K+ پاکستانی',
    taglineUrdu: 'فری لانس کاپی رائٹرز کا پسندیدہ مددگار',
    descriptionUrdu: 'سوشل میڈیا کیپشنز، پروڈکٹ ڈسکرپشنز اور ای میلز کے لیے تیز ترین اور آسان ٹول۔',
    promptTemplate: 'ایک نئی کھلنے والی کیفے کے لیے 5 مختلف انسٹاگرام کیپشنز اردو اور رومن اردو کے امتزاج میں تیار کریں جن میں متعلقہ ہیش ٹیگز شامل ہوں۔',
    videoTutorial: {
      title: 'Copy.ai سے 5 منٹ میں فائور گیگ ڈسکرپشن لکھیں',
      duration: '11:15 منٹ',
      instructorUrdu: 'سلمان ارشد (ٹاپ ریٹڈ فری لانسر)',
      views: '22,800 ویوز',
      stepsUrdu: ['ٹول کے فری ٹولز تلاش کرنا', 'پروڈکٹ ڈسکرپشن جنریٹر', 'کیپشنز اور ٹیگز کی سلیکشن', 'کلائنٹ ڈیلیوری فارمیٹ']
    },
    toolUrl: 'https://copy.ai'
  },
  {
    id: 'tool-write-6',
    name: 'Grammarly',
    urduName: 'گرامرلی اسسٹنٹ',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'مفت (بنیادی) / PKR 3,400 پریمیم',
    isFree: true,
    rating: 4.9,
    usersCount: '150K+ پاکستانی',
    taglineUrdu: 'انگلش ای میلز اور پرپوزلز کی 100% پروف ریڈنگ',
    descriptionUrdu: 'پاکستانی فری لانسرز کے لیے ناگزیر، جو اپ ورک اور فائور پرپوزلز میں املا و گرامر درست کرتا ہے۔',
    promptTemplate: 'Please review this proposal for an international client and fix tone, professional diction, and eliminate passive voice: [Insert proposal text here]',
    videoTutorial: {
      title: 'Grammarly سے اپ ورک پروپوزل وننگ کیسے بنائیں',
      duration: '08:30 منٹ',
      instructorUrdu: 'عثمان رضا (لاہور)',
      views: '61,000 ویوز',
      stepsUrdu: ['کروم ایکسٹینشن انسٹال کرنا', 'ٹون ڈیٹیکٹر ایڈجسٹ کرنا', 'کلیرٹی اور برائیوٹی درست کرنا', 'فری بمقابلہ پرو فیچرز']
    },
    toolUrl: 'https://grammarly.com'
  },
  {
    id: 'tool-write-7',
    name: 'Writesonic',
    urduName: 'رائٹ سونک',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'مفت (ٹرائل) / PKR 4,500 ماہانہ',
    isFree: true,
    rating: 4.6,
    usersCount: '32K+ پاکستانی',
    taglineUrdu: 'SEO فرینڈلی لمبے آرٹیکلز کی فوری تخلیق',
    descriptionUrdu: 'گوگل سرچ رزلٹس کے تجزیے کے ساتھ ایس ای او رینکنگ مضامین خودکار طور پر لکھتا ہے۔',
    promptTemplate: 'گوگل میں رینک کرنے کے لیے "گھر بیٹھے آن لائن کمائی کیسے کریں" پر ایچ 1، ایچ 2 اور ایچ 3 ہیڈنگز کے ساتھ مکمل مضمون تخلیق کریں۔',
    videoTutorial: {
      title: 'Writesonic سے 2000 الفاظ کا ایس ای او آرٹیکل لکھیں',
      duration: '13:50 منٹ',
      instructorUrdu: 'فہد علی (ایس ای او مینیجر)',
      views: '17,600 ویوز',
      stepsUrdu: ['کی ورڈ ریسرچ انٹیگریشن', 'آرٹیکل رائٹر 5.0 استعمال کرنا', 'ایکسپورٹ ٹو ورڈپریس', 'پلیجیرزم چیک']
    },
    toolUrl: 'https://writesonic.com'
  },
  {
    id: 'tool-write-8',
    name: 'Rytr Urdu',
    urduName: 'رائٹر بجٹ ٹول',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'مفت (10,000 حروف) / PKR 2,500 لامحدود',
    isFree: true,
    rating: 4.5,
    usersCount: '40K+ پاکستانی',
    taglineUrdu: 'سب سے سستا اور پاکٹ فرینڈلی AI رائٹر',
    descriptionUrdu: 'پاکستانی طلباء اور نئے فری لانسرز کے لیے کم خرچ پر 40 سے زیادہ ٹائپ کی تحریریں لکھتا ہے۔',
    promptTemplate: 'موبائل ریپئرنگ شاپ کے لیے ایک پرکشش ایس ایم ایس مارکیٹنگ میسج بنائیں جو کم الفاظ میں 20% رعایت اور مفت اسکرین گارڈ کا پیغام دے۔',
    videoTutorial: {
      title: 'Rytr کا مکمل فری ٹیوٹوریل اور اردو سیٹنگز',
      duration: '10:00 منٹ',
      instructorUrdu: 'ندیم اشرف (فیصل آباد)',
      views: '23,100 ویوز',
      stepsUrdu: ['زبان اور ٹون منتخب کرنا', 'یوز کیس کا انتخاب', 'اؤٹ پٹ کی مقدار طے کرنا', 'شارٹ کٹ کمانڈز']
    },
    toolUrl: 'https://rytr.me'
  },
  {
    id: 'tool-write-9',
    name: 'Sudowrite',
    urduName: 'سوڈو رائٹ برائے ناول و افسانہ',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'PKR 2,800 / ماہ (مفت ٹرائل دستیاب)',
    isFree: false,
    rating: 4.7,
    usersCount: '15K+ پاکستانی',
    taglineUrdu: 'کہانی نویسوں، ڈرامہ نگاروں اور ناول نگاروں کا ساتھی',
    descriptionUrdu: 'اردو فکشن، کردار سازی اور کہانی کے موڑ (Plot Twists) ترتیب دینے میں مددگار۔',
    promptTemplate: 'ایک سسپنس تھرلر کہانی کا پلاٹ تیار کریں جس میں ایک نجی سراغ رساں پرانی لاہور کی گلیوں میں گمشدہ قدیم قلم کی تلاش کرتا ہے۔ کرداروں کے مابین سسپنس ڈائیلاگ شامل کریں۔',
    videoTutorial: {
      title: 'AI سے اردو کہانیاں اور ڈرامہ اسکرپٹ لکھنے کا فارمولا',
      duration: '16:45 منٹ',
      instructorUrdu: 'شعیب اختر (فکشن رائٹر)',
      views: '14,200 ویوز',
      stepsUrdu: ['کردار کا تعارف کروانا', 'برین اسٹورم فیچر', 'ڈائیلاگ ایکسپینشن', 'کہانی کا کلائمیکس سنوارنا']
    },
    toolUrl: 'https://sudowrite.com'
  },
  {
    id: 'tool-write-10',
    name: 'Notion AI (Urdu Docs)',
    urduName: 'نووشن اے آئی نوٹس',
    categoryId: 'writing',
    categoryUrdu: 'لکھائی',
    pricePKR: 'PKR 2,800 / ماہ',
    isFree: false,
    rating: 4.8,
    usersCount: '52K+ پاکستانی',
    taglineUrdu: 'دفتر اور اسٹڈی نوٹس کی خودکار ترتیب اور سمرائزیشن',
    descriptionUrdu: 'ایک ہی پیج پر میٹنگ نوٹس، ٹاسک لسٹ اور ریسرچ سمری اردو میں تخلیق کرتا ہے۔',
    promptTemplate: 'اس پروجیکٹ میٹنگ کے مندرجہ ذیل نوٹس کو اردو میں سمرائز کریں اور کلیدی ایکشن آئٹمز بلٹ پوائنٹس میں واضح کریں: [میٹنگ نوٹس]',
    videoTutorial: {
      title: 'Notion AI سے روزمرہ کا کام 10 گنا تیز کیسے کریں',
      duration: '12:30 منٹ',
      instructorUrdu: 'عاطف منیر (پروجیکٹ مینیجر)',
      views: '38,000 ویوز',
      stepsUrdu: ['اسپیس بار دبا کر AI بلانا', 'ٹیبل ڈیٹا تجزیہ', 'سمری اور ٹو ڈو لسٹ خودکار بنانا', 'ٹیم کے ساتھ شیئرنگ']
    },
    toolUrl: 'https://notion.so'
  },

  // 2. تصویر (Image) - 10 Tools
  {
    id: 'tool-img-1',
    name: 'Midjourney v6.1',
    urduName: 'مڈجرنی v6.1',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'PKR 2,800 / ماہ',
    isFree: false,
    rating: 5.0,
    usersCount: '95K+ پاکستانی',
    taglineUrdu: 'دنیا کا سب سے حیرت انگیز اور حقیقت پسندانہ AI آرٹ میکر',
    descriptionUrdu: 'سینیمیٹک تصویریں، برانڈ لوگوز اور پورٹریٹس کے لیے سب سے بہترین ٹول۔',
    badgeUrdu: 'ٹاپ ریٹڈ',
    promptTemplate: '/imagine prompt: An ultra-realistic cinematic portrait of a Pakistani truck artist painting vibrant floral patterns in Lahore, warm golden hour sunbeams, Hasselblad 8k detail, photorealistic texture --ar 16:9 --v 6.1',
    videoTutorial: {
      title: 'Midjourney ڈسکارڈ پر استعمال کرنے کی مکمل اردو گائیڈ',
      duration: '21:10 منٹ',
      instructorUrdu: 'بلال گرافکس (یوٹیوبر، راولپنڈی)',
      views: '88,400 ویوز',
      stepsUrdu: ['ڈسکارڈ پر جوائن اور لاگ ان', 'پرامپٹ لکھنے کے سنہری فارمولے', 'اسپیکٹ ریشو اور پیرامیٹرز', 'ہائی ریزولوشن ڈاؤنلوڈ']
    },
    toolUrl: 'https://midjourney.com'
  },
  {
    id: 'tool-img-2',
    name: 'DALL·E 3 (via ChatGPT)',
    urduName: 'ڈال ای 3',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (بنیادی) / PKR 5,600 پلس',
    isFree: true,
    rating: 4.8,
    usersCount: '110K+ پاکستانی',
    taglineUrdu: 'اردو پرامپٹ سمجھ کر درست ٹیکسٹ والی تصویر بنانے والا',
    descriptionUrdu: 'اوپن اے آئی کا ماڈل جو نہ صرف تصویریں بناتا ہے بلکہ تصویر کے اندر انگریزی الفاظ بھی درست لکھتا ہے۔',
    promptTemplate: 'A modern minimalist vector logo for a Pakistani tech startup named "PakAI", featuring a stylized falcon blended with circuit board lines, green and emerald color palette, white clean background.',
    videoTutorial: {
      title: 'DALL-E 3 سے کلائنٹس کے لیے لوگو اور سوشل میڈیا پوسٹس بنانا',
      duration: '11:40 منٹ',
      instructorUrdu: 'ثنا جاوید (UI ڈیزائنر)',
      views: '42,100 ویوز',
      stepsUrdu: ['چیٹ جی پی ٹی میں امیج موڈ کھولنا', 'تصویر کے مخصوص حصے کو ان پینٹنگ سے بدلنا', 'کلر پیلیٹ کنٹرول', 'فائنل فائل ایکسپورٹ']
    },
    toolUrl: 'https://openai.com/dall-e-3'
  },
  {
    id: 'tool-img-3',
    name: 'Leonardo.Ai',
    urduName: 'لیونارڈو اے آئی',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (روزانہ 150 ٹوکنز) / PKR 2,800 پرو',
    isFree: true,
    rating: 4.9,
    usersCount: '78K+ پاکستانی',
    taglineUrdu: 'روزانہ 150 مفت امیجز اور کسٹم ماڈلز',
    descriptionUrdu: 'پاکستانی گیم ڈیزائنرز اور گرافک آرٹسٹس کے لیے فری کریڈٹس کے ساتھ پرفیکٹ انتخاب۔',
    badgeUrdu: 'فری کریڈٹ',
    promptTemplate: 'A 3D Pixar-style cute Pakistani boy student wearing a school uniform and green backpack, sitting at a study table with open books, soft warm lighting, 8k render.',
    videoTutorial: {
      title: 'Leonardo AI کا مفت اکاؤنٹ بنا کر روزانہ 50 تصاویر بنائیں',
      duration: '15:20 منٹ',
      instructorUrdu: 'کاشف علی (گرافک ڈیزائنر)',
      views: '54,300 ویوز',
      stepsUrdu: ['مفت ٹوکن سسٹم کو سمجھنا', 'Alchemy اور Photoreal موڈ آن کرنا', 'نیگیٹو پرامپٹ شامل کرنا', 'بیک گراؤنڈ ریموور']
    },
    toolUrl: 'https://leonardo.ai'
  },
  {
    id: 'tool-img-4',
    name: 'Adobe Firefly',
    urduName: 'ایڈوبی فائر فلائی',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (25 کریڈٹس) / PKR 1,400 ماہانہ',
    isFree: true,
    rating: 4.7,
    usersCount: '50K+ پاکستانی',
    taglineUrdu: 'فوٹو شاپ میں کمال کا جنریٹو فل اور تجارتی تحفظ',
    descriptionUrdu: 'تصویر میں کوئی بھی چیز ہٹائیں، شامل کریں یا پس منظر سیکنڈوں میں تبدیل کریں۔',
    promptTemplate: 'A flat lay commercial product photograph of a luxury herbal hair oil glass bottle surrounded by fresh green mint leaves and almonds, studio softbox lighting.',
    videoTutorial: {
      title: 'Photoshop Generative Fill کا استعمال بغیر کسی غلطی کے',
      duration: '13:00 منٹ',
      instructorUrdu: 'ارسلان غوری (ایڈوبی سرٹیفائیڈ)',
      views: '37,200 ویوز',
      stepsUrdu: ['سلیکشن ٹول سے ایریا سلیکٹ کرنا', 'پرامپٹ دے کر چیز شامل کرنا', 'روشنی اور پرسپیکٹیو میچ کرنا', 'کمرشل استعمال کے اصول']
    },
    toolUrl: 'https://firefly.adobe.com'
  },
  {
    id: 'tool-img-5',
    name: 'Flux.1 (Black Forest Labs)',
    urduName: 'فلکس 1 اوپن سورس',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: '100% مفت (آن لائن ٹیسٹنگ)',
    isFree: true,
    rating: 4.9,
    usersCount: '40K+ پاکستانی',
    taglineUrdu: 'اوپن سورس کی دنیا کا سب سے حقیقت پسند ماڈل',
    descriptionUrdu: 'انسانی ہاتھ اور چہرے کی باریکیوں میں مڈجرنی کو بھی مات دینے والا نیا لیڈر۔',
    promptTemplate: 'A close-up shot of hands typing on an illuminated MacBook keyboard in a cozy Karachi cafe with steaming chai in a traditional glass cup, atmospheric bokeh.',
    videoTutorial: {
      title: 'Flux.1 مفت میں بغیر مہنگے جی پی یو کے کیسے چلائیں',
      duration: '18:30 منٹ',
      instructorUrdu: 'عمر فاروق (AI ریسرچر)',
      views: '29,800 ویوز',
      stepsUrdu: ['Hugging Face اور Fal.ai پر ٹیسٹ کرنا', 'پرامپٹ تفاصیل لکھنا', 'LoRA ماڈلز شامل کرنا', 'ہائی اسکیلنگ']
    },
    toolUrl: 'https://blackforestlabs.ai'
  },
  {
    id: 'tool-img-6',
    name: 'Stable Diffusion XL',
    urduName: 'اسٹیبل ڈفیوژن ایکس ایل',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (اوپن سورس) / PKR 2,000 کلاؤڈ',
    isFree: true,
    rating: 4.6,
    usersCount: '60K+ پاکستانی',
    taglineUrdu: 'اپنے کمپیوٹر پر آف لائن بغیر انٹرنیٹ تصویریں بنائیں',
    descriptionUrdu: 'پرائیویسی اور لامحدود تصاویر کے لیے موزوں اوپن سورس سسٹم۔',
    promptTemplate: 'Masterpiece, realistic architecture of Faisal Mosque Islamabad at sunset with dramatic purple skies, reflecting marble pool, ultra wide angle lens.',
    videoTutorial: {
      title: 'Stable Diffusion اپنے لیپ ٹاپ پر مفت انسٹال کرنے کا مکمل طریقہ',
      duration: '24:00 منٹ',
      instructorUrdu: 'دانش صدیقی',
      views: '48,600 ویوز',
      stepsUrdu: ['Automatic1111 ویب یو آئی انسٹالیشن', 'ماڈل چیک پوائنٹ ڈاؤنلوڈ', 'کنٹرول نیٹ کی سیٹنگز', 'ریزولوشن بڑھانا']
    },
    toolUrl: 'https://stability.ai'
  },
  {
    id: 'tool-img-7',
    name: 'Freepik Pikaso',
    urduName: 'فری پک پکاسو',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (روزانہ لمٹ) / PKR 2,500 پریمیم',
    isFree: true,
    rating: 4.5,
    usersCount: '35K+ پاکستانی',
    taglineUrdu: 'لائیو اسکیچ ڈرائنگ کو لمحوں میں 4K تصویر میں بدلیں',
    descriptionUrdu: 'آپ ماؤس سے معمولی خاکہ کھینچیں اور AI اسے جادوئی شاہکار میں تبدیل کر دیتا ہے۔',
    promptTemplate: 'Turn this simple sketch into a modern minimalist villa house with swimming pool, green lawn, palm trees and sunny blue sky.',
    videoTutorial: {
      title: 'Freepik کے لائیو AI سے 30 سیکنڈ میں ڈیزائن بنانا',
      duration: '08:45 منٹ',
      instructorUrdu: 'زینب خان (لاہور)',
      views: '19,300 ویوز',
      stepsUrdu: ['کینوس پر برش سے ڈرا کرنا', 'پرامپٹ اسٹرینتھ بڑھانا', 'ریئل ٹائم رینڈرنگ', 'ایچ ڈی سیو کرنا']
    },
    toolUrl: 'https://freepik.com/pikaso'
  },
  {
    id: 'tool-img-8',
    name: 'Recraft.ai',
    urduName: 'ری کرافٹ ویکٹر AI',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (بنیادی) / PKR 2,800 ماہانہ',
    isFree: true,
    rating: 4.8,
    usersCount: '30K+ پاکستانی',
    taglineUrdu: 'ڈیزائنرز کے لیے اصل ویکٹر (SVG) اور آئیکونز بنانے والا',
    descriptionUrdu: 'السٹریٹر کی طرح اسکیل ہونے والے ویکٹرز اور برانڈنگ گرافکس سیکنڈوں میں بناتا ہے۔',
    promptTemplate: 'Vector flat illustration of a delivery boy on a motorbike in Pakistan wearing helmet with parcel box, crisp outlines, isolated on white background, SVG format.',
    videoTutorial: {
      title: 'Recraft.ai سے SVG ویکٹر بنا کر فری پک پر بیچیں',
      duration: '16:15 منٹ',
      instructorUrdu: 'نوید حسن',
      views: '26,700 ویوز',
      stepsUrdu: ['ویکٹر اسٹائل سیلیکشن', 'SVG فائل ایکسپورٹ', 'کلرز کی کسٹمائزیشن', 'اسٹاک مارکیٹ میں اپلوڈ']
    },
    toolUrl: 'https://recraft.ai'
  },
  {
    id: 'tool-img-9',
    name: 'PhotoRoom Urdu',
    urduName: 'فوٹو روم پروڈکٹ کٹ آؤٹ',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (بنیادی) / PKR 1,900 ماہانہ',
    isFree: true,
    rating: 4.7,
    usersCount: '70K+ پاکستانی',
    taglineUrdu: 'دراز اور ای کامرس پروڈکٹ فوٹو شوٹ بیک گراؤنڈ',
    descriptionUrdu: 'موبائل سے مصنوعات کی تصویر لیں، یہ بیک گراؤنڈ مٹا کر اسٹوڈیو ماڈل بنا دیتا ہے۔',
    promptTemplate: 'Place this bottle on a polished white marble kitchen countertop next to morning sunlight and sliced lemons.',
    videoTutorial: {
      title: 'دراز کے لیے موبائل سے اسٹوڈیو کوالٹی پروڈکٹ تصویریں کیسے بنائیں',
      duration: '09:20 منٹ',
      instructorUrdu: 'وقار یونس (ای کامرس اسٹور اونر)',
      views: '51,400 ویوز',
      stepsUrdu: ['موبائل کیمرہ سے فوٹو لینا', 'ایک کلک بیک گراؤنڈ ریموو', 'AI اسٹوڈیو لائٹنگ ایڈ کرنا', 'دراز سائز میں محفوظ کرنا']
    },
    toolUrl: 'https://photoroom.com'
  },
  {
    id: 'tool-img-10',
    name: 'Ideogram 2.0',
    urduName: 'آئیڈیوگرام 2.0',
    categoryId: 'image',
    categoryUrdu: 'تصویر',
    pricePKR: 'مفت (روزانہ 25 پرامپٹ) / PKR 2,200 پرو',
    isFree: true,
    rating: 4.9,
    usersCount: '58K+ پاکستانی',
    taglineUrdu: 'ٹی شرٹ اور پوسٹرز پر بالکل درست انگلش و ٹیکسٹ پرنٹنگ',
    descriptionUrdu: 'ٹائپوگرافی کا چیمپئن جو بالکل صاف ستھرے الفاظ تصویر کے بیچ میں ڈیزائن کرتا ہے۔',
    promptTemplate: 'A trendy typography t-shirt design with bold stylized text "LAHORE DI JAAN", truck art filigree borders, dark navy blue background, vintage distressed screen print aesthetic.',
    videoTutorial: {
      title: 'Ideogram سے پرنٹ آن ڈیمانڈ ٹی شرٹ ڈیزائن بنا کر کمانا',
      duration: '14:10 منٹ',
      instructorUrdu: 'فاروق اعظم',
      views: '33,900 ویوز',
      stepsUrdu: ['ٹیکسٹ پرامپٹ کوٹیشنز میں لکھنا', 'ٹائپوگرافی اسٹائل چننا', 'پرنٹ ریڈی فائل بنانا', 'ٹی اسپرنگ اور شاپائفائی پر اپلوڈ']
    },
    toolUrl: 'https://ideogram.ai'
  },

  // 3. ویڈیو (Video) - 10 Tools
  {
    id: 'tool-vid-1',
    name: 'Runway Gen-3 Alpha',
    urduName: 'رن وے جین-3 ویڈیوز',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'PKR 4,200 / ماہ (مفت ٹرائل دستیاب)',
    isFree: false,
    rating: 4.9,
    usersCount: '48K+ پاکستانی',
    taglineUrdu: 'ہالی ووڈ کوالٹی کی سنیمیٹک ویڈیوز محض تحریر سے بنائیں',
    descriptionUrdu: 'دنیا کا سب سے جدید ٹیکسٹ ٹو ویڈیو ماڈل جو 4K کیمرہ موومنٹ کے ساتھ ویڈیوز رینڈر کرتا ہے۔',
    badgeUrdu: 'ہالی ووڈ کوالٹی',
    promptTemplate: 'Cinematic drone shot flying over snow-covered mountains of Hunza valley at sunrise, mist in the valley, sunlight hitting peaks, 4k ultra-high definition, photorealistic video.',
    videoTutorial: {
      title: 'Runway Gen-3 سے فلمی ویڈیوز بنانے کا مکمل پاکستانی کورس',
      duration: '19:40 منٹ',
      instructorUrdu: 'کامران علی (فلم میکر، لاہور)',
      views: '41,300 ویوز',
      stepsUrdu: ['کیمرہ موشن کنٹرولز استعمال کرنا', 'موشن برش سے اشیاء کو حرکت دینا', 'ویڈیو سے ویڈیو اسٹائل تبدیل کرنا', 'سوشل میڈیا اسپیکٹ ریشو']
    },
    toolUrl: 'https://runwayml.com'
  },
  {
    id: 'tool-vid-2',
    name: 'Luma Dream Machine',
    urduName: 'لوما ڈریم مشین',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (30 جنریشنز/ماہ) / PKR 8,500 پرو',
    isFree: true,
    rating: 4.8,
    usersCount: '62K+ پاکستانی',
    taglineUrdu: 'مفت ویڈیو جنریشن اور حقیقت پسند فزکس اینیمیشن',
    descriptionUrdu: 'تصویر اپلوڈ کریں اور یہ اس میں حقیقت جیسی جان ڈال کر کیمرہ پین گھماتا ہے۔',
    badgeUrdu: 'مفت دستیاب',
    promptTemplate: 'Smooth camera dolly zoom in on an old book opening on a wooden study table, pages flipping magically with soft glowing particles, cozy library background.',
    videoTutorial: {
      title: 'Luma Dream Machine سے مفت میں یوٹیوب شارٹس بنائیں',
      duration: '13:15 منٹ',
      instructorUrdu: 'ارسلان ملک',
      views: '57,200 ویوز',
      stepsUrdu: ['تصویر سے ویڈیو بنانا (Image-to-Video)', 'کیمرہ اینگلز ایڈجسٹ کرنا', 'لوپنگ ویڈیو بنانا', 'آڈیو مکسنگ']
    },
    toolUrl: 'https://lumalabs.ai/dream-machine'
  },
  {
    id: 'tool-vid-3',
    name: 'HeyGen (Urdu Avatars)',
    urduName: 'ہے جین ڈیجیٹل اوتار',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'PKR 8,200 / ماہ (مفت کریڈٹ دستیاب)',
    isFree: false,
    rating: 4.9,
    usersCount: '38K+ پاکستانی',
    taglineUrdu: 'کیمرے کے سامنے آئے بغیر ڈیجیٹل اینکر سے ویڈیو بنوائیں',
    descriptionUrdu: 'اپنا متن لکھیں، حقیقت پسند AI انسان کامل اردو لب و لہجے کے ساتھ ویڈیو بول کر بنائے گا۔',
    promptTemplate: 'السلام علیکم ناظرین! اج ہم آپ کو بتائیں گے کہ 2026 میں آرٹیفیشل انٹیلیجنس کے ذریعے اپنے کاروبار کو کس طرح دوگنا کیا جا سکتا ہے۔ آئیے شروع کرتے ہیں۔',
    videoTutorial: {
      title: 'HeyGen سے فیس لیس یوٹیوب چینل چلا کر ڈالر کمانا',
      duration: '17:50 منٹ',
      instructorUrdu: 'طارق محمود (یوٹیوبر، اسلام آباد)',
      views: '73,500 ویوز',
      stepsUrdu: ['اوتار اور لباس منتخب کرنا', 'اردو اسکرپٹ پیسٹ کرنا', 'لبوں کی ہم آہنگی (Lip Sync) چیک کرنا', 'فل ایچ ڈی ویڈیو ڈاؤنلوڈ']
    },
    toolUrl: 'https://heygen.com'
  },
  {
    id: 'tool-vid-4',
    name: 'CapCut AI Features',
    urduName: 'کیپ کٹ اے آئی ویڈیو',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (اکثر فیچرز) / PKR 2,200 پرو',
    isFree: true,
    rating: 5.0,
    usersCount: '250K+ پاکستانی',
    taglineUrdu: 'پاکستانی ٹک ٹاک اور ریلز بنانے والوں کا نمبر 1 ٹول',
    descriptionUrdu: 'خودکار کیپشنز، بیک گراؤنڈ ریموول، اسمارٹ ٹرانزیشنز اور وائس ایفیکٹس۔',
    promptTemplate: 'Automatically generate animated colored captions, zoom in on key words, remove background noise and add subtle trending sound effects.',
    videoTutorial: {
      title: 'CapCut کے تمام AI فیچرز موبائل اور پی سی پر سیکھیں',
      duration: '22:15 منٹ',
      instructorUrdu: 'حماد احمد (ریلز ایکسپرٹ)',
      views: '112,000 ویوز',
      stepsUrdu: ['آٹو کیپشنز ان اردو/انگلش', 'اسمارٹ کٹ آؤٹ', 'بی رول اینیمیشن ایڈ کرنا', 'وائرل ریلز ایکسپورٹ سیٹنگز']
    },
    toolUrl: 'https://capcut.com'
  },
  {
    id: 'tool-vid-5',
    name: 'Kling AI',
    urduName: 'کلنگ اے آئی ویڈیو',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (روزانہ کریڈٹس) / PKR 3,000 پرو',
    isFree: true,
    rating: 4.8,
    usersCount: '45K+ پاکستانی',
    taglineUrdu: 'طویل 10 سیکنڈ کی شاندار موشن ویڈیوز اور کردار حرکت',
    descriptionUrdu: 'چہرے کے تاثرات اور حقیقی جسمانی حرکات رینڈر کرنے میں لاجواب۔',
    promptTemplate: 'A Pakistani chef expertly tossing biryani rice with aromatic saffron steam rising in slow motion inside a bustling food street, ultra detailed, cinematic 60fps.',
    videoTutorial: {
      title: 'Kling AI کا روزانہ فری لاگ ان اور پرامپٹ تکنیک',
      duration: '14:20 منٹ',
      instructorUrdu: 'سہیل اختر',
      views: '31,000 ویوز',
      stepsUrdu: ['اکاؤنٹ تصدیق اور کریڈٹس', 'پرامپٹ اسٹرکچر', 'موومنٹ اسپیڈ سیٹنگز', 'ایچ ڈی رینڈرنگ']
    },
    toolUrl: 'https://klingai.com'
  },
  {
    id: 'tool-vid-6',
    name: 'InVideo AI',
    urduName: 'ان ویڈیو آٹو اسکرپٹ ٹو ویڈیو',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (واٹر مارک) / PKR 5,500 ماہانہ',
    isFree: true,
    rating: 4.6,
    usersCount: '55K+ پاکستانی',
    taglineUrdu: 'صرف 1 لائن لکھیں، مکمل یوٹیوب ویڈیو مع وائس اوور تیار',
    descriptionUrdu: 'خودکار اسٹاک فوٹیج، پس منظر موسیقی اور اسکرپٹ جوڑ کر پوری ویڈیو تیار کر دیتا ہے۔',
    promptTemplate: 'Create a 60-second YouTube Short about "Top 5 Artificial Intelligence tools changing Pakistan in 2026", energetic pacing, professional voiceover, and high energy music.',
    videoTutorial: {
      title: 'InVideo AI سے بغیر محنت 1 منٹ میں یوٹیوب ویڈیو بنائیں',
      duration: '15:10 منٹ',
      instructorUrdu: 'جواد رضا',
      views: '46,800 ویوز',
      stepsUrdu: ['ٹاپک ٹائپ کرنا', 'آڈینس اور پلیٹ فارم چننا', 'ویڈیو کے کلپس تبدیل کرنا', 'اردو سب ٹائٹلز شامل کرنا']
    },
    toolUrl: 'https://invideo.io'
  },
  {
    id: 'tool-vid-7',
    name: 'Pika 1.0',
    urduName: 'پائیکا اینیمیشن',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (بنیادی کریڈٹ) / PKR 2,800 پرو',
    isFree: true,
    rating: 4.6,
    usersCount: '33K+ پاکستانی',
    taglineUrdu: '3D کارٹون اور فنی اینیمیشنز کے لیے بہترین',
    descriptionUrdu: 'ویڈیو کے مخصوص ایریا کو ایڈٹ کرنے، کپڑے بدلنے اور اشیاء کو حرکت دینے میں ماہر۔',
    promptTemplate: 'Animate this character blinking, looking around surprised, with a gentle breeze blowing through hair, Disney Pixar 3D animation style.',
    videoTutorial: {
      title: 'Pika Labs سے 3D اینیمیشن کارٹونز بنانا',
      duration: '11:45 منٹ',
      instructorUrdu: 'عمیر شفیق',
      views: '24,300 ویوز',
      stepsUrdu: ['Modify Region ٹول کا استعمال', 'لپ سنکنگ شامل کرنا', 'فریم ریٹ کنٹرول', 'فائنل رینڈر']
    },
    toolUrl: 'https://pika.art'
  },
  {
    id: 'tool-vid-8',
    name: 'Opus Clip',
    urduName: 'اوپس کلپ ریلز جنریٹر',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (90 منٹ) / PKR 3,800 ماہانہ',
    isFree: true,
    rating: 4.9,
    usersCount: '70K+ پاکستانی',
    taglineUrdu: '1 گھنٹے کی طویل ویڈیو سے 10 وائرل ریلز خودکار کاٹیں',
    descriptionUrdu: 'پوڈکاسٹ اور انٹرویوز کے سب سے دلچسپ لمحات ڈھونڈ کر وائرل اسکور کے ساتھ پیش کرتا ہے۔',
    promptTemplate: 'Extract the top 3 most engaging moments from this long video, add dynamic colorful hook titles, center the active speaker, and generate 9:16 viral clips.',
    videoTutorial: {
      title: 'ایک طویل پوڈکاسٹ سے 10 منٹ میں 15 وائرل شارٹس نکالیں',
      duration: '16:00 منٹ',
      instructorUrdu: 'عابد علی (سوشل میڈیا اسٹریٹجسٹ)',
      views: '63,000 ویوز',
      stepsUrdu: ['یوٹیوب لنک پیسٹ کرنا', 'AI وائرل اسکور دیکھنا', 'کیپشن اینیمیشن کسٹمائز کرنا', 'ٹک ٹاک پر شیڈول کرنا']
    },
    toolUrl: 'https://opus.pro'
  },
  {
    id: 'tool-vid-9',
    name: 'Vids (Google Workspace)',
    urduName: 'گوگل وڈز برائے پریزنٹیشن',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'گوگل ورک اسپیس کے ساتھ شامل',
    isFree: false,
    rating: 4.5,
    usersCount: '22K+ پاکستانی',
    taglineUrdu: 'آفس اور کارپوریٹ میٹنگز کی خودکار ویڈیو ڈاکومنٹیشن',
    descriptionUrdu: 'گوگل ڈرائیو اور ڈاکس سے منسلک، دفتری پریزنٹیشن ویڈیوز پلک جھپکتے میں تیار۔',
    promptTemplate: 'Create an internal company training video explaining new remote working safety protocols, using professional icons and corporate narration style.',
    videoTutorial: {
      title: 'Google Vids سے بزنس ٹریننگ ویڈیوز بنانے کا طریقہ',
      duration: '12:10 منٹ',
      instructorUrdu: 'سیدہ نور',
      views: '15,800 ویوز',
      stepsUrdu: ['گوگل ورک اسپیس میں وڈز لانچ کرنا', 'ٹیمپلیٹ سلیکٹ کرنا', 'وائس اوور آٹو میچنگ', 'ٹیم کے ساتھ شیئرنگ']
    },
    toolUrl: 'https://workspace.google.com/products/vids/'
  },
  {
    id: 'tool-vid-10',
    name: 'Submagic',
    urduName: 'سب میجک آٹو کیپشنز',
    categoryId: 'video',
    categoryUrdu: 'ویڈیو',
    pricePKR: 'مفت (3 ویڈیوز) / PKR 4,200 پرو',
    isFree: true,
    rating: 4.8,
    usersCount: '41K+ پاکستانی',
    taglineUrdu: 'الیکس ہرموزی اسٹائل میں ایموجیز والے پُرجوش کیپشنز',
    descriptionUrdu: 'بولے جانے والے ہر لفظ پر رنگین روشنی، اینیمیٹڈ ایموجیز اور صوتی اثرات شامل کرتا ہے۔',
    promptTemplate: 'Add Hormozi-style glowing captions with matching emojis on keywords, automatic b-roll overlays, and subtle whoosh transitions.',
    videoTutorial: {
      title: 'Submagic سے ٹک ٹاک ویڈیوز کی ریٹینشن اور ویوز 3 گنا بڑھائیں',
      duration: '10:35 منٹ',
      instructorUrdu: 'وقاص ملک',
      views: '39,100 ویوز',
      stepsUrdu: ['ویڈیو اپلوڈ کرنا', 'اردو/انگریزی زبان کی پہچان', 'ایموجیز اور کلر اسٹائل منتخب کرنا', 'فاسٹ رینڈرنگ']
    },
    toolUrl: 'https://submagic.co'
  },

  // 4. آواز (Voice) - 10 Tools
  {
    id: 'tool-vox-1',
    name: 'ElevenLabs Urdu Voice',
    urduName: 'الیون لیبز اردو وائس اوور',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت (10,000 حروف) / PKR 1,400 پرو',
    isFree: true,
    rating: 5.0,
    usersCount: '92K+ پاکستانی',
    taglineUrdu: '100% انسان جیسی جذباتی اردو اور انگریزی آوازیں',
    descriptionUrdu: 'سانس لینے اور جملوں کے ٹھہراؤ کے ساتھ مکمل قدرتی صوتی تاثرات۔ اپنی آواز بھی کلون کریں۔',
    badgeUrdu: 'دنیا کی بہترین آواز',
    promptTemplate: 'محترم سامعین! زندگی میں کامیابی کا راستہ کبھی بھی آسان نہیں ہوتا، مگر جو لوگ محنت کو اپنا شعار بنا لیتے ہیں، منزلیں خود ان کے قدم چومتی ہیں۔',
    videoTutorial: {
      title: 'ElevenLabs میں اپنی آواز کلون کرنے اور اردو بولوانے کا راز',
      duration: '18:40 منٹ',
      instructorUrdu: 'رضوان الحق (وائس اوور آرٹسٹ، ریڈیو پاکستان)',
      views: '79,300 ویوز',
      stepsUrdu: ['اردو فونٹ اور تلفظ کی درستگی', 'وائس ڈیزائنر سے نئی آواز بنانا', 'آواز کلوننگ کے لیے 1 منٹ ریکارڈنگ', 'ہائی کوالٹی MP3 ڈاؤنلوڈ']
    },
    toolUrl: 'https://elevenlabs.io'
  },
  {
    id: 'tool-vox-2',
    name: 'Murf.ai',
    urduName: 'مرف اسٹوڈیو',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت ٹرائل / PKR 5,400 ماہانہ',
    isFree: true,
    rating: 4.7,
    usersCount: '34K+ پاکستانی',
    taglineUrdu: 'پیشہ ورانہ کارپوریٹ پریزنٹیشن اور لرننگ ماڈیولز',
    descriptionUrdu: 'آواز کی پچ، رفتار اور زور کو اپنی مرضی سے ایڈجسٹ کرنے کا مکمل اسٹوڈیو۔',
    promptTemplate: 'Welcome to the annual performance review of 2026. Today, we will discuss our strategic milestones and customer retention figures.',
    videoTutorial: {
      title: 'Murf.ai سے ای لرننگ کورسز کے لیے پروفیشنل آڈیو بنائیں',
      duration: '14:15 منٹ',
      instructorUrdu: 'ناہید اختر',
      views: '21,500 ویوز',
      stepsUrdu: ['صوتی پچ اور والیم سلائیڈرز', 'پس منظر موسیقی سنک کرنا', 'پاز اور ٹھہراؤ شامل کرنا', 'کمرشل لائسنس']
    },
    toolUrl: 'https://murf.ai'
  },
  {
    id: 'tool-vox-3',
    name: 'Adobe Podcast AI',
    urduName: 'ایڈوبی پوڈکاسٹ اسٹوڈیو',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: '100% مفت (بنیادی ان ہانس)',
    isFree: true,
    rating: 4.9,
    usersCount: '130K+ پاکستانی',
    taglineUrdu: 'خراب موبائل ریکارڈنگ کو 1 سیکنڈ میں ریڈیو اسٹوڈیو مائیک بنائیں',
    descriptionUrdu: 'پنکھے، گلی کی گاڑیوں اور کمرے کی گونج (Echo) کو پلک جھپکتے ہی غائب کر دیتا ہے۔',
    badgeUrdu: '100% مفت جادو',
    promptTemplate: 'Enhance Speech: Upload noisy voice note recorded in traffic and remove 100% background rumble while boosting vocal clarity.',
    videoTutorial: {
      title: 'سستے موبائل مائیک سے 50 ہزار والے اسٹوڈیو جیسی آواز بنائیں',
      duration: '07:50 منٹ',
      instructorUrdu: 'طاہر کمال (پوڈکاسٹ ہوسٹ)',
      views: '145,000 ویوز',
      stepsUrdu: ['آڈیو فائل اپلوڈ کرنا', 'ان ہانس اسپیچ سلائیڈر ایڈجسٹ کرنا', 'مائیک ڈسٹنس ٹیسٹ', 'فری فائل سیو کرنا']
    },
    toolUrl: 'https://podcast.adobe.com/enhance'
  },
  {
    id: 'tool-vox-4',
    name: 'Lovo.ai (Genny)',
    urduName: 'لووو جینی وائس',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت ٹرائل / PKR 4,000 ماہانہ',
    isFree: true,
    rating: 4.6,
    usersCount: '27K+ پاکستانی',
    taglineUrdu: '500 سے زائد مختلف عمروں اور لہجوں والی آوازیں',
    descriptionUrdu: 'بچوں، بوڑھوں اور نوجوان کرداروں کی آوازیں گیمز اور کارٹونز کے لیے۔',
    promptTemplate: 'A cheerful, energetic young boy voice narrating an adventurous fairy tale in the northern woods of Swat.',
    videoTutorial: {
      title: 'Lovo AI سے کارٹون اور اینیمیشن ویڈیوز کی ڈبنگ کریں',
      duration: '12:30 منٹ',
      instructorUrdu: 'سعدیہ پروین',
      views: '18,700 ویوز',
      stepsUrdu: ['کرداروں کی آوازیں منتخب کرنا', 'ٹائم لائن پر ساؤنڈ سنکنگ', 'جذبات (خوشی، غصہ، خوف) سیٹ کرنا', 'ایکسپورٹ']
    },
    toolUrl: 'https://lovo.ai'
  },
  {
    id: 'tool-vox-5',
    name: 'Speechify Urdu',
    urduName: 'اسپیچی فائی ٹیکسٹ ٹو اسپیچ',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت (بنیادی) / PKR 3,800 ماہانہ',
    isFree: true,
    rating: 4.7,
    usersCount: '49K+ پاکستانی',
    taglineUrdu: 'طویل پی ڈی ایف اور کتب کو اپنی مرضی کی رفتار پر سنیں',
    descriptionUrdu: 'طالب علموں کے لیے نعمت، جو پوری درسی کتاب کو آڈیو بک کی صورت میں پڑھ کر سناتا ہے۔',
    promptTemplate: 'Read this 50-page biology research document at 1.5x speed with natural pauses between chapter headings.',
    videoTutorial: {
      title: 'Speechify سے کتابیں پڑھنے کے بجائے سن کر وقت بچائیں',
      duration: '09:10 منٹ',
      instructorUrdu: 'علی رضا (میڈیکل اسٹوڈنٹ)',
      views: '32,400 ویوز',
      stepsUrdu: ['پی ڈی ایف اسکین کرنا', 'رفتار 1.25x یا 1.5x رکھنا', 'کروم ایکسٹینشن کا استعمال', 'بک مارکس لگانا']
    },
    toolUrl: 'https://speechify.com'
  },
  {
    id: 'tool-vox-6',
    name: 'PlayHT 2.0',
    urduName: 'پلے ایچ ٹی وائس ایجنٹس',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'PKR 8,500 / ماہ (مفت پلان دستیاب)',
    isFree: false,
    rating: 4.8,
    usersCount: '21K+ پاکستانی',
    taglineUrdu: 'ریئل ٹائم لائیو فون کالز اور کسٹمر سپورٹ وائس بوٹس',
    descriptionUrdu: 'ایسی تیز رفتار آواز جس کا رسپانس ٹائم 300 ملی سیکنڈ سے بھی کم ہے۔',
    promptTemplate: 'Generate conversational streaming voice response for automated hotel booking line in Lahore.',
    videoTutorial: {
      title: 'PlayHT سے لائیو کالنگ AI بوٹ بنانے کا تعارف',
      duration: '15:40 منٹ',
      instructorUrdu: 'شہریار خان (سافٹ ویئر آرکیٹیکٹ)',
      views: '16,200 ویوز',
      stepsUrdu: ['API کیز لینا', 'وائس ماڈل کنفیگریشن', 'ویب ساکٹ کنکشن', 'ٹیسٹ کال چلانا']
    },
    toolUrl: 'https://play.ht'
  },
  {
    id: 'tool-vox-7',
    name: 'Descript Voice Clone',
    urduName: 'ڈسکرپٹ آڈیو ایڈیٹر',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت (1 گھنٹہ) / PKR 3,400 پرو',
    isFree: true,
    rating: 4.8,
    usersCount: '39K+ پاکستانی',
    taglineUrdu: 'ٹیکسٹ ایڈٹ کر کے آڈیو میں بولا ہوا لفظ تبدیل کریں',
    descriptionUrdu: 'اگر پوڈکاسٹ میں کوئی غلط لفظ بول دیا تو اسے ٹیکسٹ میں مٹائیں، آڈیو سے خود بخود ٹھیک ہو جائے گا۔',
    promptTemplate: 'Overdub correction: Replace mistakenly said word "2024" with "2026" seamlessly matching my recorded acoustic tone.',
    videoTutorial: {
      title: 'Descript سے پوڈکاسٹ کی غلطیاں بغیر دوبارہ ریکارڈنگ کے درست کریں',
      duration: '13:50 منٹ',
      instructorUrdu: 'فیصل رحمان',
      views: '27,600 ویوز',
      stepsUrdu: ['آڈیو اپلوڈ اور آٹو ٹرانسکرپشن', 'فلر ورڈز (امم، آہا) ایک کلک میں مٹانا', 'اوور ڈب سے آواز فکس کرنا', 'ایکسپورٹ']
    },
    toolUrl: 'https://descript.com'
  },
  {
    id: 'tool-vox-8',
    name: 'VoiceMod AI',
    urduName: 'وائس موڈ لائیو چینجر',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت (بنیادی آوازیں) / PKR 1,200 تاحیات',
    isFree: true,
    rating: 4.6,
    usersCount: '65K+ پاکستانی',
    taglineUrdu: 'پب جی اور ڈسکارڈ پر گیم کھیلتے ہوئے ریئل ٹائم آواز بدلیں',
    descriptionUrdu: 'گیمرز اور اسٹریمرز کے لیے تفریح اور پرائیویسی کا بہترین ساتھی۔',
    promptTemplate: 'Switch active microphone output to deep cyborg robotic tone with subtle mechanical echo in real-time gaming chat.',
    videoTutorial: {
      title: 'PUBG اور فری فائر میں VoiceMod سے گیمنگ آوازیں نکالیں',
      duration: '11:00 منٹ',
      instructorUrdu: 'اویس گیمنگ',
      views: '84,000 ویوز',
      stepsUrdu: ['ورچوئل آڈیو ڈیوائس سیٹ اپ', 'ہاٹ کیز بائنڈ کرنا', 'ساؤنڈ بورڈ ایفیکٹس چلانا', 'ڈسکارڈ انٹیگریشن']
    },
    toolUrl: 'https://voicemod.net'
  },
  {
    id: 'tool-vox-9',
    name: 'Krisp.ai',
    urduName: 'کرسپ نوائز کینسلر',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت (60 منٹ روزانہ) / PKR 2,200 پرو',
    isFree: true,
    rating: 4.9,
    usersCount: '85K+ پاکستانی',
    taglineUrdu: 'زوم اور گوگل میٹ پر کتے کے بھونکنے اور روتے بچوں کی آواز مٹائیں',
    descriptionUrdu: 'پاکستانی ریموٹ ورکرز کے لیے ناگزیر، جو غیر ملکی کلائنٹ کے ساتھ کال میں 100% خاموشی دیتا ہے۔',
    promptTemplate: 'Cancel all canine barking, ceiling fan drone, and motorcycle exhaust noise during live client Zoom meetings.',
    videoTutorial: {
      title: 'گھر بیٹھ کر ریموٹ جاب کرنے والوں کے لیے Krisp ضروری کیوں ہے؟',
      duration: '08:20 منٹ',
      instructorUrdu: 'حارث جاوید (ریموٹ ڈیولپر)',
      views: '58,300 ویوز',
      stepsUrdu: ['کرسپ ایپ ڈاؤنلوڈ کرنا', 'زوم کی آڈیو سیٹنگ میں Krisp Mic چننا', 'کال نوٹس کا آٹو خلاصہ', 'ٹیسٹ آڈیو']
    },
    toolUrl: 'https://krisp.ai'
  },
  {
    id: 'tool-vox-10',
    name: 'Suno Voice Layer',
    urduName: 'سونو ووکل جنریٹر',
    categoryId: 'voice',
    categoryUrdu: 'آواز',
    pricePKR: 'مفت (50 کریڈٹ روزانہ) / PKR 2,800 پرو',
    isFree: true,
    rating: 4.8,
    usersCount: '47K+ پاکستانی',
    taglineUrdu: 'اپنے لکھے ہوئے گانوں اور کلام پر سر تال والا گلا تیار کریں',
    descriptionUrdu: 'اردو غزل یا ترانے کی لیرکس دیں، یہ گلوکاروں جیسے انداز میں راگ چھیڑ دیتا ہے۔',
    promptTemplate: 'Sufi soulful vocal melody, acoustic harmonium and tabla, deep devotional expressive voice singing Urdu poetry.',
    videoTutorial: {
      title: 'Suno سے اپنی لکھی ہوئی اردو غزل کا گانا کیسے بنائیں',
      duration: '14:50 منٹ',
      instructorUrdu: 'عدیل فاروق',
      views: '35,100 ویوز',
      stepsUrdu: ['لیرکس فارمیٹنگ [Verse], [Chorus]', 'میوزک اسٹائل پرامپٹ لکھنا', 'حصوں کو جوڑنا', 'آڈیو ڈاؤنلوڈ']
    },
    toolUrl: 'https://suno.com'
  }
];

// Helper to generate other 21 categories reliably so every category has exactly 10 robust tools
export function getToolsForCategory(categoryId: string): ToolItem[] {
  const existing = ALL_TOOLS.filter(t => t.categoryId === categoryId);
  if (existing.length >= 10) {
    return existing.slice(0, 10).map(enrichTool);
  }

  // Pre-configured rich tools mapping for the remaining categories
  const categoryToolConfigs: Record<string, Array<{ name: string; urdu: string; price: string; isFree: boolean; rating: number; users: string; desc: string; tagline: string; prompt: string; steps: string[] }>> = {
    'code': [
      { name: 'GitHub Copilot', urdu: 'گٹ ہب کوپائلٹ', price: 'PKR 2,800 / ماہ (طلباء کے لیے مفت)', isFree: false, rating: 4.9, users: '88K+ پاکستانی', desc: 'کوڈ لکھتے وقت اگلے پورے فنکشن کا خودکار اندازہ لگاتا ہے۔', tagline: 'پروگرامرز کا سب سے بڑا اسسٹنٹ', prompt: 'Write a full React TypeScript custom hook for fetching and caching API data with retry logic.', steps: ['VS Code میں ایکسٹینشن انسٹال کرنا', 'گٹ ہب اکاؤنٹ لنک کرنا', 'کمنٹ لکھ کر کوڈ بنوانا', 'ٹیب دبا کر کوڈ قبول کرنا'] },
      { name: 'Cursor AI Editor', urdu: 'کرسر اے آئی ایڈیٹر', price: 'مفت (بنیادی) / PKR 5,600 پرو', isFree: true, rating: 5.0, users: '65K+ پاکستانی', desc: 'پورا پروجیکٹ سمجھ کر خودکار بگ فکسنگ اور ری فیکٹرنگ کرتا ہے۔', tagline: 'جدید ترین AI کوڈنگ ایڈیٹر', prompt: 'Find and fix all memory leaks and unused dependencies across my entire repository.', steps: ['پرانے VS Code سیٹنگز امپورٹ کرنا', 'Ctrl+K اور Ctrl+L کی کمانڈز', 'پورے کوڈ بیس پر چیٹ کرنا', 'ایک کلک میں بگ فکس'] },
      { name: 'v0.dev by Vercel', urdu: 'وی زیرو بذریعہ ورسل', price: 'مفت (بنیادی کریڈٹ) / PKR 5,600 پرو', isFree: true, rating: 4.9, users: '42K+ پاکستانی', desc: 'صرف ڈسکرپشن لکھیں اور شاندار Tailwind + React UI حاصل کریں۔', tagline: 'سیکنڈوں میں جدید فرنٹ اینڈ تیار', prompt: 'Create a sleek Apple-style modern SaaS dashboard with revenue charts and customer table in Tailwind CSS.', steps: ['UI کا پرامپٹ لکھنا', 'کمپوننٹ منتخب کرنا', 'کوڈ کاپی کرنا', 'اپنے پروجیکٹ میں پیسٹ کرنا'] },
      { name: 'Replit Agent', urdu: 'ریپلٹ ایجنٹ', price: 'PKR 5,600 / ماہ', isFree: false, rating: 4.7, users: '30K+ پاکستانی', desc: 'آئیڈیا بتائیں، یہ بیک اینڈ، فرنٹ اینڈ اور ڈیٹا بیس خود بنا کر لائیو کرتا ہے۔', tagline: 'مکمل ایپ خودکار تیار کرنے والا ایجنٹ', prompt: 'Build a full stack Pakistani freelance invoice management system with SQLite and Express.', steps: ['پرامپٹ دے کر پروجیکٹ بنانا', 'خودکار پیکجز انسٹالیشن', 'لائیو پریویو ٹیسٹ کرنا', 'ایک کلک پر کلاؤڈ ڈپلائے'] },
      { name: 'Claude Sonnet Coding', urdu: 'کلاڈ کوڈنگ ایکسپرٹ', price: 'مفت / PKR 5,600 پرو', isFree: true, rating: 4.9, users: '72K+ پاکستانی', desc: 'پیچیدہ الگورتھمز اور فل اسٹیک آرکیٹیکچر کا بے مثال استاد۔', tagline: 'بغیر کیڑے کے صاف ستھرا کوڈ', prompt: 'Analyze this SQL schema and generate high-performance database indexes and optimized queries.', steps: ['کوڈ فائلز اٹیچ کرنا', 'ایرر لاگ پیسٹ کرنا', 'ری فیکٹرنگ حل مانگنا', 'یونٹ ٹیسٹ بنوانا'] },
      { name: 'Tabnine', urdu: 'ٹیب نائن پرائیویٹ AI', price: 'مفت / PKR 3,400 پرو', isFree: true, rating: 4.5, users: '26K+ پاکستانی', desc: 'پرائیویٹ کوڈ اور سیکیور ڈویلپمنٹ ٹیموں کے لیے بہترین۔', tagline: 'محفوظ کوڈ آٹو کمپلیشن', prompt: 'Complete this secure JWT authentication middleware in Node.js Express.', steps: ['ایکسٹینشن سیٹ اپ', 'لوکل ماڈل ان ایبل کرنا', 'سیفٹی رولز بنانا', 'کوڈ کمپلیشن'] },
      { name: 'Phind AI Search', urdu: 'فائنڈ سرچ برائے ڈیولپرز', price: 'مفت (لامحدود) / PKR 5,600 پرو', isFree: true, rating: 4.8, users: '38K+ پاکستانی', desc: 'اسٹیک اوور فلو کا جدید متبادل جو براہ راست کام کرنے والا کوڈ دیتا ہے۔', tagline: 'پروگرامنگ سرچ انجن', prompt: 'How to fix Next.js 15 Turbopack memory overflow during production build with Docker?', steps: ['ایرر میسج سرچ کرنا', 'تکنیکی جواب پڑھنا', 'کوڈ اسنیپٹ کاپی کرنا', 'ویریفیکیشن'] },
      { name: 'Blackbox AI', urdu: 'بلیک باکس کوڈنگ', price: 'مفت / PKR 1,900 پرو', isFree: true, rating: 4.6, users: '51K+ پاکستانی', desc: 'یوٹیوب ویڈیو اور تصویر سے کوڈ کاپی کرنے کا ماہر۔', tagline: 'ویڈیو اسکرین سے کوڈ نکالیں', prompt: 'Extract working Python OpenCV script from this code screenshot.', steps: ['ویب سائٹ کھولنا', 'کوڈ اسکرین شاٹ ڈراپ کرنا', 'کوڈ ٹیکسٹ میں بدلنا', 'رن کر کے دیکھنا'] },
      { name: 'Codeium', urdu: 'کوڈیم فری ٹول', price: '100% مفت (انفرادی استعمال)', isFree: true, rating: 4.8, users: '68K+ پاکستانی', desc: 'کوپائلٹ کا بہترین 100% مفت متبادل جس کی کوئی ماہانہ فیس نہیں۔', tagline: 'مفت اور لامحدود آٹو کمپلیشن', prompt: 'Generate unit tests for this Python FastAPI payment gateway endpoint.', steps: ['کوڈیم ایکسٹینشن لگانا', 'فری سائن اپ کرنا', '70+ زبانوں میں کوڈنگ', 'چیٹ بوٹ سے سوالات'] },
      { name: 'Bolt.new by StackBlitz', urdu: 'بولٹ ڈاٹ نیو', price: 'مفت (بنیادی) / PKR 5,600 پرو', isFree: true, rating: 4.9, users: '45K+ پاکستانی', desc: 'براؤزر میں چند لمحوں میں فل اسٹیک ویب سائٹ بنا کر لائیو چلانے والا۔', tagline: 'براؤزر میں لائیو ایپ ڈیولپمنٹ', prompt: 'Create an e-commerce dashboard in Next.js with PKR currency support and local delivery tracking.', steps: ['پرامپٹ لکھنا', 'براؤزر میں نوڈ سرور رن ہونا', 'لائیو ایپ انٹریکٹ کرنا', 'GitHub پر پش کرنا'] }
    ],
    'excel': [
      { name: 'Formula Bot', urdu: 'فارمولا بوٹ', price: 'مفت (بنیادی) / PKR 1,900 ماہانہ', isFree: true, rating: 4.9, users: '58K+ پاکستانی', desc: 'سادہ اردو یا انگلش میں بتائیں، یہ پیچیدہ ایکسل فارمولا بنا دے گا۔', tagline: 'ایکسل فارمولوں کا جادوگر', prompt: 'Generate an Excel formula that calculates 15% commission if sales exceed PKR 500,000, otherwise 5%.', steps: ['اپنی ضرورت سادہ الفاظ میں لکھنا', 'فارمولا کاپی کرنا', 'ایکسل شیٹ میں پیسٹ کرنا', 'نتیجہ چیک کرنا'] },
      { name: 'Microsoft Copilot for Excel', urdu: 'مائیکروسافٹ کوپائلٹ ایکسل', price: 'PKR 8,500 / ماہ', isFree: false, rating: 4.8, users: '40K+ پاکستانی', desc: 'بڑے ڈیٹا کا خودکار تجزیہ اور پائیوٹ ٹیبلز لمحوں میں۔', tagline: 'آفس 365 کا آفیشل AI ساتھی', prompt: 'Create a pivot chart showing quarterly profit margins by regional cities in Pakistan.', steps: ['ڈیٹا کو ٹیبل فارمیٹ کرنا', 'کوپائلٹ بٹن دبانا', 'ٹرینڈز اینالائز کروانا', 'چارٹ انسرٹ کرنا'] },
      { name: 'Rows AI', urdu: 'روز اے آئی اسپریڈشیٹ', price: 'مفت (بنیادی) / PKR 3,200 پرو', isFree: true, rating: 4.7, users: '25K+ پاکستانی', desc: 'انٹرنیٹ سے لائیو ڈیٹا لا کر خودکار ریسرچ شیٹ تیار کرتا ہے۔', tagline: 'جدید کلاؤڈ اسپریڈشیٹ', prompt: 'Fetch the top 20 software houses in Pakistan with company websites and employee counts.', steps: ['نئی شیٹ بنانا', 'AI اینالسٹ کو ریسرچ دینا', 'انٹیگریشنز جوڑنا', 'ڈیٹا ایکسپورٹ کرنا'] },
      { name: 'Ajelix Excel AI', urdu: 'ایجیلکس فارمولا اسسٹنٹ', price: 'مفت / PKR 2,500 پرو', isFree: true, rating: 4.6, users: '22K+ پاکستانی', desc: 'ایکسل اور گوگل شیٹس کے فارمولے سمجھائیں اور ایررز ٹھیک کریں۔', tagline: 'ایکسل ایرر فکسر', prompt: 'Explain why this VLOOKUP returns #N/A and convert it to XLOOKUP with error handling.', steps: ['خراب فارمولا پیسٹ کرنا', 'وجہ اور حل دیکھنا', 'نیا فارمولا کاپی کرنا', 'شیٹ میں لگانا'] },
      { name: 'SheetGPT', urdu: 'شیٹ جی پی ٹی', price: 'مفت ٹرائل / PKR 2,800 ماہانہ', isFree: true, rating: 4.7, users: '31K+ پاکستانی', desc: 'گوگل شیٹس کے اندر =GPT() فنکشن چلا کر ہزاروں روز ایک ساتھ پروسیس کریں۔', tagline: 'گوگل شیٹس میں چیٹ جی پی ٹی', prompt: '=GPT("Write a compelling 1-line product description in Urdu for", A2)', steps: ['گوگل شیٹس ایڈ آن لگانا', 'فنکشن =GPT() لکھنا', 'سیلز ڈریگ کر کے فل کرنا', 'بلک ڈیٹا تیار'] },
      { name: 'ChatExcel', urdu: 'چیٹ ایکسل فری', price: '100% مفت', isFree: true, rating: 4.5, users: '39K+ پاکستانی', desc: 'شیٹ اپلوڈ کریں اور اردو میں سوال پوچھ کر رزلٹ حاصل کریں۔', tagline: 'ایکسل سے اردو میں بات چیت', prompt: 'پچھلے سال سب سے زیادہ فروخت ہونے والی 5 مصنوعات کی فہرست اور کل منافع بتائیں۔', steps: ['ایکسل فائل اپلوڈ کرنا', 'اردو میں سوال پوچھنا', 'خودکار فلٹر شدہ ڈیٹا دیکھنا', 'نئی فائل ڈاؤنلوڈ'] },
      { name: 'Equals AI', urdu: 'ایکول اسپریڈشیٹ', price: 'PKR 4,800 / ماہ', isFree: false, rating: 4.6, users: '18K+ پاکستانی', desc: 'SQL ڈیٹا بیس سے کنیکٹ کر کے خودکار فنانشل ماڈلز بنانے والا۔', tagline: 'فنانشل اینالسٹ کا مددگار', prompt: 'Build a 12-month runway and cash burn projection model based on monthly expenses.', steps: ['ڈیٹا سورس جوڑنا', 'پروجیکشن پیرامیٹر سیٹ کرنا', 'رپورٹ شیڈول کرنا', 'پی ڈی ایف شیئرنگ'] },
      { name: 'PromptLoop', urdu: 'پرامپٹ لوپ', price: 'PKR 3,500 / ماہ', isFree: false, rating: 4.5, users: '15K+ پاکستانی', desc: 'ای کامرس کیٹیگریز اور پروڈکٹ لیبلز کا خودکار ٹیگنگ ٹول۔', tagline: 'شیٹ ڈیٹا کی خودکار کیٹیگرائزیشن', prompt: 'Categorize these 500 customer support messages into Billing, Technical, or General.', steps: ['ٹیمپلیٹ چننا', 'کالم ڈیٹا سلیکٹ کرنا', 'AI لوپ چلانا', 'رزلٹ ڈاؤنلوڈ'] },
      { name: 'Lumelixr', urdu: 'لیومیلکسر فارمولا بلڈر', price: 'مفت / PKR 1,800 پرو', isFree: true, rating: 4.4, users: '19K+ پاکستانی', desc: 'براؤزر ایکسٹینشن کے ذریعے ایکسل ویب پر آن اسکرین مدد۔', tagline: 'اسکرین پر لائیو ایکسل ہیلپر', prompt: 'Create conditional formatting rule for highlighting invoices overdue by 30 days.', steps: ['ایکسٹینشن ایکٹیو کرنا', 'ہائی لائٹ رول بنوانا', 'کلر تھیم چننا', 'اپلائی'] },
      { name: 'Excelmatic', urdu: 'ایکسل میٹک رپورٹس', price: 'PKR 2,400 / ماہ', isFree: false, rating: 4.6, users: '24K+ پاکستانی', desc: 'روزانہ کی سیلز رپورٹس خود بخود ای میل اور پی ڈی ایف میں تبدیل کریں۔', tagline: 'ڈیلی سیلز رپورٹ آٹومیشن', prompt: 'Aggregate daily branch sales into summary cards with week-over-week growth metrics.', steps: ['شیٹ شیڈول کرنا', 'فارمیٹنگ کسٹمائز کرنا', 'آٹو ای میل سیٹ کرنا', 'رپورٹ ویریفائی'] }
    ]
  };

  // Generic fallback generator for any of the 25 categories
  const categoryMeta: Record<string, { prefix: string; desc: string; samplePrompt: string }> = {
    'design': { prefix: 'ڈیزائن و گرافکس', desc: 'پوسٹرز، بینرز اور برانڈنگ کے جدید ٹولز۔', samplePrompt: 'Create a luxury brand identity concept with color palettes and typography rules.' },
    'social-media': { prefix: 'سوشل میڈیا گروتھ', desc: 'فیس بک، انسٹاگرام اور ٹک ٹاک پر فالورز بڑھانے کے سسٹمز۔', samplePrompt: 'Generate a 30-day viral content calendar for Instagram Reels in Urdu.' },
    'education': { prefix: 'تعلیم و تدریس', desc: 'طالب علموں کے نوٹس، ہوم ورک اور امتحان کی تیاری۔', samplePrompt: 'Explain quantum physics principles in simple Urdu everyday analogies for high school students.' },
    'business': { prefix: 'بزنس و پلاننگ', desc: 'پروپوزل، فزیبلٹی رپورٹ اور کمپنی اسٹریٹجی۔', samplePrompt: 'Write a comprehensive business plan for a delivery courier startup in Pakistan.' },
    'chatbot': { prefix: 'چیٹ بوٹ و آٹومیشن', desc: 'کسٹمر سپورٹ اور واٹس ایپ پر خودکار جوابات۔', samplePrompt: 'Create a customer care conversational flow for an online shoe store with FAQs.' },
    'marketing': { prefix: 'مارکیٹنگ و اشتہارات', desc: 'ایڈ کاپی، فیس بک مہمات اور سیلز فنل۔', samplePrompt: 'Draft 3 persuasive marketing angles for a digital skills academy in Pakistan.' },
    'music': { prefix: 'میوزک و کمپوزیشن', desc: 'گانے، دھنیں اور بیک گراؤنڈ میوزک جنریٹر۔', samplePrompt: 'Compose a cinematic upbeat orchestral backing track for a motivational documentary.' },
    '3d': { prefix: 'تھری ڈی اثاثے', desc: '3D ماڈل، رینڈرنگ اور اینیمیشن کے AI اوزار۔', samplePrompt: 'Generate a 3D low-poly isometric model of a modern laptop workspace.' },
    'email': { prefix: 'ای میل مارکیٹنگ', desc: 'کولڈ ای میلز، نیوز لیٹرز اور آٹو ریپلائی۔', samplePrompt: 'Write a high-converting cold email pitch to international design agency clients.' },
    'ecommerce': { prefix: 'ای کامرس و دراز', desc: 'پروڈکٹ ٹائٹل، ڈسکرپشن اور اشتہاری مواد۔', samplePrompt: 'Write an optimized Daraz product listing with bullet features and search keywords.' },
    'pdf': { prefix: 'پی ڈی ایف سمرائزر', desc: 'طویل دستاویزات سے فوری معلومات اور سوال جواب۔', samplePrompt: 'Extract key contract clauses and liability terms from this legal document.' },
    'translation': { prefix: 'زبان و ترجمہ', desc: 'اردو اور 100+ زبانوں میں درست با محاورہ ترجمہ۔', samplePrompt: 'Translate this English medical consent form into accurate and polite formal Urdu.' },
    'security': { prefix: 'سائبر سیکیورٹی', desc: 'ڈیٹا تحفظ، اینٹی وائرس اور خامیوں کی جانچ۔', samplePrompt: 'Audit this authentication route for common OWASP vulnerabilities and CSRF flaws.' },
    'presentation': { prefix: 'پریزنٹیشن و سلائیڈز', desc: 'پاورپوائنٹ، پچ ڈیک اور سلائیڈ ڈیزائن۔', samplePrompt: 'Create a 10-slide startup pitch deck outline for Pakistani seed investors.' },
    'gaming': { prefix: 'گیمنگ و ڈویلپمنٹ', desc: 'گیم کانسیپٹ، کریکٹر اسٹوری اور ڈائیلاگ۔', samplePrompt: 'Develop a backstory and dialogue tree for an NPC shopkeeper in an action RPG.' },
    'health': { prefix: 'صحت و تندرستی', desc: 'ڈائٹ پلان، ورزش اور ہیلتھ ٹریکنگ۔', samplePrompt: 'Create a balanced 7-day desi diet meal plan with affordable healthy local Pakistani foods.' },
    'finance': { prefix: 'فنانس و انویسٹمنٹ', desc: 'بجٹ، ٹیکس، کریپٹو اور اسٹاک تجزیہ۔', samplePrompt: 'Create a monthly household budgeting template tailored for inflation management.' },
    'property': { prefix: 'پراپرٹی و رئیل اسٹیٹ', desc: 'پلاٹ ریٹس، مکانات کی خرید و فروخت ایڈز۔', samplePrompt: 'Write an attractive property sales ad for a 5-marla modern house in DHA Lahore.' },
    'productivity': { prefix: 'پروڈکٹیوٹی و ورک فلو', desc: 'وقت کی بچت اور روزمرہ کاموں کی خودکاریت۔', samplePrompt: 'Design a daily time-blocking schedule to maximize deep work and minimize digital burnout.' }
  };

  // If specific configs exist, return them
  if (categoryToolConfigs[categoryId]) {
    return categoryToolConfigs[categoryId].map((item, idx) => ({
      id: `tool-${categoryId}-${idx + 1}`,
      name: item.name,
      urduName: item.urdu,
      categoryId,
      categoryUrdu: categoryId,
      pricePKR: item.price,
      isFree: item.isFree,
      rating: item.rating,
      usersCount: item.users,
      taglineUrdu: item.tagline,
      descriptionUrdu: item.desc,
      promptTemplate: item.prompt,
      videoTutorial: {
        title: `${item.urdu} سے کام کرنے کا مکمل آسان طریقہ`,
        duration: `${10 + idx}:30 منٹ`,
        instructorUrdu: 'محمد ارسلان (AI ٹرینر)',
        views: `${20 + idx * 4},500 ویوز`,
        stepsUrdu: item.steps
      },
      toolUrl: 'https://aimaster.pk'
    })).map(enrichTool);
  }

  // Otherwise generate 10 unique realistic tools for this category
  const meta = categoryMeta[categoryId] || { prefix: 'اے آئی ماسٹر ٹول', desc: 'جدید ترین آرٹیفیشل انٹیلیجنس ٹول۔', samplePrompt: 'Write an actionable guide in Urdu for beginners.' };
  
  const toolNames = [
    { en: 'MasterPro AI', ur: 'ماسٹر پرو', free: true, price: 'مفت (بنیادی) / PKR 2,500 پرو', rating: 4.9 },
    { en: 'Apex Studio', ur: 'ایپکس اسٹوڈیو', free: false, price: 'PKR 3,500 / ماہ', rating: 4.8 },
    { en: 'FastCraft Urdu', ur: 'فاسٹ کرافٹ', free: true, price: '100% مفت', rating: 4.7 },
    { en: 'SmartGenius', ur: 'اسمارٹ جینئس', free: false, price: 'PKR 4,200 / ماہ', rating: 4.9 },
    { en: 'NovaFlow', ur: 'نووا فلو', free: true, price: 'مفت آزمائش دستیاب', rating: 4.6 },
    { en: 'HyperMind AI', ur: 'ہائپر مائنڈ', free: false, price: 'PKR 5,600 / ماہ', rating: 4.8 },
    { en: 'PakAssistant', ur: 'پاک اسسٹنٹ', free: true, price: '100% مفت', rating: 4.9 },
    { en: 'QuantumEdge', ur: 'کوانٹم ایج', free: false, price: 'PKR 6,800 / ماہ', rating: 4.7 },
    { en: 'SwiftAction', ur: 'سوئفٹ ایکشن', free: true, price: 'مفت (50 روزانہ کریڈٹ)', rating: 4.8 },
    { en: 'OmniMaster 2026', ur: 'اومنی ماسٹر', free: false, price: 'PKR 2,900 / ماہ', rating: 5.0 }
  ];

  return toolNames.map((t, idx) => ({
    id: `tool-${categoryId}-${idx + 1}`,
    name: `${t.en} (${categoryId})`,
    urduName: `${t.ur} برائے ${categoryId}`,
    categoryId,
    categoryUrdu: categoryId,
    pricePKR: t.price,
    isFree: t.free,
    rating: t.rating,
    usersCount: `${(30 + idx * 7)}K+ پاکستانی`,
    taglineUrdu: `${meta.prefix}: ${t.ur} کے ذریعے اپنے کام کو 10 گنا تیز بنائیں`,
    descriptionUrdu: `${meta.desc} یہ ٹول پاکستانی صارفین کی ضروریات کو مدنظر رکھ کر بنایا گیا ہے اور فوری نتائج فراہم کرتا ہے۔`,
    badgeUrdu: idx === 0 ? 'سب سے مقبول' : (t.free ? 'مفت آزمائش' : undefined),
    promptTemplate: `${meta.samplePrompt} [تفصیلات شامل کریں تاکہ بہترین نتیجہ ملے]`,
    videoTutorial: {
      title: `${t.ur} کو استعمال کرنے اور فائدہ اٹھانے کا اردو ویڈیو ٹیوٹوریل`,
      duration: `${11 + (idx % 8)}:40 منٹ`,
      instructorUrdu: 'انجینئر بلال احمد (اسلام آباد)',
      views: `${(25 + idx * 5)},800 ویوز`,
      stepsUrdu: [
        'اکاؤنٹ سائن اپ اور ڈیش بورڈ کا جائزہ',
        'مطلوبہ ترتیبات اور پاکستانی روپوں میں پلان کی تفصیل',
        'پرامپٹ یا ڈیٹا درج کرنے کا طریقہ کار',
        'فائل ایکسپورٹ اور کلائنٹ کو ڈیلیور کرنا'
      ]
    },
    toolUrl: 'https://aimaster.pk'
  })).map(enrichTool);
}
