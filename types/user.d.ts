declare namespace User {
	interface Info {
		id: number;
		// 头像
		avatar: string;
		// 昵称
		nickname: string;
		// 手机号
		phone: string;
		[key: string]: any;
	}
}

export { User };
