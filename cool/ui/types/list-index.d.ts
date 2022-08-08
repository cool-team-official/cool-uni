declare namespace ClListIndex {
	interface Item {
		name: string;
		avatar: string;
		[key: string]: any;
	}

	type Group = {
		label: string;
		children: Item[];
		[key: string]: any;
	}[];

	interface Dict {
		id: string;
		avatar: string;
		name: string;
	}
}
