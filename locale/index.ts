import { createI18n } from "vue-i18n";
import zhHans from "./zh-Hans.json";
import zhHant from "./zh-Hant.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";

const i18n = createI18n({
	locale: uni.getLocale(),

	// 配置后，使用命令 cool-i18n create 翻译，会自动更新 locale 目录
	messages: {
		"zh-Hans": zhHans,
		"zh-Hant": zhHant,
		en,
		es,
	},
});

const localeMap: { [key: string]: string } = {
	"zh-Hans": "zh-cn",
	"zh-Hant": "zh-tw",
};

function t(name: string, data?: any) {
	let d = i18n.global.t(name, data);

	if (data) {
		for (const i in data) {
			d = d.replace(`{${i}}`, data[i]);
		}
	}
	return d;
}

function setLocale(locale: string) {
	uni.setLocale(locale);
	i18n.global.locale = locale;
}

function getLocale(): string {
	const locale = uni.getLocale();

	for (const i in localeMap) {
		if (i == locale) {
			return localeMap[i];
		}
	}

	return locale;
}

export { i18n, t, setLocale, getLocale };
