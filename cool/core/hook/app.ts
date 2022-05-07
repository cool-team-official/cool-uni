import { onBeforeUpdate, ref } from "vue";
import { router } from "../router";
import { service } from "../service";
import { upload } from "../upload";
import { useUi } from "../../ui";
import { useMitt } from "../mitt";
import { storage } from "../../utils";

export function useRefs() {
	const refs = ref<any>({});

	onBeforeUpdate(() => {
		refs.value = {};
	});

	const setRefs = (index: string) => (el: any) => {
		refs.value[index] = el;
	};

	return { refs, setRefs };
}

export function useCool() {
	const { refs, setRefs } = useRefs();

	// 通信
	const mitt = useMitt();

	// 全局组件
	const ui = useUi();

	return {
		refs,
		setRefs,
		mitt,
		router,
		service,
		upload,
		storage,
		ui,
	};
}
