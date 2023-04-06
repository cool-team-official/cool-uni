declare namespace ClTimeline {
	interface Item {
		timestamp: string;
		content: string;
		icon?: string;
		color?: string;
		showLine?: boolean;
		[key: string]: any;
	}
}
