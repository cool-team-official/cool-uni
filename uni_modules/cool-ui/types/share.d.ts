declare namespace ClShare {
	enum Type {
		"图文" = 0,
		"纯文字" = 1,
		"纯图片" = 2,
		"音乐" = 3,
		"视频" = 4,
		"小程序" = 5,
	}

	interface Options {
		type: Type | string;
		imageUrl: string;
		title: string;
		summary: string;
		href: string;
		mediaUrl: string;
		miniProgram: any;
		text: string;
		wx: boolean;
		qq: boolean;
		success(): void;
		fail(err: any): void;
	}
}
