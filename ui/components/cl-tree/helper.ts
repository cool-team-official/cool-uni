import { PropType, computed, ref, watch } from "vue";
import { deepMerge } from "/@/cool/utils";
import { cloneDeep } from "lodash-es";

export const TreeProps = {
	// 数据
	data: {
		type: Array as PropType<ClTree.Item[]>,
		default: () => [],
	},
	// 每一行的高度
	rowHeight: {
		type: Number,
		default: 64,
	},
	// 是否每项都能选择
	checkStrictly: Boolean,
	// 是否默认全部展开
	defaultExpandAll: Boolean,
	// 默认值是否自动展开
	autoExpand: {
		type: Boolean,
		default: true,
	},
	// 是否每次只打开一个同级树节点展开
	accordion: Boolean,
	// 关键字
	keys: Object as PropType<ClTree.Keys>,
};

export function useTree(props: any) {
	// 关键字
	const keys = computed(() => {
		return deepMerge({ label: "label", value: "value", children: "children" }, props.keys);
	});

	// 显示内容
	const label = computed(() => {
		let text = "";

		function deep(arr: ClTree.Item[]) {
			arr.find((e) => {
				if (e[keys.value?.value] == props.modelValue) {
					text = e[keys.value.label];
					return true;
				} else {
					if (e.children) {
						deep(e.children);
					}
				}
			});
		}

		deep(props.data);

		return text;
	});

	// 数据
	const data = ref<ClTree.Item[]>([]);

	// 格式化数据
	function getData(val: any[]) {
		const d = cloneDeep(val);

		function deep(arr: ClTree.Item[]) {
			return arr.find((e) => {
				// 默认值展开
				if (props.autoExpand && e[keys.value?.value] == props.modelValue) {
					return true;
				}

				if (e.children) {
					// 默认全部展开
					if (props.defaultExpandAll) {
						e.isExpand = true;
					}

					const f = deep(e.children);

					if (!!f) {
						e.isExpand = true;
						return true;
					}
				}
			});
		}

		deep(d);

		data.value = d;
	}

	// 监听数据
	watch(() => props.data, getData, {
		immediate: true,
	});

	return {
		keys,
		label,
		data,
	};
}
