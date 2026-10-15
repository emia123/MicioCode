import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

const resources = Object.entries(translations).reduce((acc, [lang, data]) => {
  acc[lang] = { translation: data };
  return acc;
}, {} as any);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

import { updateBlocklyLanguage } from './blocklyI18n';
updateBlocklyLanguage('it');

export default i18n;
