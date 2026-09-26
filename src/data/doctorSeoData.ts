export interface DoctorSeoProblem {
  slug: string;
  queryKeyword: string;
  titleUrdu: string;
  metaDescriptionUrdu: string;
  categoryUrdu: string;
  urgencyLevelUrdu: string;
  problemSummaryUrdu: string; // 1. مسئلہ کیا ہے (2 lines)
  causeAnalysisUrdu: string;  // 2. کیوں ہو رہا ہے
  recommendedTools: Array<{
    name: string;
    roleUrdu: string;
    pricingUrdu: string;
    link: string;
    badgeUrdu: string;
    toolId: string;
  }>; // 3. حل کے لیے 3 بہترین AI ٹولز
  stepByStepGuideUrdu: string[]; // 4. سٹیپ بائی سٹیپ گائیڈ
  masterPromptUrdu: string;
  relatedProblemSlugs: string[]; // 5. متعلقہ مسائل کے لنکس
}

export const DOCTOR_PROBLEMS_20: DoctorSeoProblem[] = [
  {
    slug: 'mere-views-nahi-aa-rahe',
    queryKeyword: 'ویوز نہیں آ رہے',
    titleUrdu: 'یوٹیوب اور ٹک ٹاک پر ویوز نہیں آ رہے؟ مکمل AI علاج اور وائرل فارمولا',
    metaDescriptionUrdu: 'اگر آپ کی ویڈیوز پر ویوز رک گئے ہیں تو AI ٹولز کی مدد سے پہلے 3 سیکنڈ کا ہک، متحرک سب ٹائٹلز اور 4K وائرل تھمب نیلز بنانے کا طریقہ جانیں۔',
    categoryUrdu: 'یوٹیوب و سوشل میڈیا',
    urgencyLevelUrdu: 'ایمرجنسی وائرل تھراپی',
    problemSummaryUrdu: 'ویڈیوز پر کم ویوز اور ڈیڈ ریچ کا اصل مسئلہ پہلے 3 سیکنڈ کا کمزور ہک اور عام تھمب نیل ہوتا ہے۔ دیکھنے والے بور ہو کر چند سیکنڈ میں اسکرول کر دیتے ہیں۔',
    causeAnalysisUrdu: 'الگورتھم آڈینس ریٹینشن (Watch Time) دیکھتا ہے۔ روایتی لمبی تمہید، مدہم آڈیو اور بورنگ فونٹ کی وجہ سے یوٹیوب ویڈیو کو آگے ریکمنڈ کرنا بند کر دیتا ہے۔',
    recommendedTools: [
      { name: 'Opus Clip', roleUrdu: 'طویل ویڈیو سے 10 ہٹ وائرل شارٹس خودکار نکالیں', pricingUrdu: 'مفت پلان دستیاب', link: '/category/video', badgeUrdu: 'وائرل ہٹس', toolId: 'tool-video-3' },
      { name: 'CapCut AI', roleUrdu: 'متحرک کلر فل اردو کیپشنز اور بیک گراؤنڈ میوزک', pricingUrdu: '100% مفت', link: '/category/video', badgeUrdu: 'ایڈیٹنگ کنگ', toolId: 'tool-video-2' },
      { name: 'Leonardo AI', roleUrdu: 'الٹرا ایچ ڈی 4K کلک ایبل یوٹیوب تھمب نیل آرٹ', pricingUrdu: 'روزانہ 150 مفت ٹوکنز', link: '/category/image', badgeUrdu: 'تھمب نیل ایکسپرٹ', toolId: 'tool-img-2' }
    ],
    stepByStepGuideUrdu: [
      'ویڈیو کا آغاز ہمیشہ سوال یا چونکا دینے والی بات سے کریں (پہلے 3 سیکنڈ میں تمہید نہ باندھیں)۔',
      'ChatGPT سے وائرل ہک لائبریری بنوائیں جس میں انسانی تجسس کو ابھارا گیا ہو۔',
      'CapCut یا Submagic سے بولے جانے والے الفاظ کے مطابق رنگ بدلنے والے کیپشنز آن کریں۔',
      'Leonardo AI سے 16:9 ریشو میں ہائی کنٹراسٹ تھمب نیل بنا کر واضح اردو فونٹ لکھیں۔',
      'پاکستانی وقت کے مطابق شام 7 بجے سے رات 9 بجے کے درمیان پوسٹ کریں جب ٹریفک عروج پر ہوتی ہے۔'
    ],
    masterPromptUrdu: 'میری [موضوع یہاں درج کریں] پر بننے والی ویڈیو کے لیے 5 ایسے زبردست اردو ہکس (Hook Lines) لکھیں جنہیں سنتے ہی دیکھنے والا رک جائے اور پوری ویڈیو دیکھے۔ ہر ہک میں سسپنس یا حیران کن انکشاف شامل ہو۔',
    relatedProblemSlugs: ['fiverr-freelancing-first-order', 'logo-design-masla', 'cv-resume-writing']
  },
  {
    slug: 'fiverr-freelancing-first-order',
    queryKeyword: 'فری لانسنگ پہلا آرڈر',
    titleUrdu: 'Fiverr اور Upwork پر پہلا آرڈر کیسے لیں؟ پاکستانی فری لانسرز کے لیے AI نسخہ',
    metaDescriptionUrdu: 'فائور پر کلائنٹس کو متاثر کرنے والی ہائی کنورٹنگ گگ ڈسکرپشن، کلک ایبل گگ امیج اور کلائنٹ پروپوزل چند سیکنڈ میں تیار کریں۔',
    categoryUrdu: 'آن لائن کمائی و فری لانسنگ',
    urgencyLevelUrdu: 'انتہائی ضروری گائیڈ',
    problemSummaryUrdu: 'نئے فری لانسرز کی گگز سرچ کے آخری صفحات میں دب جاتی ہیں اور کلائنٹس کلک نہیں کرتے۔ پرکشش پورٹ فولیو اور ایس ای او کی ورڈز کا فقدان اصل رکاوٹ ہے۔',
    causeAnalysisUrdu: 'فائور کا الگورتھم گگ کی ورڈ میچنگ، جواب دینے کی رفتار اور پروفیشنل ڈسکرپشن دیکھتا ہے۔ روایتی کاپی پیسٹ پروپوزل کلائنٹ فوری نظر انداز کر دیتے ہیں۔',
    recommendedTools: [
      { name: 'ChatGPT 4o', roleUrdu: 'فائور گگ SEO ڈسکرپشن اور جیت جانے والا بڈ پروپوزل', pricingUrdu: 'مفت دستیاب', link: '/category/writing', badgeUrdu: 'پروپوزل ماسٹر', toolId: 'tool-write-1' },
      { name: 'Canva Pro', roleUrdu: 'کلائنٹ کی آنکھیں کھینچ لینے والا 3D گگ تھمب نیل کور', pricingUrdu: 'مفت پلان', link: '/category/design', badgeUrdu: 'گگ ڈیزائن', toolId: 'tool-design-1' },
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'نیچرل فرینڈلی انگریزی میں کلائنٹ کمیونیکیشن', pricingUrdu: 'مفت ٹرائل', link: '/category/writing', badgeUrdu: 'کلائنٹ ہینڈلر', toolId: 'tool-write-2' }
    ],
    stepByStepGuideUrdu: [
      'فائور پر لو-کمپٹیشن کی ورڈز منتخب کریں جن پر 1,000 سے کم سروسز موجود ہوں۔',
      'ChatGPT سے گگ کے لیے 5 ایس ای او ٹائٹل اور تفصیلی بلٹ پوائنٹس والی ڈسکرپشن لیں۔',
      'Canva پر 3D موک اپ کے ساتھ واضح 3 سروس فیچرز گگ امیج پر لکھیں۔',
      'اپ ورک پر کلائنٹ کے مسئلے کا پہلا پیراگراف میں حل بتانے والا کسٹم پروپوزل بھیجیں۔',
      'موبائل ایپ سے پہلے 5 منٹ کے اندر کلائنٹ کے میسج کا جواب دیں۔'
    ],
    masterPromptUrdu: 'You are a top-rated Fiverr seller mentor. Write a high-converting, SEO-optimized gig description for [سروس کا نام درج کریں]. Include target keywords in the first 2 lines, bullet points of deliverables, FAQ section, and a compelling Call to Action.',
    relatedProblemSlugs: ['mere-views-nahi-aa-rahe', 'logo-design-masla', 'cv-resume-writing']
  },
  {
    slug: 'logo-design-masla',
    queryKeyword: 'لوگو بنانا',
    titleUrdu: 'پروفیشنل بزنس لوگو ڈیزائن کا مسئلہ — AI سے 5 منٹ میں ویکٹر لوگو تیار کریں',
    metaDescriptionUrdu: 'بغیر فوٹوشاپ سیکھے اپنے برانڈ یا دکان کے لیے جدید، منیملسٹ اور ویکٹر پرنٹ ریڈی لوگو بنانے کا آسان ترین طریقہ۔',
    categoryUrdu: 'گرافک ڈیزائن و برانڈنگ',
    urgencyLevelUrdu: 'فوری حل (5 منٹ)',
    problemSummaryUrdu: 'مہنگی ایجنسیوں کو ہزاروں روپے دینے کے بجائے اپنے بزنس کو ایک صاف ستھرا اور یادگار لوگو درکار ہے جو واٹس ایپ ڈی پی اور فلیکس پر پکسلیٹ نہ ہو۔',
    causeAnalysisUrdu: 'عام فون ایپس سے بنے لوگوز کم ریزولوشن ہوتے ہیں اور پرنٹنگ پر پھٹ جاتے ہیں۔ جدید AI ویکٹر جنریٹرز شفاف بیک گراؤنڈ کے ساتھ فل ایچ ڈی رزلٹ دیتے ہیں۔',
    recommendedTools: [
      { name: 'Ideogram 2.0', roleUrdu: 'درست انگریزی و اردو ٹائپوگرافی کے ساتھ لوگو تخلیق', pricingUrdu: 'روزانہ مفت کریڈٹس', link: '/category/image', badgeUrdu: 'ٹیکسٹ لوگو کنگ', toolId: 'tool-img-4' },
      { name: 'Recraft.ai', roleUrdu: 'ایک کلک پر لامحدود ویکٹر (SVG) میں تبدیلی', pricingUrdu: 'مفت دستیاب', link: '/category/design', badgeUrdu: 'ویکٹر ماسٹر', toolId: 'tool-design-3' },
      { name: 'Canva Magic Studio', roleUrdu: '3D وزٹنگ کارڈ اور شاپ بورڈ موک اپ', pricingUrdu: 'مفت ورژن', link: '/category/design', badgeUrdu: 'موک اپ اسٹوڈیو', toolId: 'tool-design-1' }
    ],
    stepByStepGuideUrdu: [
      'Ideogram پر اکاؤنٹ بنائیں اور برانڈ کا نام مع بزنس کیٹیگری پرامپٹ میں درج کریں۔',
      'اسٹائل میں Minimalist Vector منتخب کر کے جنریٹ کا بٹن دبائیں۔',
      'بہترین لوگو کو ڈاؤنلوڈ کر کے Recraft.ai میں اپلوڈ کریں اور "Vectorize SVG" پر کلک کریں۔',
      'Canva میں وزٹنگ کارڈ اور لیٹر ہیڈ پر موک اپ تیار کر کے کلائنٹ یا پرنٹر کو بھیجیں۔'
    ],
    masterPromptUrdu: 'Minimalist modern flat vector logo for a business named "[نام لکھیں]", geometric clean lines, emerald green and matte gold luxury color palette, white background, SVG vector icon style --no realistic photo, shadows',
    relatedProblemSlugs: ['fiverr-freelancing-first-order', 'mere-views-nahi-aa-rahe', 'cv-resume-writing']
  },
  {
    slug: 'cv-resume-writing',
    queryKeyword: 'CV لکھنا',
    titleUrdu: 'نوکری کے لیے بین الاقوامی معیار کی ATS ریزیومے اور CV بنانے کا AI طریقہ',
    metaDescriptionUrdu: 'ہارورڈ یونیورسٹی اسٹینڈرڈ پر جدید ایک صفحے کی سی وی تیار کریں جو جاب اسکریننگ سوفٹ ویئر (ATS) کو پہلی بار میں کلیئر کرے۔',
    categoryUrdu: 'جاب و کیریئر',
    urgencyLevelUrdu: 'لازمی کیریئر حل',
    problemSummaryUrdu: 'روایتی ڈیزائنر سی وی میں ATS کی ورڈز اور ایکشن وربز نہ ہونے کی وجہ سے ایچ آر سوفٹ ویئر آپ کی درخواست بغیر پڑھے ریجیکٹ کر دیتا ہے۔',
    causeAnalysisUrdu: 'کمپنیاں خودکار بوٹس کے ذریعے سی وی اسکین کرتی ہیں۔ گرافکس سے بھرپور کالمز کے بجائے سادہ ٹیکسٹ بیسڈ، کی ورڈ فرینڈلی سنگل کالم سی وی سلیکٹ ہوتی ہے۔',
    recommendedTools: [
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'طویل کیریئر ریکارڈ کو پرکشش اچیومنٹ بلٹس میں ڈھالنا', pricingUrdu: 'مفت دستیاب', link: '/category/writing', badgeUrdu: 'بہترین کیریئر رائٹر', toolId: 'tool-write-2' },
      { name: 'ChatGPT 4o', roleUrdu: 'جاب ایڈ کے کی ورڈز کا سی وی سے موازنہ و اصلاح', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'ATS اینالائزر', toolId: 'tool-write-1' },
      { name: 'QuillBot', roleUrdu: 'گرائمر، ٹون اور پروفیشنل انگلش ری فریزنگ', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'گرامر فکسر', toolId: 'tool-write-3' }
    ],
    stepByStepGuideUrdu: [
      'اپنا موجودہ کوائف اور وہ جاب ایڈ جس پر اپلائی کرنا ہے Claude 3.5 میں درج کریں۔',
      'AI کو ہدایت دیں کہ ہر بلٹ پوائنٹ میں پیمائش کے قابل کامیابی (مثلاً 40% Growth) شامل کرے۔',
      'سادہ سنگل کالم مائیکروسافٹ ورڈ یا کینوا ٹیمپلیٹ میں فارمیٹ کریں۔',
      'فائل کو ہمیشہ PDF فارمیٹ میں نام کے ساتھ سیو کریں (جیسے: Ali_Khan_CV.pdf)۔'
    ],
    masterPromptUrdu: 'Act as a Senior HR Executive at a multinational company. Review my experience: [اپنا تجربہ لکھیں] and rewrite it into a Harvard-standard ATS-friendly resume for the position of [مطلوبہ پوسٹ]. Use strong action verbs and quantified achievements.',
    relatedProblemSlugs: ['fiverr-freelancing-first-order', 'logo-design-masla', 'mere-views-nahi-aa-rahe']
  },
  {
    slug: 'urdu-voiceover-audio-cleaning',
    queryKeyword: 'اردو وائس اوور',
    titleUrdu: 'گھریلو مائیک سے اسٹوڈیو کوالٹی اردو وائس اوور اور نعت/پوڈکاسٹ آڈیو تیار کریں',
    metaDescriptionUrdu: 'پنکھے اور کمرے کا شور 1 کلک پر ختم کر کے قدرتی انسانی لہجے میں ریڈیو جیسی گونج اور کرسٹل کلیئر آڈیو حاصل کریں۔',
    categoryUrdu: 'آواز و آڈیو اسٹوڈیو',
    urgencyLevelUrdu: 'ہائی ڈیمانڈ اسٹوڈیو حل',
    problemSummaryUrdu: 'ویڈیو تو بن جاتی ہے مگر موبائل مائیک سے ریکارڈ کی گئی آڈیو میں پنکھے کی آواز، ایکو اور پس منظر کا شور سننے والے کو فورا بھگا دیتا ہے۔',
    causeAnalysisUrdu: 'بغیر ساؤنڈ پروفنگ ریکارڈنگ میں فریکوئنسی بکھر جاتی ہے۔ روایتی سافٹ ویئر سیکھنے میں مہینوں لگتے ہیں جبکہ AI ڈینائسنگ لمحوں میں درست کرتی ہے۔',
    recommendedTools: [
      { name: 'Adobe Podcast AI', roleUrdu: '1 کلک پر پنکھے اور ہائی وے کا شور مٹا کر 4K اسٹوڈیو آواز', pricingUrdu: '100% مفت', link: '/category/voice', badgeUrdu: 'جادوئی کلینر', toolId: 'tool-voice-2' },
      { name: 'ElevenLabs', roleUrdu: 'اردو و انگریزی میں قدرتی انسانی آواز اور وائس کلوننگ', pricingUrdu: 'ماہانہ 10,000 حروف مفت', link: '/category/voice', badgeUrdu: 'AI وائس کنگ', toolId: 'tool-voice-1' },
      { name: 'Descript', roleUrdu: 'آواز سے فالتو توقف (Umm/Ah) خودکار ڈیلیٹ کرنا', pricingUrdu: 'مفت ٹرائل', link: '/category/voice', badgeUrdu: 'آڈیو ایڈیٹر', toolId: 'tool-voice-3' }
    ],
    stepByStepGuideUrdu: [
      'موبائل کے عام ریکارڈر سے آرام سے اسکرپٹ پڑھ کر آڈیو ریکارڈ کریں۔',
      'Adobe Podcast Enhance Speech پر آڈیو فائل ڈریگ کر کے اپلوڈ کریں۔',
      'پروسیسنگ کے بعد 100% کرسٹل کلیئر آواز ڈاؤنلوڈ کر لیں۔',
      'اگر خود نہیں بولنا تو ElevenLabs پر اردو متن پیسٹ کر کے آواز جنریٹ کریں۔'
    ],
    masterPromptUrdu: 'Convert this script into an energetic, inspiring Urdu documentary voiceover pacing: [اسکرپٹ پیسٹ کریں]. Mark breathing pauses with ellipses and emphasize key power words.',
    relatedProblemSlugs: ['mere-views-nahi-aa-rahe', 'youtube-short-automation', 'video-editing-tezi']
  },
  {
    slug: 'youtube-short-automation',
    queryKeyword: 'یوٹیوب شارٹس بنانا',
    titleUrdu: 'فیس لیس یوٹیوب شارٹس کا مکمل آٹو پائلٹ پائپ لائن — 1 دن میں 10 ویڈیوز تیار کریں',
    metaDescriptionUrdu: 'بغیر چہرہ دکھائے اسلامک اقوال، فیکٹس، نیوز اور موٹیویشنل شارٹس بنا کر ماہانہ لاکھوں کمانے کا طریقہ۔',
    categoryUrdu: 'ویڈیو آٹومیشن',
    urgencyLevelUrdu: 'وائرل کیش کاؤ پائپ لائن',
    problemSummaryUrdu: 'یوٹیوب شارٹس اور ریلز پر روزانہ 2 سے 3 ویڈیوز چاہیے ہوتی ہیں لیکن دستی طور پر سکرپٹ، وائس اور ایڈیٹنگ کرنے میں سارا دن ضائع ہو جاتا ہے۔',
    causeAnalysisUrdu: 'الگورتھم مسلسل پوسٹنگ مانگتا ہے۔ جب آپ AI کے 3 ٹولز کو جوڑ دیتے ہیں تو 15 منٹ میں پورے ہفتے کا مواد خودکار ریڈی ہو جاتا ہے۔',
    recommendedTools: [
      { name: 'ChatGPT 4o', roleUrdu: '50 وائرل شارٹ سکرپٹس اور ہکس کا بلک ڈیٹا', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'اسکرپٹ پروڈیوسر', toolId: 'tool-write-1' },
      { name: 'ElevenLabs', roleUrdu: 'مردانہ و زنانہ پراثر نریشن آڈیو', pricingUrdu: 'مفت پلان', link: '/category/voice', badgeUrdu: 'وائس اوور', toolId: 'tool-voice-1' },
      { name: 'CapCut / Canva Bulk', roleUrdu: 'ایک کلک پر 50 شارٹس بیک وقت جنریٹ کرنا', pricingUrdu: 'مفت', link: '/category/video', badgeUrdu: 'بلک پروڈکشن', toolId: 'tool-video-2' }
    ],
    stepByStepGuideUrdu: [
      'ChatGPT سے 10 حیران کن تاریخی حقائق یا اردو اقوال جدول (Table) میں بنوائیں۔',
      'Canva کے Bulk Create فیچر میں ڈیٹا کنیکٹ کر کے 1 کلک پر 10 ٹیمپلیٹس فل کریں۔',
      'ElevenLabs سے آڈیو لگا کر CapCut میں خودکار کیپشنز آن کریں۔',
      'روزانہ ایک ہی وقت پر یوٹیوب اور انسٹاگرام پر شیڈول کر دیں۔'
    ],
    masterPromptUrdu: 'Create a table of 10 viral psychology facts in Urdu for YouTube Shorts. Columns: Hook (first 3 seconds), Story (next 20 seconds), Conclusion/Call to subscribe.',
    relatedProblemSlugs: ['mere-views-nahi-aa-rahe', 'urdu-voiceover-audio-cleaning', 'video-editing-tezi']
  },
  {
    slug: 'video-editing-tezi',
    queryKeyword: 'ویڈیو ایڈیٹنگ تیز کرنا',
    titleUrdu: 'گھنٹوں کی ویڈیو ایڈیٹنگ منٹوں میں — خودکار کٹس، زوم اور رنگ درستگی کا AI فارمولا',
    metaDescriptionUrdu: 'بغیر پریمیئر پرو سیکھے AI سے خودکار سائلنس ریموول، بی رول انسرشن اور کلر گریڈنگ کروائیں۔',
    categoryUrdu: 'ویڈیو ایڈیٹنگ',
    urgencyLevelUrdu: 'وقت بچاؤ علاج',
    problemSummaryUrdu: 'ویڈیو شوٹ تو ہو جاتی ہے مگر را فوٹیج میں خاموشیاں اور اٹکنا کاٹنے میں 4 سے 5 گھنٹے لگ جاتے ہیں جس سے پروڈکشن رفتار سست ہو جاتی ہے۔',
    causeAnalysisUrdu: 'دستی کٹنگ میں ہر فریم زوم کرنا پڑتا ہے۔ جدید AI وائس کی ویو فارم دیکھ کر خاموش حصوں کو سیکنڈ کے دسویں حصے میں کاٹ کر جوڑ دیتا ہے۔',
    recommendedTools: [
      { name: 'CapCut Auto Cut', roleUrdu: 'خودکار خاموشی کاٹنا اور ٹیکسٹ کیپشننگ', pricingUrdu: 'مفت', link: '/category/video', badgeUrdu: 'کوئیک ایڈیٹ', toolId: 'tool-video-2' },
      { name: 'Runway Gen-3', roleUrdu: 'سنیماٹک بی رول ویڈیوز ٹیکسٹ سے تیار کرنا', pricingUrdu: 'مفت ٹرائل', link: '/category/video', badgeUrdu: 'AI فوٹیج', toolId: 'tool-video-4' },
      { name: 'Pexels AI Video', roleUrdu: 'کاپی رائٹ فری رائلٹی ویڈیوز کی خودکار تلاش', pricingUrdu: '100% مفت', link: '/category/video', badgeUrdu: 'فری بی رول', toolId: 'tool-video-1' }
    ],
    stepByStepGuideUrdu: [
      'CapCut میں ویڈیو امپورٹ کر کے "Remove Silence" پر کلک کریں۔',
      'جہاں اہم نکتہ آئے وہاں خودکار زوم ان اور ساؤنڈ افیکٹ لگائیں۔',
      'رنگوں کو نکھارنے کے لیے AI Color Match فلٹر منتخب کریں۔',
      '60fps اور 1080p ریزولوشن میں بغیر واٹر مارک ایکسپورٹ کریں۔'
    ],
    masterPromptUrdu: 'List 5 engaging b-roll ideas and camera transitions for a video discussing [موضوع]. Focus on high-energy dynamic pacing suitable for social media.',
    relatedProblemSlugs: ['youtube-short-automation', 'urdu-voiceover-audio-cleaning', 'mere-views-nahi-aa-rahe']
  },
  {
    slug: 'ecommerce-daraz-product-photoshoot',
    queryKeyword: 'دراز پروڈکٹ فوٹو شوٹ',
    titleUrdu: 'دراز اور شاپائفائی کے لیے 4K اسٹوڈیو پروڈکٹ فوٹو شوٹ — موبائل تصویر کو کمرشل بنائیں',
    metaDescriptionUrdu: 'بغیر مہنگے کیمرے اور لائٹس کے گھر بیٹھے اپنی مصنوعات کے ساتھ غیر ملکی ماڈلز اور لگژری بیک گراؤنڈ لگائیں۔',
    categoryUrdu: 'ای کامرس و بزنس',
    urgencyLevelUrdu: 'سیلز بڑھاؤ فارمولا',
    problemSummaryUrdu: 'دراز پر خراب روشنی اور گھریلو پس منظر والی تصاویر کی وجہ سے خریدار بھروسہ نہیں کرتے اور پروڈکٹ کی سیلز گر جاتی ہیں۔',
    causeAnalysisUrdu: 'آن لائن خریدار تصویر دیکھ کر کوالٹی کا فیصلہ کرتا ہے۔ اسٹوڈیو لائٹنگ اور وائٹ بیک گراؤنڈ والی لسٹنگز پر 3 گنا زیادہ آرڈرز آتے ہیں۔',
    recommendedTools: [
      { name: 'PhotoRoom AI', roleUrdu: '1 کلک پر بیک گراؤنڈ مٹا کر لکڑی یا سنگ مرمر کے اسٹوڈیو پر رکھنا', pricingUrdu: 'مفت ورژن دستیاب', link: '/category/image', badgeUrdu: 'پروڈکٹ اسٹوڈیو', toolId: 'tool-img-5' },
      { name: 'Midjourney v6.1', roleUrdu: 'لگژری ماحول اور بین الاقوامی برانڈ لائف اسٹائل رینڈرز', pricingUrdu: 'پیڈ سروس', link: '/category/image', badgeUrdu: 'الٹرا کوالٹی', toolId: 'tool-img-1' },
      { name: 'Canva Daraz Header', roleUrdu: 'سیل آفر بینرز، ڈسکاؤنٹ بیجز اور فیچرز کی سیٹنگ', pricingUrdu: 'مفت', link: '/category/design', badgeUrdu: 'بینر میکر', toolId: 'tool-design-1' }
    ],
    stepByStepGuideUrdu: [
      'دن کی روشنی میں سادہ میز پر اپنی پروڈکٹ کی سیدھی تصویر موبائل سے لیں۔',
      'PhotoRoom ایپ یا ویب سائٹ پر تصویر ڈالیں، ایپ خودکار پس منظر ہٹا دے گی۔',
      '"Studio Lighting" یا "Wooden Table" کا بیک گراؤنڈ منتخب کریں۔',
      'Canva پر جا کر دراز کے سائز (1000x1000 پکسلز) میں قیمت اور اہم خوبیاں لکھ کر لسٹ کریں۔'
    ],
    masterPromptUrdu: 'Commercial product photography of a [پروڈکٹ کا نام], placed on a sleek polished marble countertop, soft morning sunlight through window, blurred modern kitchen background, 8k resolution, crisp focus, advertising style',
    relatedProblemSlugs: ['logo-design-masla', 'whatsapp-business-bot', 'facebook-ad-copywriting']
  },
  {
    slug: 'whatsapp-business-bot',
    queryKeyword: 'واٹس ایپ بزنس بوٹ',
    titleUrdu: 'اپنی دکان کے لیے 24 گھنٹے خودکار واٹس ایپ کسٹمر سپورٹ بوٹ بنائیں',
    metaDescriptionUrdu: 'رات کو سوتے وقت بھی گاہکوں کے سوالات، قیمتوں اور آرڈر کی تفصیلات کا اردو میں فوری جواب دیں۔',
    categoryUrdu: 'بزنس آٹومیشن',
    urgencyLevelUrdu: 'سیلز آٹومیشن',
    problemSummaryUrdu: 'رات کے وقت یا مصروفیت میں گاہکوں کے واٹس ایپ پیغامات کا بروقت جواب نہ دینے سے کسٹمر دوسرے سیلر کے پاس چلا جاتا ہے۔',
    causeAnalysisUrdu: 'کسٹمر کو فوری رسپانس چاہیے ہوتا ہے۔ خودکار بوٹ قیمت، سائز، کیش آن ڈلیوری کی شرط اور بینک اکاؤنٹ کی تفصیل سیکنڈوں میں فراہم کر دیتا ہے۔',
    recommendedTools: [
      { name: 'Voiceflow AI', roleUrdu: 'بغیر کوڈنگ کے ڈریگ اینڈ ڈراپ بات چیت کا فلو بنانا', pricingUrdu: 'مفت پلان', link: '/category/chatbot', badgeUrdu: 'بوٹ میکر', toolId: 'tool-chat-1' },
      { name: 'ChatGPT Plus API', roleUrdu: 'گاہک کی بات سمجھ کر سچی شائستہ اردو میں جواب دینا', pricingUrdu: 'مفت متبادل دستیاب', link: '/category/chatbot', badgeUrdu: 'AI برین', toolId: 'tool-write-1' },
      { name: 'WhatsApp Business API', roleUrdu: 'آفیشل گرین ٹک اور لامحدود کسٹمر کنکشن', pricingUrdu: 'مفت فیچرز', link: '/category/chatbot', badgeUrdu: 'کنیکٹر', toolId: 'tool-chat-2' }
    ],
    stepByStepGuideUrdu: [
      'اپنے کسٹمرز کے عام 10 سوالات کی فہرست بنائیں (مثلاً قیمت، ڈلیوری چارجز، طریقہ کار)۔',
      'Voiceflow پر فلو ڈیزائن کریں کہ کس سوال پر کیا جواب دینا ہے۔',
      'ChatGPT کی پرامپٹ لاجک کنیکٹ کریں تاکہ اگر کسٹمر مختلف الفاظ میں پوچھے تب بھی درست جواب ملے۔',
      'ٹیسٹنگ کے بعد اپنے دفتری نمبر پر آٹو ریپلائی لائیو کر دیں۔'
    ],
    masterPromptUrdu: 'You are a polite Pakistani customer service agent for [دکان کا نام]. Answer customer inquiries about shipping rates (PKR 250 flat), delivery time (3-5 days), and COD payment in fluent courteous Urdu.',
    relatedProblemSlugs: ['ecommerce-daraz-product-photoshoot', 'facebook-ad-copywriting', 'fiverr-freelancing-first-order']
  },
  {
    slug: 'facebook-ad-copywriting',
    queryKeyword: 'فیس بک اشتہار کی تحریر',
    titleUrdu: 'فیس بک اور انسٹاگرام ایڈ کاپی جو فوراً سیلز لائے — ہائی کنورٹنگ اردو ایڈز کا فارمولا',
    metaDescriptionUrdu: 'کم بجٹ میں زیادہ آرڈرز حاصل کرنے کے لیے دل کو چھو لینے والی سیلز کاپی اور کلک ایبل ہیڈ لائنز کا AI علاج۔',
    categoryUrdu: 'ڈیجیٹل مارکیٹنگ',
    urgencyLevelUrdu: 'سیلز بوسٹر',
    problemSummaryUrdu: 'فیس بک پر اشتہار لگانے کے باوجود لوگ صرف لائک کر کے گزر جاتے ہیں، خریدتے نہیں اور اشتہار کا سارا بجٹ ضائع ہو جاتا ہے۔',
    causeAnalysisUrdu: 'عام تحریر میں خریدار کا "درد" (Pain Point) اور فوری فیصلہ کرنے کی "جلدی" (Urgency) نہیں ہوتی۔ جب ایڈ کاپی درست جذبات کو چھیڑتی ہے تو سیلز بڑھتی ہے۔',
    recommendedTools: [
      { name: 'ChatGPT 4o', roleUrdu: 'AIDA فارمولا (Attention, Interest, Desire, Action) پر مشتمل ایڈ کاپی', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'سیلز کاپی رائٹر', toolId: 'tool-write-1' },
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'خالص پاکستانی ثقافت اور جذباتی اپیل کے الفاظ', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'جذباتی کاپی', toolId: 'tool-write-2' },
      { name: 'Canva Ad Creator', roleUrdu: 'ہائی کنٹراسٹ اشتہاری پوسٹ مع لمیٹڈ ٹائم آفر بیج', pricingUrdu: 'مفت', link: '/category/design', badgeUrdu: 'ایڈ بینر', toolId: 'tool-design-1' }
    ],
    stepByStepGuideUrdu: [
      'پہلی لائن میں کسٹمر کے سب سے بڑے مسئلے کی نشاندہی کریں (مثلاً: کیا آپ کی کمر میں درد رہتا ہے؟)۔',
      'درمیان میں اپنی پراڈکٹ کو واحد آسان حل کے طور پر پیش کریں۔',
      'تیسری لائن میں محدود اسٹاک اور کیش آن ڈلیوری کی سہولت بتائیں۔',
      'آخر میں واضح بٹن دیں: "ابھی واٹس ایپ پر آرڈر کریں"۔'
    ],
    masterPromptUrdu: 'Write 3 Facebook ad copy variations in Roman Urdu and pure Urdu for [پروڈکٹ کا نام]. Structure using Hook, Pain point, Solution, Limited time discount offer, and Call to action to order via WhatsApp.',
    relatedProblemSlugs: ['ecommerce-daraz-product-photoshoot', 'whatsapp-business-bot', 'fiverr-freelancing-first-order']
  },
  {
    slug: 'assignment-thesis-plagiarism-fix',
    queryKeyword: 'اسائنمنٹ تھیسز پلیجیرزم',
    titleUrdu: 'یونیورسٹی اسائنمنٹ اور تھیسز سے پلیجیرزم (Plagiarism) ختم کرنے کا قانونی AI طریقہ',
    metaDescriptionUrdu: 'ٹرنٹ ان (Turnitin) اور HEC قوانین کے مطابق تحقیق کے مفہوم کو برقرار رکھتے ہوئے پیرا فریسنگ اور درست حوالہ جات لگائیں۔',
    categoryUrdu: 'پڑھائی و اکیڈمک',
    urgencyLevelUrdu: 'اسٹوڈنٹ سیور',
    problemSummaryUrdu: 'طالب علم محنت سے اسائنمنٹ لکھتے ہیں مگر انٹرنیٹ سے حوالہ لیتے ہی 30% سے زیادہ پلیجیرزم آ جاتی ہے اور پروفیسر ریجیکٹ کر دیتے ہیں۔',
    causeAnalysisUrdu: 'انٹرنیٹ کے جملوں کی ہو بہو ترتیب ٹرنٹ ان پکڑ لیتا ہے۔ الفاظ کی ترتیب بدلنے اور اپنے الفاظ میں تجزیہ لکھنے سے پلیجیرزم صفر ہو جاتی ہے۔',
    recommendedTools: [
      { name: 'QuillBot Urdu & English', roleUrdu: 'اکیڈمک اور فارمل موڈ میں جملوں کی ساخت بدلنا', pricingUrdu: 'مفت دستیاب', link: '/category/education', badgeUrdu: 'ری فریزنگ کنگ', toolId: 'tool-write-3' },
      { name: 'ChatGPT 4o Scholar', roleUrdu: 'تحقیقی تجزیہ اور APA / MLA فارمیٹ میں حوالہ جات', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'اکیڈمک گائیڈ', toolId: 'tool-write-1' },
      { name: 'Grammarly', roleUrdu: 'گرائمر کے نقائص اور اکیڈمک ٹون کی خودکار درستی', pricingUrdu: 'مفت ایکسٹینشن', link: '/category/writing', badgeUrdu: 'گرائمر چیکر', toolId: 'tool-write-4' }
    ],
    stepByStepGuideUrdu: [
      'حوالہ شدہ پیراگراف کو پہلے خود غور سے پڑھ کر اس کا اصل مفہوم سمجھیں۔',
      'QuillBot پر "Formal" موڈ منتخب کر کے پیرا فریس کریں۔',
      'ChatGPT سے کہیں کہ اس پیراگراف کے اختتام پر تازہ ترین مستند سائنسی ریفرنسز کا اضافہ کرے۔',
      'فائنل ٹیکسٹ کو دوبارہ اسکین کر کے اطمینان کر لیں۔'
    ],
    masterPromptUrdu: 'Rewrite the following academic text to make it completely unique, maintaining scholarly academic tone, eliminating passive voice, and including APA 7th edition citation style: [متن پیسٹ کریں]',
    relatedProblemSlugs: ['cv-resume-writing', 'pdf-document-chat-summary', 'fiverr-freelancing-first-order']
  },
  {
    slug: 'pdf-document-chat-summary',
    queryKeyword: 'پی ڈی ایف سمری',
    titleUrdu: '200 صفحات کی کتاب یا قانونی معاہدے (PDF) کا 2 منٹ میں اردو خلاصہ اور سوال و جواب',
    metaDescriptionUrdu: 'طویل دستاویزات، کورس بکس، عدالتی کاغذات اور ریسرچ پیپرز سے ڈائریکٹ چیٹ کر کے مطلوبہ معلومات حاصل کریں۔',
    categoryUrdu: 'دستاویزات و ریسرچ',
    urgencyLevelUrdu: 'وقت بچاؤ ریسرچ',
    problemSummaryUrdu: 'طویل پی ڈی ایف پڑھنے کے لیے وقت نہیں ہوتا اور امتحانی تیاری یا قانونی فیصلے کے اہم نکات تلاش کرنا ناممکن لگتا ہے۔',
    causeAnalysisUrdu: 'دستاویزات میں ضرورت کی بات چند صفحات پر ہوتی ہے۔ جدید AI سیکنڈوں میں پوری فائل پڑھ کر اہم پوائنٹس کا اردو خلاصہ بنا دیتا ہے۔',
    recommendedTools: [
      { name: 'ChatPDF', roleUrdu: 'پی ڈی ایف اپلوڈ کریں اور سوال پوچھیں', pricingUrdu: 'روزانہ 2 پی ڈی ایف مفت', link: '/category/pdf', badgeUrdu: 'پی ڈی ایف ماسٹر', toolId: 'tool-pdf-1' },
      { name: 'Claude 3.5 Sonnet', roleUrdu: '2 لاکھ الفاظ پر مشتمل کتاب کا گہرا اور منطقی تجزیہ', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'کتاب شناس', toolId: 'tool-write-2' },
      { name: 'Google NotebookLM', roleUrdu: 'دستاویزات کا آڈیو پوڈکاسٹ ڈسکشن تیار کرنا', pricingUrdu: '100% مفت', link: '/category/education', badgeUrdu: 'پوڈکاسٹ سمری', toolId: 'tool-edu-2' }
    ],
    stepByStepGuideUrdu: [
      'ChatPDF یا Claude پر اپنی فائل اپلوڈ کریں۔',
      'اردو میں سوال لکھیں: "اس دستاویز میں کمپنی کے ملازم پر کون سی 3 پابندیاں عائد کی گئی ہیں؟"',
      'AI فوری متعلقہ صفحہ نمبر کے ساتھ درست جواب فراہم کرے گا۔',
      'امتحانی تیاری کے لیے "اس باب کے 10 اہم سوالات مع جوابات لکھیں" کمانڈ دیں۔'
    ],
    masterPromptUrdu: 'Summarize the attached PDF into 7 key actionable takeaways in simple Urdu. Highlight all critical deadlines, monetary figures, and policy requirements.',
    relatedProblemSlugs: ['assignment-thesis-plagiarism-fix', 'cv-resume-writing', 'fiverr-freelancing-first-order']
  },
  {
    slug: 'excel-complex-formulas-automation',
    queryKeyword: 'ایکسل فارمولے',
    titleUrdu: 'ایکسل کے پیچیدہ فارمولے اور ڈیٹا رپورٹنگ اب AI سے چند سیکنڈ میں کروائیں',
    metaDescriptionUrdu: 'VLOOKUP, XLOOKUP اور پیوٹ ٹیبل کے بغیر ڈیٹا کا تجزیہ کریں اور خودکار فارمولے حاصل کریں۔',
    categoryUrdu: 'ایکسل و ڈیٹا اینالیٹکس',
    urgencyLevelUrdu: 'آفس ورک ہیک',
    problemSummaryUrdu: 'دفتر میں ایکسل کی بڑی شیٹس میں غلطیاں نکل آتی ہیں اور پیچیدہ فارمولا یاد نہ ہونے سے گھنٹوں ماتھا مارنا پڑتا ہے۔',
    causeAnalysisUrdu: 'ایکسل کے سنٹیکس میں کوما یا بریکٹ کی معمولی غلطی سے پورا فارمولا فیل ہو جاتا ہے۔ AI کو سادہ زبان میں بتانے سے وہ درست فارمولا خود لکھ دیتا ہے۔',
    recommendedTools: [
      { name: 'ChatGPT Advanced Data', roleUrdu: 'ایکسل فائل اپلوڈ کریں اور گراف مع اینالیسس حاصل کریں', pricingUrdu: 'مفت ورژن دستیاب', link: '/category/excel', badgeUrdu: 'ڈیٹا اینالسٹ', toolId: 'tool-excel-1' },
      { name: 'Formula Bot AI', roleUrdu: 'اردو میں بتائیں کہ کیا حساب کرنا ہے، فارمولا ریڈی', pricingUrdu: 'مفت ٹرائل', link: '/category/excel', badgeUrdu: 'فارمولا میکر', toolId: 'tool-excel-2' },
      { name: 'Microsoft Copilot', roleUrdu: 'ایکسل کے اندر لائیو آٹومیشن اور چارٹس', pricingUrdu: 'مفت ٹرائل', link: '/category/excel', badgeUrdu: 'آفس اسسٹنٹ', toolId: 'tool-excel-3' }
    ],
    stepByStepGuideUrdu: [
      'اپنا مسئلہ سادہ اردو میں لکھیں: "کالم A میں تاریخ ہے اور کالم B میں سیلز، مجھے صرف جنوری کی کل سیلز چاہیے۔"',
      'Formula Bot سے فوری SUMIFS کا درست فارمولا کاپی کریں۔',
      'ایکسل میں پیسٹ کریں اور انٹر دبائیں۔',
      'ChatGPT میں ایکسل شیٹ اپلوڈ کر کے خودکار پائی چارٹ اور منافع کا تخمینہ حاصل کریں۔'
    ],
    masterPromptUrdu: 'Provide the exact Excel/Google Sheets formula to: [یہاں اپنا مطلوبہ حساب لکھیں]. Explain which cell coordinates to change and troubleshoot common #N/A errors.',
    relatedProblemSlugs: ['pdf-document-chat-summary', 'fiverr-freelancing-first-order', 'assignment-thesis-plagiarism-fix']
  },
  {
    slug: 'website-banae-bina-coding',
    queryKeyword: 'ویب سائٹ بنانا',
    titleUrdu: 'بغیر کوڈنگ کے 10 منٹ میں پروفیشنل بزنس پورٹ فولیو اور شاپ ویب سائٹ تیار کریں',
    metaDescriptionUrdu: 'HTML اور CSS سیکھے بغیر AI کی مدد سے موبائل فرینڈلی، تیز ترین ویب سائٹ لانچ کریں۔',
    categoryUrdu: 'کوڈنگ و ویب ڈویلپمنٹ',
    urgencyLevelUrdu: 'بزنس ویب سائٹ لانچ',
    problemSummaryUrdu: 'ویب سائٹ بنانے والے ڈویلپرز 40 ہزار سے ایک لاکھ روپے مانگتے ہیں اور مہینوں لٹکائے رکھتے ہیں جس سے بزنس لانچ نہیں ہو پاتا۔',
    causeAnalysisUrdu: 'جدید AI نو-کوڈ پلیٹ فارمز آپ کے بزنس کا نام اور کیٹیگری پوچھ کر پورا ڈیزائن، ہوسٹنگ اور کنٹیکٹ فارم خودکار بنا دیتے ہیں۔',
    recommendedTools: [
      { name: 'Framer AI', roleUrdu: 'پرامپٹ لکھیں اور دنیا کی سب سے جدید ڈیزائنر ویب سائٹ لائیو', pricingUrdu: 'مفت ہوسٹنگ دستیاب', link: '/category/code', badgeUrdu: 'ڈیزائن کنگ', toolId: 'tool-code-1' },
      { name: '10Web WordPress AI', roleUrdu: 'کسی بھی پسندیدہ ویب سائٹ کو ورڈپریس میں کاپی کرنا', pricingUrdu: 'مفت ٹرائل', link: '/category/code', badgeUrdu: 'ورڈپریس کلونر', toolId: 'tool-code-2' },
      { name: 'v0.dev by Vercel', roleUrdu: 'ٹیکسٹ پرامپٹ سے جدید ویب کمپوننٹس اور پیجز', pricingUrdu: 'مفت دستیاب', link: '/category/code', badgeUrdu: 'کوڈ جنریٹر', toolId: 'tool-code-3' }
    ],
    stepByStepGuideUrdu: [
      'Framer.com پر فری لاگ ان کریں اور "Start with AI" منتخب کریں۔',
      'اپنے کاروبار کا تعارف لکھیں (مثلاً: لاہور میں کیک اور بیکری کی شاپ)۔',
      '10 سیکنڈ میں مکمل ویب سائٹ ریڈی ہو جائے گی۔ رنگ اور اردو ٹیکسٹ اپنی مرضی سے بدلیں۔',
      '"Publish" پر کلک کریں اور مفت سب ڈومین یا اپنا کسٹم ڈومین جوڑ دیں۔'
    ],
    masterPromptUrdu: 'Design a sleek modern responsive landing page for [بزنس کا نام]. Include hero section with booking button, 3 services grid, client testimonials, and WhatsApp floating contact button.',
    relatedProblemSlugs: ['logo-design-masla', 'whatsapp-business-bot', 'fiverr-freelancing-first-order']
  },
  {
    slug: 'urdu-novel-kahani-writing',
    queryKeyword: 'اردو کہانی لکھنا',
    titleUrdu: 'اردو کہانیاں، سسپنس تھرلر ناولز اور ڈراما اسکرپٹس لکھنے کا خودکار AI طریقہ',
    metaDescriptionUrdu: 'پلاٹ آئیڈیا سے لے کر کردار نگاری اور مکالموں تک — یوٹیوب اسٹوریز اور ای بکس کے لیے دلچسپ اردو تحریر۔',
    categoryUrdu: 'تخلیقی تحریر و کہانیاں',
    urgencyLevelUrdu: 'تخلیقی علاج',
    problemSummaryUrdu: 'کہانی کا آئیڈیا تو ہوتا ہے مگر الفاظ کا چناؤ، طویل صفحات کا پلاٹ اور سسپنس کو مسلسل برقرار رکھنا مشکل ہو جاتا ہے۔',
    causeAnalysisUrdu: 'AI ماڈلز کو جب مخصوص ادبی کردار اور موڑ (Plot Twists) بتائے جائیں تو وہ خالص روانی کے ساتھ سحر انگیز اردو میں ابواب تحریر کرتے ہیں۔',
    recommendedTools: [
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'ادبی اردو، دلکش تشبیہات اور کرداروں کے مکالمے', pricingUrdu: 'مفت دستیاب', link: '/category/writing', badgeUrdu: 'ادبی مصنف', toolId: 'tool-write-2' },
      { name: 'ChatGPT 4o', roleUrdu: 'کہانی کا مکمل خاکہ، 10 ابواب اور پلاٹ ٹوئسٹ پلاننگ', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'پلاٹ ماسٹر', toolId: 'tool-write-1' },
      { name: 'ElevenLabs Urdu Voice', roleUrdu: 'کہانی کو خوفناک یا جذباتی آڈیو اسٹوری میں بدلنا', pricingUrdu: 'مفت پلان', link: '/category/voice', badgeUrdu: 'آڈیو کہانی', toolId: 'tool-voice-1' }
    ],
    stepByStepGuideUrdu: [
      'پہلے ChatGPT سے کہیں کہ کہانی کے 3 اہم کردار اور 1 چونکا دینے والا راز طے کرے۔',
      'پھر ہر باب کی الگ آؤٹ لائن بنوائیں تاکہ کہانی میں جھول نہ آئے۔',
      'Claude 3.5 سے ہر باب کو تفصیل اور مکالموں کے ساتھ لکھوائیں۔',
      'یوٹیوب پر اپلوڈ کرنے کے لیے ElevenLabs سے آڈیو لگا کر Leonardo AI سے تصویری مناظر بنائیں۔'
    ],
    masterPromptUrdu: 'ایک پراسرار اردو کہانی کا آغاز لکھیں جو لاہور کی پرانی حویلی سے شروع ہوتی ہے۔ منظر نگاری میں بارش، رات کا سناٹا اور تجسس کا ماحول ہو، زبان شستہ اور ادبی ہو۔',
    relatedProblemSlugs: ['urdu-voiceover-audio-cleaning', 'youtube-short-automation', 'mere-views-nahi-aa-rahe']
  },
  {
    slug: 'social-media-instagram-growth',
    queryKeyword: 'انسٹاگرام گروتھ',
    titleUrdu: 'انسٹاگرام فالوورز اور انگیجمنٹ بڑھانے کا آرگینک فارمولا — 30 دن کا AI شیڈول',
    metaDescriptionUrdu: 'بغیر فیک فالوورز خریدے اوریجنل آڈینس حاصل کریں، وائرل کیروسل پوسٹس اور کیپشنز تیار کریں۔',
    categoryUrdu: 'سوشل میڈیا مارکیٹنگ',
    urgencyLevelUrdu: 'آرگینک گروتھ پلان',
    problemSummaryUrdu: 'روزانہ پوسٹنگ کے باوجود نہ فالوورز بڑھتے ہیں اور نہ لائکس، پوسٹ کی ریچ صرف چند دوستوں تک محدود رہتی ہے۔',
    causeAnalysisUrdu: 'انسٹاگرام کیروسل (Carousel) پوسٹس کو زیادہ وقت اسکرین پر رکھنے کی وجہ سے وائرل کرتا ہے۔ شیئر ایبل اور سیو ایبل کنٹینٹ ریچ بڑھاتا ہے۔',
    recommendedTools: [
      { name: 'Canva Carousel Maker', roleUrdu: '10 سلائیڈز پر مشتمل سکرول اسٹاپنگ کیروسل پوسٹس', pricingUrdu: 'مفت', link: '/category/design', badgeUrdu: 'کیروسل پرو', toolId: 'tool-design-1' },
      { name: 'ChatGPT 4o', roleUrdu: '30 دن کا کنٹینٹ کیلنڈر اور کال ٹو ایکشن کیپشنز', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'کنٹینٹ پلانر', toolId: 'tool-write-1' },
      { name: 'CapCut Reels', roleUrdu: 'ٹرینڈنگ آڈیوز پر تیز کٹس والی ویڈیوز', pricingUrdu: 'مفت', link: '/category/video', badgeUrdu: 'ریلز بوسٹر', toolId: 'tool-video-2' }
    ],
    stepByStepGuideUrdu: [
      'اپنے فیلڈ کے 5 معلوماتی نکات چنیں جنہیں لوگ محفوظ کرنا چاہیں۔',
      'Canva پر جا کر سلائیڈ بائی سلائیڈ ڈیزائن کریں تاکہ اگلی سلائیڈ دیکھنے کا تجسس برقرار رہے۔',
      'پوسٹ کے نیچے ایسا سوال پوچھیں جس پر لوگ کمنٹ کرنے پر مجبور ہوں۔',
      'ہفتے میں کم از کم 4 ریلز اور 3 کیروسلز پابندی سے لگائیں۔'
    ],
    masterPromptUrdu: 'Create a 30-day Instagram content calendar for a Pakistani creator in [کیٹیگری]. For each day specify: Post format (Reel vs Carousel), Hook line, and Call to action to follow.',
    relatedProblemSlugs: ['mere-views-nahi-aa-rahe', 'youtube-short-automation', 'facebook-ad-copywriting']
  },
  {
    slug: 'crypto-stock-trading-chart-analysis',
    queryKeyword: 'کرپٹو اور اسٹاک تجزیہ',
    titleUrdu: 'کرپٹو، فاریکس اور پاکستان اسٹاک ایکسچینج (PSX) چارٹ اینالیسس میں AI سے مدد لیں',
    metaDescriptionUrdu: 'سپورٹ اور ریزسٹنس، ٹرینڈ لائنز اور ٹریڈنگ حکمت عملی کا خودکار ڈیٹا تجزیہ۔',
    categoryUrdu: 'فنانس و انویسٹمنٹ',
    urgencyLevelUrdu: 'فنانشل انٹیلی جنس',
    problemSummaryUrdu: 'ٹریڈنگ میں جذبات میں آ کر فیصلے کرنے سے نقصان ہوتا ہے اور تکنیکی انڈیکیٹرز سمجھنا نوآموز ٹریڈرز کے لیے مشکل ہوتا ہے۔',
    causeAnalysisUrdu: 'کامیاب ٹریڈنگ رسک مینجمنٹ اور ریاضیاتی ڈیٹا پر مبنی ہوتی ہے۔ AI چارٹ پیٹرن اور تاریخی ڈیٹا کا موازنہ کر کے محفوظ فیصلے میں مدد دیتا ہے۔',
    recommendedTools: [
      { name: 'TradingView AI Scripts', roleUrdu: 'خودکار بائے/سیل سگنلز اور سپورٹ لیولز', pricingUrdu: 'مفت پلان', link: '/category/finance', badgeUrdu: 'چارٹ ماسٹر', toolId: 'tool-fin-1' },
      { name: 'ChatGPT Code Interpreter', roleUrdu: 'تاریخی ڈیٹا اور رسک ٹو ریوارڈ ریشو کا حساب', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'ڈیٹا میتھ', toolId: 'tool-write-1' },
      { name: 'Perplexity AI', roleUrdu: 'عالمی مالیاتی خبروں اور افراط زر کے اثرات کا فوری جائزہ', pricingUrdu: 'مفت', link: '/category/chatbot', badgeUrdu: 'نیوز ٹریکر', toolId: 'tool-chat-3' }
    ],
    stepByStepGuideUrdu: [
      'کبھی بھی AI کے کہنے پر اندھا دھند ٹریڈ نہ لگائیں، بلکہ اسے محض تجزیاتی اسسٹنٹ کے طور پر لیں۔',
      'چارٹ کا اسکرین شاٹ لے کر AI سے اہم سپورٹ اور ریزسٹنس پوائنٹس کی تصدیق کروائیں۔',
      'ہمیشہ اپنے کل کیپیٹل کے 2 فیصد سے زیادہ رسک فی ٹریڈ نہ لیں۔',
      'اسٹاپ لاس (Stop Loss) لگانا لازمی اصول بنائیں۔'
    ],
    masterPromptUrdu: 'Explain the current technical chart patterns (e.g. Double Bottom, RSI Divergence) in simple Urdu with proper risk management rules and stop loss placement logic.',
    relatedProblemSlugs: ['excel-complex-formulas-automation', 'fiverr-freelancing-first-order', 'assignment-thesis-plagiarism-fix']
  },
  {
    slug: 'ai-prompt-engineering-mastery',
    queryKeyword: 'پرامپٹ انجینئرنگ سیکھنا',
    titleUrdu: 'پرامپٹ انجینئرنگ کے 4 سنہری اصول — AI سے 100% درست اور جادوئی جوابات حاصل کریں',
    metaDescriptionUrdu: 'عام پرامپٹس کو پروفیشنل ماسٹر پرامپٹ میں بدلنے کا طریقہ سیکھیں اور AI سے سونا اگلوانا جانیں۔',
    categoryUrdu: 'AI مہارتیں و ٹپس',
    urgencyLevelUrdu: 'بنیادی کور مہارت',
    problemSummaryUrdu: 'لوگ ایک لائن کا عام سوال پوچھتے ہیں اور AI عمومی یا غلط جواب دے دیتا ہے، جس سے وہ سمجھتے ہیں کہ AI بیکار ہے۔',
    causeAnalysisUrdu: 'AI آئینہ ہے۔ جیسا پرامپٹ دیں گے ویسا ہی عکس ملے گا۔ جب آپ رول، بیک گراؤنڈ اور آؤٹ پٹ کا سانچہ بتاتے ہیں تو جواب شاندار ہو جاتا ہے۔',
    recommendedTools: [
      { name: 'ChatGPT 4o', roleUrdu: 'مستقل گفتگو اور فالو اپ ریفائنمنٹ', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'پرامپٹ ٹیسٹر', toolId: 'tool-write-1' },
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'منطقی، باریک بین اور طویل تحریری پرامپٹس', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'ڈیٹیل ماسٹر', toolId: 'tool-write-2' },
      { name: 'Midjourney v6.1', roleUrdu: 'بصری تصاویر اور سنیماٹک کیمرہ پرامپٹس', pricingUrdu: 'پیڈ سروس', link: '/category/image', badgeUrdu: 'ویژول پرامپٹ', toolId: 'tool-img-1' }
    ],
    stepByStepGuideUrdu: [
      'ہمیشہ کردار متعین کریں: "تم پاکستان کے ٹاپ بزنس اسٹریٹجسٹ ہو..."',
      'مقصد اور سیاق و سباق بتائیں: "میری بیکری ہے اور عید کے لیے پلان چاہیے..."',
      'فارمیٹ واضح کریں: "جواب کو بلٹ پوائنٹس اور PKR اخراجات میں لکھو..."',
      'AI سے کہیں: "اگر کوئی معلومات کم ہے تو مجھ سے 3 سوال پوچھو۔"'
    ],
    masterPromptUrdu: 'Act as an expert Prompt Engineer. I want to accomplish [ہدف درج کریں]. Create the ultimate, ultra-detailed master prompt that I should feed into an LLM to get the highest quality output possible.',
    relatedProblemSlugs: ['mere-views-nahi-aa-rahe', 'fiverr-freelancing-first-order', 'assignment-thesis-plagiarism-fix']
  },
  {
    slug: 'cold-email-international-clients',
    queryKeyword: 'کولڈ ای میل کلائنٹس',
    titleUrdu: 'بیرونی ممالک کے کلائنٹس کو کولڈ ای میل بھیج کر 1000 ڈالر کے پروجیکٹس حاصل کریں',
    metaDescriptionUrdu: 'امریکی و یورپی کلائنٹس کے لیے پرسنلائزڈ ای میلز جو اسپام فولڈر میں نہ جائیں اور جن کا فوری جواب ملے۔',
    categoryUrdu: 'فری لانسنگ و آؤٹ ریچ',
    urgencyLevelUrdu: 'ہائی پےئنگ کلائنٹس',
    problemSummaryUrdu: 'سینکڑوں ای میلز بھیجنے کے باوجود کوئی کلائنٹ جواب نہیں دیتا اور محنت ضائع ہو جاتی ہے۔',
    causeAnalysisUrdu: 'روایتی ای میلز لمبی اور بورنگ ہوتی ہیں۔ کلائنٹ کے پاس 10 سیکنڈ ہوتے ہیں۔ جب آپ پہلی 2 لائنوں میں ان کی ویب سائٹ کا ایک مسئلہ اور اس کا مفت حل پیش کرتے ہیں تو وہ جواب دیتے ہیں۔',
    recommendedTools: [
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'نیچرل، غیر روبوٹک اور انتہائی دوستانہ ای میلز', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'ای میل رائٹر', toolId: 'tool-write-2' },
      { name: 'Apollo.io / Hunter', roleUrdu: 'کسی بھی کمپنی کے سی ای او یا مارکیٹنگ ہیڈ کا اصلی ای میل نکالنا', pricingUrdu: 'مفت سرچز', link: '/category/email', badgeUrdu: 'ای میل فائنڈر', toolId: 'tool-email-1' },
      { name: 'Instantly AI', roleUrdu: 'خودکار وارم اپ اور بلک میں اسپام سے محفوظ ڈیلیوری', pricingUrdu: 'مفت ٹرائل', link: '/category/email', badgeUrdu: 'ان باکس گارنٹی', toolId: 'tool-email-2' }
    ],
    stepByStepGuideUrdu: [
      'کلائنٹ کی ویب سائٹ یا انسٹاگرام سے 1 واضح خامی تلاش کریں۔',
      'ای میل کا سبجیکٹ لائن مختصر رکھیں (جیسے: Quick question about [Company Name])۔',
      'ای میل صرف 4 جملوں پر مشتمل ہو جس میں ان کا فائدہ واضح ہو۔',
      'آخر میں کال یا مفت آڈٹ کی پیشکش کریں۔'
    ],
    masterPromptUrdu: 'Write a short 75-word personalized cold email to the owner of [کمپنی کا نام]. Point out that their website lacks a mobile lead capture form, offer to fix it for free or show a demo, and suggest a 5-minute call.',
    relatedProblemSlugs: ['fiverr-freelancing-first-order', 'facebook-ad-copywriting', 'website-banae-bina-coding']
  },
  {
    slug: 'kids-story-book-amazon-kdp',
    queryKeyword: 'بچوں کی تصویری کتاب بنانا',
    titleUrdu: 'ایمیزون کے ڈی پی (Amazon KDP) کے لیے بچوں کی تصویری کتابیں AI سے بنائیں اور رائلٹی کمائیں',
    metaDescriptionUrdu: 'کہانی، رنگ برنگی عکاسی اور پی ڈی ایف فارمیٹنگ — ڈالر کمانے کا ثابت شدہ غیر فعال طریقہ۔',
    categoryUrdu: 'ای بکس و پیسیو انکم',
    urgencyLevelUrdu: 'ڈالر رائلٹی فارمولا',
    problemSummaryUrdu: 'بچوں کی کتاب بنوانے کے لیے تصویری السٹریٹر کو لاکھوں روپے دینے پڑتے ہیں جس کی وجہ سے نئے لوگ آغاز نہیں کر پاتے۔',
    causeAnalysisUrdu: 'مڈجرنی اور کلاڈ اب ایک جیسے کردار کی تسلسل کے ساتھ مختلف پوز میں تصاویر بنانے کی صلاحیت رکھتے ہیں، جس سے مکمل 24 صفحات کی کتاب تیار ہو جاتی ہے۔',
    recommendedTools: [
      { name: 'Midjourney Character Consistency', roleUrdu: 'ایک جیسے کارٹون کردار کی تسلسل سے تصاویر', pricingUrdu: 'پیڈ ماڈل', link: '/category/image', badgeUrdu: 'السٹریٹر', toolId: 'tool-img-1' },
      { name: 'Claude 3.5 Sonnet', roleUrdu: 'بچوں کے لیے سبق آموز اور پرلطف انگریزی/اردو نظمیں و کہانیاں', pricingUrdu: 'مفت', link: '/category/writing', badgeUrdu: 'اسٹوری میکر', toolId: 'tool-write-2' },
      { name: 'Canva KDP Book Creator', roleUrdu: 'ایمیزون پرنٹ ریڈی سائزنگ اور پی ڈی ایف ایکسپورٹ', pricingUrdu: 'مفت', link: '/category/design', badgeUrdu: 'بک فارمیٹر', toolId: 'tool-design-1' }
    ],
    stepByStepGuideUrdu: [
      'Claude سے 4 تا 8 سال کے بچوں کے لیے 12 ابواب کی سبق آموز نظم یا کہانی لکھوائیں۔',
      'کردار کا حلیہ اور کپڑے فکس کر کے مڈجرنی سے ہر منظر کی عکاسی کروائیں۔',
      'Canva پر 8.5x8.5 انچ کا پیج سائز رکھ کر تصویر اور ٹیکسٹ سیٹ کریں۔',
      'Amazon KDP پر فری اکاؤنٹ بنا کر اپلوڈ کریں اور گھر بیٹھے ڈالر رائلٹی وصول کریں۔'
    ],
    masterPromptUrdu: 'Write a charming 12-page children rhyming bedtime story about a curious little sparrow named Chippy who learns the value of sharing. Include vivid visual illustration descriptions for each page.',
    relatedProblemSlugs: ['urdu-novel-kahani-writing', 'urdu-voiceover-audio-cleaning', 'logo-design-masla']
  }
];

export function getDoctorProblemBySlug(slug: string): DoctorSeoProblem | undefined {
  return DOCTOR_PROBLEMS_20.find(p => p.slug === slug || p.slug.includes(slug) || slug.includes(p.slug));
}
