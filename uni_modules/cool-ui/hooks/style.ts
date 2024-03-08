import { computed, getCurrentInstance, type StyleValue } from "vue";
import { parseRpx } from "/@/cool/utils";
import { fromPairs } from "lodash-es";

const styles = [
	{
		key: "padding",
		rpx: true,
	},
	{
		key: "margin",
		rpx: true,
	},
	{
		key: "height",
		rpx: true,
	},
	{
		key: "width",
		rpx: true,
	},
	{
		key: "font-size",
		rpx: true,
	},
	{
		key: "border-radius",
		alias: ["radius"],
		rpx: true,
	},
	{
		key: "background-color",
	},
	{
		key: "background",
	},
	{
		key: "custom-style",
	},
];

export function useStyle(data: StyleValue = {}) {
	// 当前组件实例
	const instance = getCurrentInstance();

	// 基础样式
	const baseStyle = computed(() => {
		return fromPairs(
			styles
				.map((e) => {
					// keys
					const keys = [e.key, ...(e.alias || [])];

					// val
					const val = keys
						.map((k) => {
							// 标签值
							const a = instance?.proxy?.$attrs[k];

							// 默认值
							const b = (data as any)[k];

							// 判定值
							return a !== undefined ? a : b;
						})
						.find((e) => e !== undefined);

					// 是否需要 rpx 解析
					return [e.key, e.rpx ? parseRpx(val) : val];
				})
				// 过滤空值
				.filter((e) => e[1] !== undefined),
		);
	});

	return {
		baseStyle,
		parseRpx,
	};
}
