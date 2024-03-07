import { computed, getCurrentInstance } from "vue";
import { parseRpx } from "/@/cool/utils";
import { fromPairs, isArray } from "lodash-es";

const keys = [
	"padding",
	"margin",
	["border-radius", "radius"],
	"$background-color",
	"$background",
	"$custom-style",
];

export function useStyle() {
	const { proxy }: any = getCurrentInstance();

	// 基础样式
	const baseStyle = computed(() => {
		return fromPairs(
			keys
				.map((e) => {
					const ks = isArray(e) ? e : [e.replace("$", "")];
					const v = ks.map((k) => proxy.$attrs[k]).find((e) => e !== undefined);

					return [ks[0], e[0] == "$" ? v : parseRpx(v)];
				})
				.filter((e) => e[1]),
		);
	});

	return {
		baseStyle,
		parseRpx,
	};
}
