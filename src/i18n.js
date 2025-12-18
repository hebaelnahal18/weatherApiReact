import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          greeting: "Hello",
          temp: "Temperature",
          feelsLike: "Feels Like",
          humidity: "Humidity",
        },
      },
      ar: {
        translation: {
          "Cairo":"القاهرة",
           "min":"الصغرى",
           "max":"الكبرى",
          "broken clouds":"الغيوم المكسورة",
              "clear sky":"سماء صافية",
    "few clouds":"عدد قليل من السحب",
    "scattered clouds":"سحب متفرقة",
     "shower rain":"مطر متقطع",
      "rain":"مطر",
       "thunderstorm":"عاصفة رعدية",
       "snow":"ثلج",
       "mist":"ضباب",
          greeting: "مرحبا",
          temp: "الحرارة",
          feelsLike: "تشعر كأنها",
          humidity: "الرطوبة",
        },
      },
    },
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
