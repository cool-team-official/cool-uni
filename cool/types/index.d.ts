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
