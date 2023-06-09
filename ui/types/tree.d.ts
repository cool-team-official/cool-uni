declare namespace ClTree {
	interface Item {
		label: string;
		value: string;
		isExpand: boolean;
		children: any[];
		[key: string]: any;
	}
}
