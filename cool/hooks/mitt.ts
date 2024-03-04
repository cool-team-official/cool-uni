import type { Emitter } from "mitt";
import { inject } from "vue";

export function useMitt() {
	const mitt = inject("mitt") as Emitter<any>;

	return {
		mitt,
	};
}
