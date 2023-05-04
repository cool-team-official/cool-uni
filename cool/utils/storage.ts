export const storage = {
	// 后缀标识
	suffix: "_deadtime",

	/**
	 * 获取
	 * @param {*} key 关键字
	 */
	get(key: string): any {
		return uni.getStorageSync(key);
	},

	/**
	 * 获取全部
	 */
	info() {
		const { keys } = uni.getStorageInfoSync();
		const d: any = {};

		keys.forEach((e: string) => {
			d[e] = uni.getStorageSync(e);
		});

		return d;
	},

	/**
	 * 设置
	 * @param {*} key 关键字
	 * @param {*} value 值
	 * @param {*} expires 过期时间
	 */
	set(key: string, value: any, expires?: number): void {
		uni.setStorageSync(key, value);

		if (expires) {
			uni.setStorageSync(
				`${key}${this.suffix}`,
				Date.parse(String(new Date())) + expires * 1000
			);
		}
	},

	/**
	 * 是否过期
	 * @param {*} key 关键字
	 */
	isExpired(key: string): boolean {
		return uni.getStorageSync(`${key}${this.suffix}`) - Date.parse(String(new Date())) <= 0;
	},

	/**
	 * 删除
	 * @param {*} key 关键字
	 */
	remove(key: string) {
		return uni.removeStorageSync(key);
	},

	/**
	 * 清理
	 */
	clear() {
		uni.clearStorageSync();
	},

	/**
	 * 获取一次后删除
	 */
	once(key: string) {
		const value = this.get(key);
		this.remove(key);
		return value;
	},
};
