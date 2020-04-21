export function isArray(value) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
}

export function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function isFunction(value) {
	return typeof value === 'function';
}

export function isString(value) {
	return typeof value === 'string';
}

export function isNull(value) {
	return !value && value !== 0;
}

export function isBoolean(value) {
	return typeof value === 'boolean';
}

export function isNumber(value) {
	return typeof value === 'number' && !isNaN(value);
}

export function isPromise(obj) {
	obj !== null &&
		(typeof obj === 'object' || typeof obj === 'function') &&
		typeof obj.then === 'function';
}

export function isEmpty(value) {
	if (isArray(value)) {
		return value.length === 0;
	}

	if (isObject(value)) {
		return Object.keys(value).length === 0;
	}

	return value === '' || value === undefined || value === null;
}

export function compareValue(a, b) {
	return String(a) === String(b);
}

export function cloneDeep(v) {
	let d = v;

	if (isObject(v)) {
		for (let k in v) {
			if (v.hasOwnProperty && v.hasOwnProperty(k)) {
				if (v[k] && typeof v[k] === 'object') {
					d[k] = cloneDeep(v[k]);
				} else {
					d[k] = v[k];
				}
			}
		}
	} else if (isArray(v)) {
		d = v.map(cloneDeep);
	}

	return d;
}

/**
 * 获取父级节点
 * @param {*} name componentName
 * @param {*} keys 保留的参数
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
 * 检查数据变化的表单
 *
 * @param {*} d1 新数据
 * @param {*} d2 旧数据
 */
export function diffForm(d1, d2) {
	const deep = (d1, d2) => {
		if (isArray(d2)) {
			if (isArray(d1)) {
				if (d2.length === d1.length) {
					return !d2.some((v, i) => {
						return !deep(d2[i], d1[i]);
					});
				}
			}

			return false;
		}

		if (isObject(d2)) {
			if (isObject(d1)) {
				let flag = true;

				for (let i in d2) {
					flag = deep(d2[i], d1[i]);

					if (!flag) {
						return false;
					}
				}

				return true;
			}

			return false;
		}

		if (isString(d2)) {
			return d1 === d2;
		}

		if (isNumber(d2)) {
			return d1 === d2;
		}

		if (isBoolean(d2)) {
			return d1 === d2;
		}
	};

	return Object.keys(d2).filter(k => {
		return !deep(d1[k], d2[k]);
	});
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
