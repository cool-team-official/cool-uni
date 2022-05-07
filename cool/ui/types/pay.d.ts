declare namespace ClPay {
	interface Item {
		label: string;
		value: any;
		icon: string;
		hidden?: boolean;
	}

	interface Options {
		list?: Item[];
		callback?(item: Item): void;
	}

	interface Ref {
		open(options: Options): void;
		close(): void;
	}
}
