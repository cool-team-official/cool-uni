import { createI18n } from "vue-i18n";
import zhHans from "./zh-Hans.json";
import zhHant from "./zh-Hant.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";

const i18n = createI18n({
	locale: uni.getLocale(),
	messages: {
		"zh-Hans": zhHans,
		"zh-Hant": zhHant,
		en,
	},
	legacy: false,
	globalInjection: true,
});

function t(name: string, data?: any) {
	return i18n.global.t(name, data);
}

function getLocale(): string {
	const locale = uni.getLocale();

	const localeMap: any = {
		"zh-Hans": "zh-cn",
		"zh-Hant": "zh-tw",
	};

	for (const i in localeMap) {
		if (i == locale) {
			return localeMap[i];
		}
	}

	return locale;
}

export { i18n, t, getLocale };
