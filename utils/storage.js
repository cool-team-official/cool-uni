export default {
	// 后缀标识
	suffix: "_deadtime",

	/**
	 * 获取
	 * @param {*} key 关键字
	 */
	get(key) {
		return uni.getStorageSync(key)
	},

	/**
	 * 获取全部
	 */
	info() {
		return uni.getStorageInfoSync()
	},

	/**
	 * 设置
	 * @param {*} key 关键字
	 * @param {*} value 值
	 * @param {*} expires 过期时间
	 */
	set(key, value, expires) {
		uni.setStorageSync(key, value);

		if (expires) {
			uni.setStorageSync(`${key}${this.suffix}`, Date.parse(new Date()) + expires * 1000);
		}
	},

	/**
	 * 是否过期
	 * @param {*} key 关键字
	 */
	isExpired(key) {
		return uni.getStorageSync(`${key}${this.suffix}`) - Date.parse(new Date()) <= 0;
	},

	/**
	 * 移除
	 * @param {*} key 关键字
	 */
	remove(key) {
		return uni.removeStorageSync(key)
	},

	/**
	 * 清理
	 */
	clear() {
		uni.clearStorageSync()
	}
};
