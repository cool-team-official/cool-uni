import Mock from "mockjs";

// 用户信息
Mock.mock(/^\/app\/common\/user\/info/, "get", () => {
	return {
		code: 1000,
		data: {
			avatar: "",
			id: 20184,
			ip: "127.0.0.1",
			nickName: "新用户6132",
			phone: "17565456132",
			sex: 0,
			status: 1,
		},
	};
});

// 发送验证码
Mock.mock(/^\/app\/common\/user\/getCode/, "get", () => {
	return {
		code: 1000,
	};
});

// 手机验证码登录
Mock.mock(/^\/app\/common\/user\/loginByCode/, "post", () => {
	return {
		code: 1000,
		data: "token",
	};
});
