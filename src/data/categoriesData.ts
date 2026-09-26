export interface Category {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  icon: string;
  toolCount: number;
  descriptionUrdu: string;
  descriptionEnglish: string;
}

export const CATEGORIES: Category[] = [
  { id: 'writing', nameUrdu: '✍️ لکھائی + آرٹیکل', nameEnglish: 'Writing & Articles', icon: 'PenTool', toolCount: 10, descriptionUrdu: 'مضامین، سکرپٹس، بلاگ پوسٹس اور ای بکس کی خودکار تحریر', descriptionEnglish: 'Articles, video scripts, blog posts and automated content creation' },
  { id: 'image', nameUrdu: '🖼️ تصویر + فوٹو', nameEnglish: 'Image & Photo', icon: 'Image', toolCount: 10, descriptionUrdu: 'فوٹو ریئلسٹک آرٹ، لوگو، اشتہاری بینرز اور تصویریں', descriptionEnglish: 'Photorealistic art, brand logos, advertising graphics and photo generation' },
  { id: 'video', nameUrdu: '🎬 ویڈیو بنانا', nameEnglish: 'Video Creation', icon: 'Video', toolCount: 10, descriptionUrdu: 'یوٹیوب شارٹس، ریلز، اینیمیشن اور AI اوتار ویڈیوز', descriptionEnglish: 'YouTube shorts, Instagram reels, animation and AI avatar videos' },
  { id: 'voice', nameUrdu: '🔊 آواز + وائس اوور', nameEnglish: 'Voice & Voiceover', icon: 'Mic', toolCount: 10, descriptionUrdu: 'اردو و انگریزی وائس اوور، کلوننگ اور پوڈکاسٹ اسٹوڈیو', descriptionEnglish: 'Voiceover, voice cloning, studio enhancement and audio editing' },
  { id: 'code', nameUrdu: '💻 کوڈ + ویب سائٹ', nameEnglish: 'Code & Websites', icon: 'Code', toolCount: 10, descriptionUrdu: 'ویب ڈویلپمنٹ، پائتھن اسکرپٹس اور خودکار بگ فکسنگ', descriptionEnglish: 'Web development, automated scripts, bug fixing and code generation' },
  { id: 'excel', nameUrdu: '📊 ایکسل + ڈیٹا', nameEnglish: 'Excel & Data', icon: 'Table', toolCount: 10, descriptionUrdu: 'پیچیدہ فارمولے، شیٹ آٹومیشن اور ڈیٹا اینالیٹکس', descriptionEnglish: 'Complex formulas, spreadsheet automation and data analysis' },
  { id: 'design', nameUrdu: '🎨 ڈیزائن + لوگو', nameEnglish: 'Design & Logo', icon: 'Palette', toolCount: 10, descriptionUrdu: 'سوشل میڈیا پوسٹس، لوگوز، UI/UX اور برانڈ کٹس', descriptionEnglish: 'Social media posts, UI/UX mockups, brand assets and vectors' },
  { id: 'social-media', nameUrdu: '📱 سوشل میڈیا + ریل', nameEnglish: 'Social Media & Reels', icon: 'Share2', toolCount: 10, descriptionUrdu: 'فیس بک، انسٹاگرام، ٹک ٹاک اور لنکڈ ان پوسٹ گروتھ', descriptionEnglish: 'Facebook, Instagram, TikTok and LinkedIn viral growth tools' },
  { id: 'education', nameUrdu: '📚 پڑھائی + نوٹ', nameEnglish: 'Study & Notes', icon: 'GraduationCap', toolCount: 10, descriptionUrdu: 'امتحانی تیاری، نوٹس سمری اور طالب علموں کا ہوم ورک حل', descriptionEnglish: 'Exam prep, notes summaries, student homework help and research' },
  { id: 'business', nameUrdu: '💼 بزنس + ایڈ', nameEnglish: 'Business & Ads', icon: 'Briefcase', toolCount: 10, descriptionUrdu: 'بزنس پروپوزل، مارکیٹ ریسرچ اور حکمت عملی', descriptionEnglish: 'Business proposals, feasibility reports and market strategies' },
  { id: 'chatbot', nameUrdu: '🤖 چیٹ بوٹ + AI اسسٹنٹ', nameEnglish: 'Chatbot & AI Assistant', icon: 'MessageSquare', toolCount: 10, descriptionUrdu: 'کسٹمر سپورٹ، واٹس ایپ بوٹس اور خودکار جوابات', descriptionEnglish: 'Customer support, WhatsApp bots and automated conversations' },
  { id: 'marketing', nameUrdu: '📈 مارکیٹنگ + SEO', nameEnglish: 'Marketing & SEO', icon: 'Megaphone', toolCount: 10, descriptionUrdu: 'فیس بک ایڈ کاپی، گوگل اشتہارات اور سیلز فنل', descriptionEnglish: 'Ad copies, Google & Facebook campaigns and sales funnels' },
  { id: 'music', nameUrdu: '🎵 میوزک + گانا', nameEnglish: 'Music & Song', icon: 'Music', toolCount: 10, descriptionUrdu: 'بیک گراؤنڈ میوزک، گانے اور رائلٹی فری بیٹس', descriptionEnglish: 'Background music, song composition and royalty-free beats' },
  { id: '3d', nameUrdu: '🖌️ 3D + ماڈلنگ', nameEnglish: '3D & Modeling', icon: 'Box', toolCount: 10, descriptionUrdu: 'تھری ڈی ماڈلنگ، رینڈرنگ اور اینیمیشن اثاثے', descriptionEnglish: '3D modeling, asset rendering and animations' },
  { id: 'email', nameUrdu: '📧 ای میل + آٹو میشن', nameEnglish: 'Email & Automation', icon: 'Mail', toolCount: 10, descriptionUrdu: 'کولڈ ای میلز، نیوز لیٹرز اور آٹو ریپلائی فارمیٹس', descriptionEnglish: 'Cold emails, newsletters and automated outreach templates' },
  { id: 'ecommerce', nameUrdu: '🛒 ای کامرس + پروڈکٹ', nameEnglish: 'E-Commerce & Product', icon: 'ShoppingBag', toolCount: 10, descriptionUrdu: 'دراز اور شاپائفائی مصنوعات کی تفصیلات اور ایڈز', descriptionEnglish: 'Daraz, Amazon and Shopify product listings and promotions' },
  { id: 'pdf', nameUrdu: '📄 PDF + ڈاکومنٹ', nameEnglish: 'PDF & Documents', icon: 'FileText', toolCount: 10, descriptionUrdu: 'پی ڈی ایف سے بات چیت، خلاصہ اور سوال و جواب', descriptionEnglish: 'Chat with PDFs, contract analysis and document summaries' },
  { id: 'translation', nameUrdu: '🌐 ترجمہ + زبان', nameEnglish: 'Translation & Language', icon: 'Languages', toolCount: 10, descriptionUrdu: 'اردو، انگریزی، عربی اور 100+ زبانوں میں درست ترجمہ', descriptionEnglish: 'Accurate Urdu, English and 100+ multilingual translations' },
  { id: 'security', nameUrdu: '🔒 سیکیورٹی + چیکنگ', nameEnglish: 'Security & Checking', icon: 'ShieldCheck', toolCount: 10, descriptionUrdu: 'سائبر سیکیورٹی، اینٹی وائرس اور ڈیٹا پرائیویسی گارڈ', descriptionEnglish: 'Cybersecurity audits, vulnerability scans and data privacy' },
  { id: 'presentation', nameUrdu: '📊 پریزنٹیشن + سلائیڈ', nameEnglish: 'Presentation & Slides', icon: 'Airplay', toolCount: 10, descriptionUrdu: 'پاورپوائنٹ سلائیڈز، پچ ڈیک اور بصری پریزنٹیشن', descriptionEnglish: 'Pitch deck slides, PowerPoint templates and visual decks' },
  { id: 'gaming', nameUrdu: '🎮 گیم + انٹرٹینمنٹ', nameEnglish: 'Gaming & Entertainment', icon: 'Gamepad2', toolCount: 10, descriptionUrdu: 'گیم ڈیزائن، ڈائیلاگ تحریر اور کریکٹر کانسیپٹ', descriptionEnglish: 'Game lore, NPC dialogue trees and level concepts' },
  { id: 'health', nameUrdu: '🏥 ہیلتھ + فٹنس', nameEnglish: 'Health & Fitness', icon: 'HeartPulse', toolCount: 10, descriptionUrdu: 'ڈائٹ پلان، ورزش شیڈول اور صحت مند زندگی کے اصول', descriptionEnglish: 'Meal plans, fitness workouts and wellness guidance' },
  { id: 'finance', nameUrdu: '🏦 فنانس + اکاؤنٹنگ', nameEnglish: 'Finance & Accounting', icon: 'Coins', toolCount: 10, descriptionUrdu: 'بجٹ پلاننگ، کرپٹو و اسٹاک تجزیہ اور انویسٹمنٹ حساب', descriptionEnglish: 'Budgeting, crypto & stock market analysis and financial models' },
  { id: 'property', nameUrdu: '🏠 رئیل اسٹیٹ + پراپرٹی', nameEnglish: 'Real Estate & Property', icon: 'Home', toolCount: 10, descriptionUrdu: 'رئیل اسٹیٹ لسٹنگ، مارکیٹ ریٹس اور مکان سیل ایڈز', descriptionEnglish: 'Real estate listings, property ad copy and market trends' },
  { id: 'productivity', nameUrdu: '⚡ پروڈکٹیویٹی + ٹائم سیونگ', nameEnglish: 'Productivity & Time Saving', icon: 'Zap', toolCount: 10, descriptionUrdu: 'روزمرہ کاموں کا انتظام، ٹائم ٹیبل اور خودکار ورک فلو', descriptionEnglish: 'Daily task management, automated workflows and focus routines' },
];
