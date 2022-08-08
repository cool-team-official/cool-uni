declare interface Crud {
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data: any): Promise<any>;
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data: { ids?: number[] | string[]; [key: string]: any }): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data: { id?: number | string; [key: string]: any }): Promise<any>;
	/**
	 * 详情
	 * @returns Promise<any>
	 */
	info(data: { id?: number | string; [key: string]: any }): Promise<any>;
	/**
	 * 全部
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 分页
	 * @returns Promise<PageResponse>
	 */
	page(data?: {
		page?: number | string;
		size?: number | string;
		[key: string]: any;
	}): Promise<PageResponse>;
}

declare interface PageResponse {
	list: any[];
	pagination: { size: number; page: number; total: number };
	[key: string]: any;
}

declare interface RequestOptions {
	params?: any;
	data?: any;
	url: string;
	method?: "GET" | "get" | "POST" | "post" | string;
	[key: string]: any;
}

declare interface BaseComm {
	/**
	 * 文件上传模式
	 * @returns Promise<any>
	 */
	uploadMode(data?: any): Promise<any>;
	/**
	 * 文件上传
	 * @returns Promise<any>
	 */
	upload(data?: any): Promise<any>;
	/**
	 * 实体信息与路径
	 * @returns Promise<any>
	 */
	eps(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		uploadMode: string;
		upload: string;
		eps: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessAmount {
	/**
	 * aliNotify
	 * @returns Promise<any>
	 */
	aliNotify(data?: any): Promise<any>;
	/**
	 * recharge
	 * @returns Promise<any>
	 */
	recharge(data?: any): Promise<any>;
	/**
	 * withdraw
	 * @returns Promise<any>
	 */
	withdraw(data?: any): Promise<any>;
	/**
	 * toWallet
	 * @returns Promise<any>
	 */
	toWallet(data?: any): Promise<any>;
	/**
	 * wxNotify
	 * @returns Promise<any>
	 */
	wxNotify(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		aliNotify: string;
		recharge: string;
		withdraw: string;
		toWallet: string;
		wxNotify: string;
		page: string;
		list: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessBanner {
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessRecharge {
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		info: string;
		page: string;
		list: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessTask {
	/**
	 * findByCode
	 * @returns Promise<any>
	 */
	findByCode(data?: any): Promise<any>;
	/**
	 * myTask
	 * @returns Promise<any>
	 */
	myTask(data?: any): Promise<any>;
	/**
	 * giveUp
	 * @returns Promise<any>
	 */
	giveUp(data?: any): Promise<any>;
	/**
	 * submit
	 * @returns Promise<any>
	 */
	submit(data?: any): Promise<any>;
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * click
	 * @returns Promise<any>
	 */
	click(data?: any): Promise<any>;
	/**
	 * test
	 * @returns Promise<any>
	 */
	test(data?: any): Promise<any>;
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * get
	 * @returns Promise<any>
	 */
	get(data?: any): Promise<any>;
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		findByCode: string;
		myTask: string;
		giveUp: string;
		submit: string;
		delete: string;
		update: string;
		click: string;
		test: string;
		info: string;
		list: string;
		page: string;
		get: string;
		add: string;
	};
}

declare interface BusinessUser {
	/**
	 * loginByWechat
	 * @returns Promise<any>
	 */
	loginByWechat(data?: any): Promise<any>;
	/**
	 * phoneBinding
	 * @returns Promise<any>
	 */
	phoneBinding(data?: any): Promise<any>;
	/**
	 * 刷新token
	 * @returns Promise<any>
	 */
	refreshToken(data?: any): Promise<any>;
	/**
	 * loginByCode
	 * @returns Promise<any>
	 */
	loginByCode(data?: any): Promise<any>;
	/**
	 * 推广码号绑定
	 * @returns Promise<any>
	 */
	codeBinding(data?: any): Promise<any>;
	/**
	 * 学生认证
	 * @returns Promise<any>
	 */
	studentAuth(data?: any): Promise<any>;
	/**
	 * 粉丝列表
	 * @returns Promise<any>
	 */
	fansList(data?: any): Promise<any>;
	/**
	 * 粉丝任务
	 * @returns Promise<any>
	 */
	fansTask(data?: any): Promise<any>;
	/**
	 * getCode
	 * @returns Promise<any>
	 */
	getCode(data?: any): Promise<any>;
	/**
	 * 账户
	 * @returns Promise<any>
	 */
	account(data?: any): Promise<any>;
	/**
	 * 佣金列表
	 * @returns Promise<any>
	 */
	yjList(data?: any): Promise<any>;
	/**
	 * 实名认证
	 * @returns Promise<any>
	 */
	smAuth(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * test
	 * @returns Promise<any>
	 */
	test(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		loginByWechat: string;
		phoneBinding: string;
		refreshToken: string;
		loginByCode: string;
		codeBinding: string;
		studentAuth: string;
		fansList: string;
		fansTask: string;
		getCode: string;
		account: string;
		yjList: string;
		smAuth: string;
		update: string;
		info: string;
		test: string;
		list: string;
		page: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessWithdraw {
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		info: string;
		page: string;
		list: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoCache {
	/**
	 * set
	 * @returns Promise<any>
	 */
	set(data?: any): Promise<any>;
	/**
	 * get
	 * @returns Promise<any>
	 */
	get(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		set: string;
		get: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoConfig {
	/**
	 * get
	 * @returns Promise<any>
	 */
	get(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		get: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoEs {
	/**
	 * test
	 * @returns Promise<any>
	 */
	test(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		test: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoEvent {
	/**
	 * send
	 * @returns Promise<any>
	 */
	send(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		send: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoFile {
	/**
	 * 下载并上传
	 * @returns Promise<any>
	 */
	downAndUpload(data?: any): Promise<any>;
	/**
	 * 获得上传模式
	 * @returns Promise<any>
	 */
	uploadMode(data?: any): Promise<any>;
	/**
	 * 文件上传
	 * @returns Promise<any>
	 */
	upload(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		downAndUpload: string;
		uploadMode: string;
		upload: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoGoods {
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		delete: string;
		update: string;
		info: string;
		page: string;
		list: string;
		add: string;
	};
}

declare interface DemoPay {
	/**
	 * aliNotify
	 * @returns Promise<any>
	 */
	aliNotify(data?: any): Promise<any>;
	/**
	 * wxNotify
	 * @returns Promise<any>
	 */
	wxNotify(data?: any): Promise<any>;
	/**
	 * alipay
	 * @returns Promise<any>
	 */
	alipay(data?: any): Promise<any>;
	/**
	 * wx
	 * @returns Promise<any>
	 */
	wx(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		aliNotify: string;
		wxNotify: string;
		alipay: string;
		wx: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoQueue {
	/**
	 * addGetter
	 * @returns Promise<any>
	 */
	addGetter(data?: any): Promise<any>;
	/**
	 * getter
	 * @returns Promise<any>
	 */
	getter(data?: any): Promise<any>;
	/**
	 * 发送队列数据
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		addGetter: string;
		getter: string;
		add: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
	};
}

declare interface DemoRpc {
	/**
	 * 分布式事务
	 * @returns Promise<any>
	 */
	transaction(data?: any): Promise<any>;
	/**
	 * 集群事件
	 * @returns Promise<any>
	 */
	event(data?: any): Promise<any>;
	/**
	 * 远程调用
	 * @returns Promise<any>
	 */
	call(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		transaction: string;
		event: string;
		call: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoSwagger {
	/**
	 * 创建
	 * @returns Promise<any>
	 */
	create(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		create: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DemoTag {
	/**
	 * data
	 * @returns Promise<any>
	 */
	data(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		data: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface DictInfo {
	/**
	 * 获得字典数据
	 * @returns Promise<any>
	 */
	data(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		data: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface SellerAmount {
	/**
	 * aliNotify
	 * @returns Promise<any>
	 */
	aliNotify(data?: any): Promise<any>;
	/**
	 * recharge
	 * @returns Promise<any>
	 */
	recharge(data?: any): Promise<any>;
	/**
	 * withdraw
	 * @returns Promise<any>
	 */
	withdraw(data?: any): Promise<any>;
	/**
	 * wxNotify
	 * @returns Promise<any>
	 */
	wxNotify(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		aliNotify: string;
		recharge: string;
		withdraw: string;
		wxNotify: string;
		page: string;
		list: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface SellerRecharge {
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		info: string;
		page: string;
		list: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface SellerTask {
	/**
	 * findByCode
	 * @returns Promise<any>
	 */
	findByCode(data?: any): Promise<any>;
	/**
	 * clickCount
	 * @returns Promise<any>
	 */
	clickCount(data?: any): Promise<any>;
	/**
	 * taskUser
	 * @returns Promise<any>
	 */
	taskUser(data?: any): Promise<any>;
	/**
	 * clickLog
	 * @returns Promise<any>
	 */
	clickLog(data?: any): Promise<any>;
	/**
	 * setCode
	 * @returns Promise<any>
	 */
	setCode(data?: any): Promise<any>;
	/**
	 * myTask
	 * @returns Promise<any>
	 */
	myTask(data?: any): Promise<any>;
	/**
	 * 删除
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * test
	 * @returns Promise<any>
	 */
	test(data?: any): Promise<any>;
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * 新增
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		findByCode: string;
		clickCount: string;
		taskUser: string;
		clickLog: string;
		setCode: string;
		myTask: string;
		delete: string;
		update: string;
		test: string;
		info: string;
		list: string;
		page: string;
		add: string;
	};
}

declare interface SellerUser {
	/**
	 * loginByWechat
	 * @returns Promise<any>
	 */
	loginByWechat(data?: any): Promise<any>;
	/**
	 * phoneBinding
	 * @returns Promise<any>
	 */
	phoneBinding(data?: any): Promise<any>;
	/**
	 * 刷新token
	 * @returns Promise<any>
	 */
	refreshToken(data?: any): Promise<any>;
	/**
	 * loginByCode
	 * @returns Promise<any>
	 */
	loginByCode(data?: any): Promise<any>;
	/**
	 * 学生认证
	 * @returns Promise<any>
	 */
	studentAuth(data?: any): Promise<any>;
	/**
	 * getCode
	 * @returns Promise<any>
	 */
	getCode(data?: any): Promise<any>;
	/**
	 * 账户
	 * @returns Promise<any>
	 */
	account(data?: any): Promise<any>;
	/**
	 * 实名认证
	 * @returns Promise<any>
	 */
	smAuth(data?: any): Promise<any>;
	/**
	 * 企业认证
	 * @returns Promise<any>
	 */
	qyAuth(data?: any): Promise<any>;
	/**
	 * 个人认证
	 * @returns Promise<any>
	 */
	grAuth(data?: any): Promise<any>;
	/**
	 * 修改
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		loginByWechat: string;
		phoneBinding: string;
		refreshToken: string;
		loginByCode: string;
		studentAuth: string;
		getCode: string;
		account: string;
		smAuth: string;
		qyAuth: string;
		grAuth: string;
		update: string;
		info: string;
		list: string;
		page: string;
		delete: string;
		add: string;
	};
}

declare interface SellerWithdraw {
	/**
	 * 单个信息
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * 分页查询
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		info: string;
		page: string;
		list: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface Test {
	/**
	 * list
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
	/**
	 * info
	 * @returns Promise<any>
	 */
	info(data?: any): Promise<any>;
	/**
	 * update
	 * @returns Promise<any>
	 */
	update(data?: any): Promise<any>;
	/**
	 * delete
	 * @returns Promise<any>
	 */
	delete(data?: any): Promise<any>;
	/**
	 * add
	 * @returns Promise<any>
	 */
	add(data?: any): Promise<any>;
	/**
	 * 权限
	 */
	permission: {
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare type Service = {
	request(data: RequestOptions): Promise<any>;
	base: { comm: BaseComm };
	business: {
		amount: BusinessAmount;
		banner: BusinessBanner;
		recharge: BusinessRecharge;
		task: BusinessTask;
		user: BusinessUser;
		withdraw: BusinessWithdraw;
	};
	demo: {
		cache: DemoCache;
		config: DemoConfig;
		es: DemoEs;
		event: DemoEvent;
		file: DemoFile;
		goods: DemoGoods;
		pay: DemoPay;
		queue: DemoQueue;
		rpc: DemoRpc;
		swagger: DemoSwagger;
		tag: DemoTag;
	};
	dict: { info: DictInfo };
	seller: {
		amount: SellerAmount;
		recharge: SellerRecharge;
		task: SellerTask;
		user: SellerUser;
		withdraw: SellerWithdraw;
	};
	test: Test;
};
