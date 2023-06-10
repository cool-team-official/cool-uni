declare namespace ClTree {
	interface Item {
		label: string;
		value?: string;
		isExpand: boolean;
		children?: any[];
		[key: string]: any;
	}

	interface Keys {
		label?: string;
		value?: string;
		children?: string;
	}
}
