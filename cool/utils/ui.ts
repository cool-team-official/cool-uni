import { isArray, isEmpty, isNumber } from "lodash-es";
import { computed, getCurrentInstance, nextTick } from "vue";

// 获取父组件
export function getParent(name: string, k1: string[], k2?: string[]) {
	const { proxy }: any = getCurrentInstance();

	const next = () => {
		let parent = proxy.$parent;

		while (parent) {
			if (parent.$options.name !== name) {
				parent = parent.$parent;
			} else {
				if (!isEmpty(k2)) {
					nextTick(() => {
						const child: any = {};

						(k2 || []).map((key: string) => {
							if (proxy[key]) {
								child[key] = proxy[key];
							}
						});

						if (!parent.__children) {
							parent.__children = [];
						}

						if (!isEmpty(child)) {
							parent.__children.push(child);
						}
					});
				}

				return (k1 || []).reduce((res: any, key: string) => {
					res[key] = parent[key];
					return res;
				}, {});
			}
		}

		return parent;
	};

	return computed(() => next());
}

// 获取元素位置信息
export async function getRect(selector: string): Promise<any> {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.select(selector)
			.boundingClientRect((res) => {
				resolve(res);
			})
			.exec();
	});
}

// 解析rpx
export function parseRpx(val: any): string {
	return isArray(val) ? val.map(parseRpx).join(" ") : isNumber(val) ? `${val}rpx` : val;
}
