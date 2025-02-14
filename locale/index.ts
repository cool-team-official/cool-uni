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

// 小程序、APP不支持{}占位符，用该方法替换 useI18n.t
function t(name: string, data?: any) {
	let d = i18n.global.t(name, data);

	if (data) {
		for (const i in data) {
			d = d.replace(`{${i}}`, data[i]);
		}
	}
	return d;
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
