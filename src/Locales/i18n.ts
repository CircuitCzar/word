import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationCn from './Translations/cn/translation.json';
import translationEn from './Translations/en/translation.json';

const resources = {
    en: {
        translation: translationEn,
    },
    cn: {
        translation: translationCn,
    },
};

void i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
