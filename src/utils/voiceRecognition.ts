// Real Speech Recognition Helper with getUserMedia Mic Permission

export interface VoiceOptions {
  onStart?: () => void;
  onListening?: () => void;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
  onToast?: (message: string) => void;
  lang?: string;
}

export function startVoiceListening(
  inputElement: HTMLInputElement | null,
  callback: (transcript: string) => void,
  options?: VoiceOptions
) {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    const errorMsg = "یہ فیچر صرف Chrome براؤزر میں کام کرتا ہے، براہ کرم Chrome میں کھولیں";
    if (options?.onToast) options.onToast(errorMsg);
    if (options?.onError) options.onError(errorMsg);
    return;
  }

  // First request mic permission properly inside user gesture
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    const errorMsg = "آپ کا براؤزر مائیکروفون کی اجازت سپورٹ نہیں کرتا، براہ کرم جدید Chrome استعمال کریں۔";
    if (options?.onToast) options.onToast(errorMsg);
    if (options?.onError) options.onError(errorMsg);
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // Mic permission granted cleanly
      stream.getTracks().forEach((track) => track.stop()); // release media track

      if (options?.onToast) {
        options.onToast("مائیک آن ہو گیا، اب بولیں 🎤");
      }

      const recognition = new SpeechRecognition();
      recognition.lang = options?.lang || 'ur-PK';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        if (inputElement) {
          inputElement.placeholder = "🎤 سن رہا ہوں... بولیں...";
        }
        if (options?.onStart) options.onStart();
        if (options?.onListening) options.onListening();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (inputElement) {
          inputElement.value = transcript;
        }
        if (options?.onResult) options.onResult(transcript);
        if (callback) callback(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Voice recognition event error:", event.error);

        let friendlyUrdu = "آواز ریکارڈ نہیں ہو سکی، دوبارہ بولیں";
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          friendlyUrdu = "مائیک کی اجازت درکار ہے — براہ کرم براؤزر میں Allow مائیکروفون پر کلک کریں 🎤";
        } else if (event.error === 'no-speech') {
          friendlyUrdu = "کوئی آواز موصول نہیں ہوئی، دوبارہ بولیں 🎤";
        } else if (event.error === 'network') {
          friendlyUrdu = "انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں";
        }

        if (options?.onToast) options.onToast(friendlyUrdu);
        if (options?.onError) options.onError(friendlyUrdu);
      };

      recognition.onend = () => {
        if (inputElement) {
          inputElement.placeholder = "اپنا مسئلہ بتائیں یا سرچ کریں";
        }
        if (options?.onEnd) options.onEnd();
      };

      recognition.start();
    })
    .catch((err) => {
      console.error("Mic permission error:", err);
      const friendlyMsg = "مائیکروفون کی اجازت نہیں ملی — براہ کرم براؤزر کی سیٹنگز میں مائیک Allow کریں 🎤";
      if (options?.onToast) options.onToast(friendlyMsg);
      if (options?.onError) options.onError(friendlyMsg);
    });
}

