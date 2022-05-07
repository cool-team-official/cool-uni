import { inject } from "vue";

declare interface Mitt {
	all: Mitt[];
	on(name: string, callback: (data: any) => void): void;
	off(name: string, callback: (data: any) => void): void;
	emit(name: string, data: any): void;
}

export function useMitt(): Mitt {
	return inject<Mitt>("mitt") || ({} as Mitt);
}
