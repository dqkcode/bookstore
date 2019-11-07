import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
// import esLang from './entries/es-ES';
// import enRtlLang from './entries/en-US-rtl';
import viLang from './entries/vi-VN';

const AppLocale = {
    en: enLang,
    // es: esLang,
    // enrtl:enRtlLang,
    vi: viLang
};
addLocaleData(AppLocale.en.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.enrtl.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
