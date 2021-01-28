// 是否开发模式
export const isDev = process.env.NODE_ENV == "development"

// 是否Array类型
export function isArray(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

// 是否Object类型
export function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}

// 是否Function类型
export function isFunction(value) {
	return typeof value === "function";
}

// 是否String类型
export function isString(value) {
	return typeof value === "string";
}

// 是否null类型
export function isNull(value) {
	return !value && value !== 0;
}

// 是否Boolean类型
export function isBoolean(value) {
	return typeof value === "boolean";
}

// 是否数字类型
export function isNumber(value) {
	return typeof value === "number" && !isNaN(value);
}

// 是否小数
export function isDecimal(value) {
	return String(value).length - String(value).indexOf(".") + 1;
}

// 是否Promise类型
export function isPromise(obj) {
	obj !== null &&
		(typeof obj === "object" || typeof obj === "function") &&
		typeof obj.then === "function";
}

// 是否为空
export function isEmpty(value) {
	if (isArray(value)) {
		return value.length === 0;
	}

	if (isObject(value)) {
		return Object.keys(value).length === 0;
	}

	return value === "" || value === undefined || value === null;
}

// 取最后一个值
export function last(data) {
	if (isArray(data) || isString(data)) {
		return data[data.length - 1];
	}
}

// 首字母大写
export function firstUpperCase(value) {
	return value.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
		return $1.toUpperCase() + $2.toLowerCase();
	});
}

// 防抖
export function debounce(fn, wait, immediate) {
	let timer;
	return function () {
		if (timer) clearTimeout(timer);
		if (immediate) {
			var callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			if (callNow) {
				fn.apply(this, arguments);
			}
		} else {
			timer = setTimeout(() => {
				fn.apply(this, arguments);
			}, wait);
		}
	};
}

// 比较值
export function compareValue(a, b) {
	return String(a) === String(b);
}

// 深拷贝
export function cloneDeep(v) {
	if (isObject(v)) {
		let d = {};

		for (let k in v) {
			if (v.hasOwnProperty && v.hasOwnProperty(k)) {
				if (v[k] && typeof v[k] === "object") {
					d[k] = cloneDeep(v[k]);
				} else {
					d[k] = v[k];
				}
			}
		}

		return d;
	} else if (isArray(v)) {
		return v.map(cloneDeep);
	} else {
		return v;
	}
}

// 深度合并
export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

// 获取当前页面信息
export function getCurrentPage() {
	const { route, $page, options, $route } = last(getCurrentPages());

	return {
		path: `/${route}`,
		fullPath: $page.fullPath,
		// #ifdef MP
		query: options,
		// #endif
		// #ifdef H5
		query: $route.params
		// #endif
	};
}

/**
 * 解析rpx
 * @param {*} val
 */
export function parseRpx(val) {
	return isArray(val) ? val.map(parseRpx).join(" ") : isNumber(val) ? val + "rpx" : val;
}

/**
 * 获取父级节点
 * @param {*} name componentName
 * @param {*} keys 保留的参数，避免 computed 非 H5 解析失败
 */
export function getParent(name, keys) {
	let parent = this.$parent;

	while (parent) {
		if (parent.$options.componentName !== name) {
			parent = parent.$parent;
		} else {
			return keys.reduce((result, key) => {
				result[key] = parent[key];
				return result;
			}, {});
		}
	}

	return null;
}

/**
 * 获取当前颜色
 *
 * @param {*} { color, max, value }
 */
export function getCurrentColor({ color, max, value }) {
	if (isString(color)) {
		return color;
	} else {
		const colorArray = color
			.map((item, index) => {
				if (isString(item)) {
					return {
						color: item,
						value: (index + 1) * (max / color.length)
					};
				}
				return item;
			})
			.sort((a, b) => a.value - b.value);

		for (let i = 0; i < colorArray.length; i++) {
			if (colorArray[i].value >= value) {
				return colorArray[i].color;
			}
		}

		return colorArray[colorArray.length - 1].color;
	}
}

// 获取地址栏参数
export function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// 根据某个字段排序
export function orderBy(list, key) {
	return list.sort((a, b) => a[key] - b[key]);
}
