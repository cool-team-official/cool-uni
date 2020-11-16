const __stoage_timer = {};

export default {
	suffix: "_deadtime",

	isExpired() {
		const { keys } = uni.getStorageInfoSync();
		const nowTime = Date.parse(new Date());

		// clear timer
		Object.keys(__stoage_timer).forEach(clearTimeout);

		// set timer
		keys.filter(e => e.includes(this.suffix)).map(k => {
			const value = uni.getStorageSync(k);

			__stoage_timer[k] = setTimeout(
				() => {
					uni.removeStorageSync(k.split("_")[0]);
				},
				value - nowTime > 86400000 ? 86400000 : value - nowTime
			);
		});
	},

	set(key, value, expires) {
		uni.setStorageSync(key, value);

		if (expires) {
			uni.setStorageSync(`${key}${this.suffix}`, Date.parse(new Date()) + expires * 1000);
		}
	}
};
