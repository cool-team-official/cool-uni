const __stoage_timer = {};

export default {
	// 后缀标识
	suffix: "_deadtime",

	/**
	 * 判断是否过期
	 */
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

	/**
	 * 设置缓存
	 * @param {*} key 关键字
	 * @param {*} value 值
	 * @param {*} expires 过期时间
	 */
	set(key, value, expires) {
		uni.setStorageSync(key, value);

		if (expires) {
			uni.setStorageSync(`${key}${this.suffix}`, Date.parse(new Date()) + expires * 1000);
		}
	}
};
