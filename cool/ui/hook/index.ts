import { computed, getCurrentInstance, nextTick } from "vue";
import { isEmpty } from "lodash";
import { router } from "/@/cool";

// 获取父组件
function getParent(name: string, k1: string[], k2?: string[]) {
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

// 元素
export function useEl() {
	return {
		getParent,
	};
}

// 表单
export function useForm() {
	const form = getParent("cl-form", ["disabled"]);
	const disabled = computed(() => form.value?.disabled);

	return {
		disabled,
	};
}

export function useUi(): Ui.Page {
	// 子组件方法
	let d: any = null;

	const ui: any = {
		get loaded() {
			update();
			return Boolean(d);
		},
	};

	function update() {
		if (!d) {
			const p = router.info();

			if (p) {
				d = p.$vm?.$cl_page || p.$vm?.$root?.$cl_page;
			}
		}
	}

	update();

	["showLoading", "hideLoading", "showToast", "showTips", "showConfirm"].forEach((e) => {
		ui[e] = (...args: any[]) => {
			update();

			if (d) {
				d[e](...args);
			}
		};
	});

	return ui;
}
