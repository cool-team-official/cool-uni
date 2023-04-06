import { useUserStore } from "./user";
import { useDictStore } from "./dict";

export function useStore() {
	return {
		user: useUserStore(),
		dict: useDictStore(),
	};
}
