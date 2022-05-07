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

declare interface BusinessBox {
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
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
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
		list: string;
		page: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessCoupon {
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
	 * page
	 * @returns Promise<PageResponse>
	 */
	page(data?: any): Promise<PageResponse>;
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
		list: string;
		page: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface BusinessOrder {
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
	 * pay
	 * @returns Promise<any>
	 */
	pay(data?: any): Promise<any>;
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
		pay: string;
		list: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface CommonArtical {
	/**
	 * 列表查询
	 * @returns Promise<any>
	 */
	list(data?: any): Promise<any>;
	/**
	 * dictId
	 * @returns Promise<any>
	 */
	dictId(data?: any): Promise<any>;
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
		dictId: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface CommonParams {
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

declare interface CommonResource {
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

declare interface GoodsCategory {
	/**
	 * getCateByName
	 * @returns Promise<any>
	 */
	getCateByName(data?: any): Promise<any>;
	/**
	 * getChildren
	 * @returns Promise<any>
	 */
	getChildren(data?: any): Promise<any>;
	/**
	 * getParent
	 * @returns Promise<any>
	 */
	getParent(data?: any): Promise<any>;
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
		getCateByName: string;
		getChildren: string;
		getParent: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface GoodsGoods {
	/**
	 * frontPage
	 * @returns Promise<any>
	 */
	frontPage(data?: any): Promise<any>;
	/**
	 * 单个信息
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
		frontPage: string;
		info: string;
		list: string;
		page: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface PayPay {
	/**
	 * continuePay
	 * @returns Promise<any>
	 */
	continuePay(data?: any): Promise<any>;
	/**
	 * aliNotify
	 * @returns Promise<any>
	 */
	aliNotify(data?: any): Promise<any>;
	/**
	 * sxyNotify
	 * @returns Promise<any>
	 */
	sxyNotify(data?: any): Promise<any>;
	/**
	 * wxNotify
	 * @returns Promise<any>
	 */
	wxNotify(data?: any): Promise<any>;
	/**
	 * pay
	 * @returns Promise<any>
	 */
	pay(data?: any): Promise<any>;
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
		continuePay: string;
		aliNotify: string;
		sxyNotify: string;
		wxNotify: string;
		pay: string;
		list: string;
		page: string;
		info: string;
		update: string;
		delete: string;
		add: string;
	};
}

declare interface UserUser {
	/**
	 * createQRCodeForAlipay
	 * @returns Promise<any>
	 */
	createQRCodeForAlipay(data?: any): Promise<any>;
	/**
	 * loginByOnekey
	 * @returns Promise<any>
	 */
	loginByOnekey(data?: any): Promise<any>;
	/**
	 * loginByWechat
	 * @returns Promise<any>
	 */
	loginByWechat(data?: any): Promise<any>;
	/**
	 * loginByAlipay
	 * @returns Promise<any>
	 */
	loginByAlipay(data?: any): Promise<any>;
	/**
	 * loginByApple
	 * @returns Promise<any>
	 */
	loginByApple(data?: any): Promise<any>;
	/**
	 * phoneBinding
	 * @returns Promise<any>
	 */
	phoneBinding(data?: any): Promise<any>;
	/**
	 * createQRCode
	 * @returns Promise<any>
	 */
	createQRCode(data?: any): Promise<any>;
	/**
	 * loginByCode
	 * @returns Promise<any>
	 */
	loginByCode(data?: any): Promise<any>;
	/**
	 * getOpenId
	 * @returns Promise<any>
	 */
	getOpenId(data?: any): Promise<any>;
	/**
	 * getCode
	 * @returns Promise<any>
	 */
	getCode(data?: any): Promise<any>;
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
		createQRCodeForAlipay: string;
		loginByOnekey: string;
		loginByWechat: string;
		loginByAlipay: string;
		loginByApple: string;
		phoneBinding: string;
		createQRCode: string;
		loginByCode: string;
		getOpenId: string;
		getCode: string;
		info: string;
		list: string;
		page: string;
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
	business: { box: BusinessBox; coupon: BusinessCoupon; order: BusinessOrder };
	common: { artical: CommonArtical; params: CommonParams; resource: CommonResource };
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
	goods: { category: GoodsCategory; goods: GoodsGoods };
	pay: { pay: PayPay };
	user: { user: UserUser };
	test: Test;
};
