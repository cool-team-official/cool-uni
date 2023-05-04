import { reactive } from "vue";
import { router } from "../router";
import { service } from "../service";
import { upload } from "../upload";
import { storage } from "../utils";
import { useMitt } from "./mitt";

export function useRefs() {
	const refs = reactive<{ [key: string]: any }>({});
	function setRefs(name: string) {
		return (el: any) => {
			refs[name] = el;
		};
	}

	return { refs, setRefs };
}

export function useCool() {
	return {
		router,
		service,
		upload,
		storage,
		...useMitt(),
		...useRefs(),
	};
}
