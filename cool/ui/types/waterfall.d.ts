declare namespace ClWaterfall {
	interface Ref {
		append(list: any[]): void;
		refresh(list: any[]): void;
		clear(): void;
		update(id: string | number, data: any): void;
	}
}
