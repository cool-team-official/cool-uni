declare namespace ClListIndex {
	interface Item {
		name: string;
		avatar: string;
		[key: string]: any;
	}

	type Group = {
		label: string;
		children: Item[];
	}[];

	interface Dict {
		id: string;
		avatar: string;
		name: string;
	}
}
