export interface DoctorDiagnosis {
  queryKeyword: string;
  problemTitleUrdu: string;
  doctorPrescriptionUrdu: string;
  urgencyLevelUrdu: string;
  recommendedToolNames: string[];
  masterPromptUrdu: string;
  actionStepsUrdu: string[];
  estimatedCostPKR: string;
}

export const PRESET_DIAGNOSES: DoctorDiagnosis[] = [
  {
    queryKeyword: 'لوگو بنانا',
    problemTitleUrdu: 'لوگو ڈیزائن اور برانڈ شناخت کا مسئلہ',
    doctorPrescriptionUrdu: 'تشخیص: آپ کے برانڈ کو ایک صاف ستھرا اور یادگار لوگو درکار ہے جو سوشل میڈیا اور وزٹنگ کارڈ دونوں پر نمایاں رہے۔ اس کے لیے کسی مہنگی ایجنسی کے بجائے Midjourney یا Ideogram اور Recraft کا نسخہ تجویز کیا جاتا ہے۔',
    urgencyLevelUrdu: 'فوری ضرورت (10 منٹ میں حل)',
    recommendedToolNames: ['Midjourney v6.1', 'Ideogram 2.0', 'Recraft.ai'],
    masterPromptUrdu: 'Minimalist modern vector logo for a Pakistani startup brand named [نام یہاں لکھیں], sleek geometric emblem, emerald green and metallic gold color palette, flat white background, sharp clean outlines --no realistic photo, shadows',
    actionStepsUrdu: [
      'Ideogram.ai پر فری لاگ ان کریں اور اوپر دیا گیا ماسٹر پرامپٹ پیسٹ کریں',
      'اپنے برانڈ کا نام لکھیں اور "Typography" موڈ منتخب کریں',
      'پسندیدہ لوگو کو Recraft.ai میں ڈال کر مفت ویکٹر (SVG) فائل ڈاؤنلوڈ کریں',
      'فیس بک اور واٹس ایپ بزنس کی ڈی پی پر فوری لگا لیں'
    ],
    estimatedCostPKR: '0 روپے (100% مفت حل دستیاب)'
  },
  {
    queryKeyword: 'CV لکھنا',
    problemTitleUrdu: 'نوکری کے لیے بین الاقوامی معیار کی CV اور ریزیومے',
    doctorPrescriptionUrdu: 'تشخیص: روایتی CV میں ATS کی ورڈز کی کمی ہے جس کی وجہ سے ایچ آر مینیجر آپ کی درخواست مسترد کر دیتے ہیں۔ Claude 3.5 اور ChatGPT سے ہارورڈ فارمیٹ والی سی وی بنوائیں۔',
    urgencyLevelUrdu: 'اہم علاج',
    recommendedToolNames: ['Claude 3.5 Sonnet', 'ChatGPT 4o', 'Grammarly'],
    masterPromptUrdu: 'آپ ایک ٹاپ ایچ آر ایگزیکٹو ہیں۔ میں آپ کو اپنا موجودہ تعلیمی ریکارڈ اور تجربہ فراہم کر رہا ہوں: [یہاں اپنا کوائف لکھیں]۔ میرے لیے ہارورڈ یونیورسٹی اسٹینڈرڈ پر ایک جدید، ایک صفحے کی ریزیومے تیار کریں جس میں بلٹ پوائنٹس کے اندر ایکشن وربز اور اچیومنٹس واضح ہوں۔',
    actionStepsUrdu: [
      'اوپر دیا گیا پرامپٹ کاپی کر کے Claude 3.5 میں پیسٹ کریں',
      'جس جاب کے لیے اپلائی کر رہے ہیں اس کا ایڈ بھی ساتھ پیسٹ کریں تاکہ کی ورڈز میچ ہو جائیں',
      'تیار شدہ ٹیکسٹ کو Canva یا Word کے سادہ ٹیمپلیٹ میں رکھیں',
      'Grammarly سے پروف ریڈنگ کے بعد پی ڈی ایف محفوظ کر لیں'
    ],
    estimatedCostPKR: 'مفت'
  },
  {
    queryKeyword: 'ویوز نہیں آ رہے',
    problemTitleUrdu: 'یوٹیوب اور ٹک ٹاک پر کم ویوز اور ڈیڈ ریچ کا علاج',
    doctorPrescriptionUrdu: 'تشخیص: الگورتھم کی سب سے بڑی دوا پہلے 3 سیکنڈ کا "ہک" (Hook) اور وائرل کیپشنز ہیں۔ لوگ بور ہو کر اسکرول کر دیتے ہیں۔ Opus Clip اور CapCut AI آپ کے مواد کو مقناطیس بنا دیں گے۔',
    urgencyLevelUrdu: 'ایمرجنسی ویوز تھراپی',
    recommendedToolNames: ['Opus Clip', 'Submagic', 'CapCut AI Features'],
    masterPromptUrdu: 'میری [موضوع یہاں لکھیں] والی ویڈیو کے لیے 5 ایسے زبردست اردو ہکس (Hook Lines) لکھیں جنہیں سنتے ہی دیکھنے والا رک جائے اور پوری ویڈیو دیکھے۔ ہر ہک میں تجسس یا چونکا دینے والی بات ہو۔',
    actionStepsUrdu: [
      'ویڈیو کا آغاز ہمیشہ سوال یا حیران کن بات سے کریں (پہلے 3 سیکنڈ)',
      'CapCut یا Submagic سے متحرک کلر فل کیپشنز آن کریں',
      'طویل ویڈیوز کو Opus Clip میں ڈال کر 30 سیکنڈ کے ہٹ شارٹس نکالیں',
      'پاکستانی وقت کے مطابق شام 7 سے 9 بجے کے درمیان پوسٹ کریں'
    ],
    estimatedCostPKR: '0 روپے تا 2,000 روپے'
  },
  {
    queryKeyword: 'پرامپٹ چاہیے',
    problemTitleUrdu: 'بہترین اور پروفیشنل AI پرامپٹس کا نسخہ',
    doctorPrescriptionUrdu: 'تشخیص: عام پرامپٹ لکھنے سے AI عام جواب دیتا ہے۔ AI سے سونا اگلوانے کے لیے کردار (Role)، مقصد (Task)، تفصیل (Context) اور آؤٹ پٹ فارمیٹ کا طریقہ استعمال کریں۔',
    urgencyLevelUrdu: 'لازمی مہارت',
    recommendedToolNames: ['ChatGPT 4o', 'Claude 3.5 Sonnet', 'Midjourney v6.1'],
    masterPromptUrdu: 'کردار: تم پاکستان کے ٹاپ بزنس اسٹریٹجسٹ ہو۔ ٹاسک: مجھے [اپنا آئیڈیا لکھیں] کے لیے ایک مکمل مارکیٹ لانچ پلان بنا کر دو۔ فارمیٹ: بلٹ پوائنٹس، متوقع اخراجات PKR میں اور خطرات کا سدباب۔',
    actionStepsUrdu: [
      'کبھی بھی ایک لائن کا پرامپٹ نہ دیں، ہمیشہ AI کو اس کا کردار بتائیں',
      'اپنا ہدف اور ٹارگٹ آڈینس واضح کریں',
      'AI سے کہیں کہ اگر اسے کوئی بات سمجھ نہ آئے تو وہ خود آپ سے 3 سوال پوچھے',
      'بہترین جواب ملنے کے بعد اسے پسندیدہ پرامپٹ بک میں محفوظ کر لیں'
    ],
    estimatedCostPKR: '100% مفت'
  },
  {
    queryKeyword: 'ویڈیو ایڈیٹنگ',
    problemTitleUrdu: 'فاسٹ اور اسمارٹ AI ویڈیو ایڈیٹنگ',
    doctorPrescriptionUrdu: 'تشخیص: گھنٹوں بیٹھ کر کٹس لگانے کا دور ختم ہو چکا ہے۔ اب AI خودکار انداز میں خاموشی (Dead Air) کاٹتا ہے، بی رول لگاتا ہے اور آڈیو مکس کرتا ہے۔',
    urgencyLevelUrdu: 'ٹائم سیونگ ٹریٹمنٹ',
    recommendedToolNames: ['CapCut AI Features', 'Runway Gen-3 Alpha', 'Descript Voice Clone'],
    masterPromptUrdu: 'Generate dynamic video script for 60s Instagram Reel explaining [موضوع] with precise visual cues, b-roll descriptions and on-screen text highlights.',
    actionStepsUrdu: [
      'CapCut پر آٹو کٹ اور ریموو سائیلنس کا آپشن منتخب کریں',
      'Descript سے ٹیکسٹ ایڈیٹنگ کی طرح ویڈیو کے فالتو الفاظ کاٹیں',
      'ایڈوبی پوڈکاسٹ سے بیک گراؤنڈ شور ختم کریں',
      '9:16 فارمیٹ اور 60fps میں ایکسپورٹ کریں'
    ],
    estimatedCostPKR: 'مفت'
  }
];

export function diagnoseUserQuery(query: string): DoctorDiagnosis {
  const trimmed = query.trim().toLowerCase();
  
  // Look for direct match
  const match = PRESET_DIAGNOSES.find(d => 
    trimmed.includes(d.queryKeyword.toLowerCase()) || 
    d.queryKeyword.toLowerCase().includes(trimmed)
  );

  if (match) return match;

  // Smart dynamic diagnosis for any user query
  return {
    queryKeyword: query || 'عام رہنمائی',
    problemTitleUrdu: `"${query || 'آپ کی ضرورت'}" کے لیے AI ڈاکٹر کا تجزیہ`,
    doctorPrescriptionUrdu: `تشخیص: آپ نے "${query}" کے بارے میں پوچھا ہے۔ AI ڈاکٹر نے تجزیہ کیا ہے کہ جدید جنریٹو AI ٹولز اس کام کو دستی محنت کے مقابلے میں 90% کم وقت میں مکمل کر سکتے ہیں۔ آپ کے لیے بہترین ماڈل اور پرامپٹ درج ذیل ہے۔`,
    urgencyLevelUrdu: 'معیاری نسخہ (آسان نفاذ)',
    recommendedToolNames: ['ChatGPT 4o', 'Claude 3.5 Sonnet', 'Canva Magic Studio'],
    masterPromptUrdu: `آپ ایک سینیئر ماہر اور کنسلٹنٹ ہیں۔ میرا ہدف ہے: "${query}"۔ میرے لیے پاکستان کے تناظر میں مرحلہ وار گائیڈ، درکار وسائل اور فوری نتیجہ حاصل کرنے کا فارمولا فراہم کریں۔`,
    actionStepsUrdu: [
      'درج بالا ماسٹر پرامپٹ کو اپنے مطلوبہ AI ٹول میں پیسٹ کریں',
      'اپنی مخصوص تفصیلات شامل کر کے جنریٹ کا بٹن دبائیں',
      'نتائج کا جائزہ لیں اور بہتری کے لیے فالو اپ ہدایات دیں',
      'ضرورت پڑنے پر ہمارے واٹس ایپ گروپ سے مفت مدد حاصل کریں'
    ],
    estimatedCostPKR: '0 سے 2,500 روپے'
  };
}
