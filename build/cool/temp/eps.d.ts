declare namespace Eps {
	interface AiVipEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 限制次数
		 */
		limitCount?: number;
		/**
		 * 月数
		 */
		month?: number;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
		/**
		 * 排序
		 */
		sortNum?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 描述
		 */
		description?: string;
		/**
		 * 主图
		 */
		mainImage?: string;
		/**
		 * 示例图
		 */
		exampleImages?: json;
		/**
		 * 库存
		 */
		stock?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 描述
		 */
		description?: string;
		/**
		 * 主图
		 */
		mainImage?: string;
		/**
		 * 示例图
		 */
		exampleImages?: json;
		/**
		 * 库存
		 */
		stock?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 登录唯一ID
		 */
		unionid?: string;
		/**
		 * 头像
		 */
		avatarUrl?: string;
		/**
		 * 昵称
		 */
		nickName?: string;
		/**
		 * 手机号
		 */
		phone?: string;
		/**
		 * 性别 0-未知 1-男 2-女
		 */
		gender?: number;
		/**
		 * 状态 0-禁用 1-正常
		 */
		status?: number;
		/**
		 * 登录方式 0-小程序 1-公众号 2-H5
		 */
		loginType?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}
	interface AiPay {
		/**
		 * wxNotify
		 */
		wxNotify(data?: any): Promise<any>;
		/**
		 * 微信小程序支付
		 */
		wxMini(data?: any): Promise<any>;
		/**
		 * 微信公众号支付
		 */
		wxMp(data?: any): Promise<any>;
		/**
		 * 微信H5支付
		 */
		wxH5(data?: any): Promise<any>;
		/**
		 * wx
		 */
		wx(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface AiVip {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<AiVipEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: AiVipEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<AiVipEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface BaseComm {
		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CloudFunc {
		/**
		 * 调用云函数
		 */
		invoke(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoCache {
		/**
		 * set
		 */
		set(data?: any): Promise<any>;
		/**
		 * get
		 */
		get(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoChat {
		/**
		 * 聊天
		 */
		chat(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoEvent {
		/**
		 * send
		 */
		send(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoGoods {
		/**
		 * entity分页查询
		 */
		entityPage(data?: any): Promise<any>;
		/**
		 * sql分页查询
		 */
		sqlPage(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DemoGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoPay {
		/**
		 * aliNotify
		 */
		aliNotify(data?: any): Promise<any>;
		/**
		 * wxNotify
		 */
		wxNotify(data?: any): Promise<any>;
		/**
		 * aliApp
		 */
		aliApp(data?: any): Promise<any>;
		/**
		 * aliPc
		 */
		aliPc(data?: any): Promise<any>;
		/**
		 * wx
		 */
		wx(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoQueue {
		/**
		 * addGetter
		 */
		addGetter(data?: any): Promise<any>;
		/**
		 * getter
		 */
		getter(data?: any): Promise<any>;
		/**
		 * 发送队列数据
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
	}

	interface DemoRpc {
		/**
		 * 分布式事务
		 */
		transaction(data?: any): Promise<any>;
		/**
		 * 集群事件
		 */
		event(data?: any): Promise<any>;
		/**
		 * 远程调用
		 */
		call(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface DemoTransaction {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DemoGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface DictInfo {
		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface MqttIot {
		/**
		 * publish
		 */
		publish(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface Wps {
		/**
		 * 用户信息
		 */
		users(data?: any): Promise<any>;
		/**
		 * 上传完成后，回调通知上传结果
		 */
		complete(data?: any): Promise<any>;
		/**
		 * 准备上传阶段
		 */
		prepare(data?: any): Promise<any>;
		/**
		 * 获取上传地址
		 */
		address(data?: any): Promise<any>;
		/**
		 * 获取文档用户权限
		 */
		permission(data?: any): Promise<any>;
		/**
		 * 获取文件下载地址
		 */
		download(data?: any): Promise<any>;
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
		/**
		 * 获取文件信息
		 */
		file_id(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
	}

	interface UserInfo {
		/**
		 * 获取用户信息
		 */
		updatePerson(data?: any): Promise<any>;
		/**
		 * 获取用户信息
		 */
		person(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<UserInfoEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: UserInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<UserInfoEntity>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface UserLogin {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * 图片验证码
		 */
		captcha(data?: any): Promise<any>;
		/**
		 * 验证码
		 */
		smsCode(data?: any): Promise<any>;
		/**
		 * 手机号登录
		 */
		phone(data?: any): Promise<any>;
		/**
		 * 小程序登录
		 */
		mini(data?: any): Promise<any>;
		/**
		 * 公众号登录
		 */
		mp(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface Test {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	type Service = {
		request(options: {
			url: string;
			method?: "POST" | "GET" | string;
			data?: any;
			params?: any;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		ai: { pay: AiPay; vip: AiVip };
		base: { comm: BaseComm };
		cloud: { func: CloudFunc };
		demo: {
			cache: DemoCache;
			chat: DemoChat;
			event: DemoEvent;
			goods: DemoGoods;
			pay: DemoPay;
			queue: DemoQueue;
			rpc: DemoRpc;
			transaction: DemoTransaction;
		};
		dict: { info: DictInfo };
		mqtt: { iot: MqttIot };
		wps: Wps;
		user: { info: UserInfo; login: UserLogin };
		test: Test;
	};
}
