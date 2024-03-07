import { computed } from "vue";
import { getParent } from "/@/cool/utils";

// 点击
export function useTap(emit: (event: any, ...args: any[]) => void) {
	function tap(e?: any) {
		// #ifdef MP-WEIXIN
		emit("click", e);
		// #endif

		// #ifdef MP-ALIPAY || H5
		emit("tap", e);
		// #endif
	}

	return {
		tap,
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

export * from "./style";
