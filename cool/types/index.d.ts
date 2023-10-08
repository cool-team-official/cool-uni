export declare interface DictItem {
	label: string;
	value: any;
	children?: Item[];
	[key: string]: any;
}

export declare interface Token {
	token: string;
	expire: number;
	refreshToken: string;
	refreshExpire: number;
}
