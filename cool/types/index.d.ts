export declare interface ModuleConfig {
	name?: string;
	description?: string;
	order?: number;
	demo?: { label: string; path: string };
	options?: {
		[key: string]: any;
	};
	onLoad?(options?: any): any;
}

export declare interface Module extends ModuleConfig {
	name: string;
	options: {
		[key: string]: any;
	};
	[key: string]: any;
}

export namespace User {
	interface Token {
		token: string;
		expire: number;
		refreshToken: string;
		refreshExpire: number;
	}

	interface Info extends Eps.UserInfoEntity {}
}

export namespace Dict {
	type Key = Eps.DictKey | (string & {});

	interface Item {
		id: string;
		label: string;
		value: any;
		children?: Item[];
		[key: string]: any;
	}

	interface Data {
		[key: string]: Item[];
	}
}
