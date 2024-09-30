declare namespace Eps {
	interface AppComplainEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 类型
		 */
		type?: number;
		/**
		 * 联系方式
		 */
		contact?: string;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 图片
		 */
		images?: json;
		/**
		 * 状态 0-未处理 1-已处理
		 */
		status?: number;
		/**
		 * 处理人ID
		 */
		handlerId?: number;
		/**
		 * 备注
		 */
		remark?: string;
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

	interface AppFeedbackEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 联系方式
		 */
		contact?: string;
		/**
		 * 类型
		 */
		type?: number;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 图片
		 */
		images?: json;
		/**
		 * 状态 0-未处理 1-已处理
		 */
		status?: number;
		/**
		 * 处理人ID
		 */
		handlerId?: number;
		/**
		 * 备注
		 */
		remark?: string;
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

	interface AppGoodsEntity {
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
		 * 原价
		 */
		originalPrice?: number;
		/**
		 * 描述
		 */
		description?: string;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
		/**
		 * 排序
		 */
		sort?: number;
		/**
		 * 类型 0-天 1-月 2-年 3-永久
		 */
		type?: number;
		/**
		 * 时长
		 */
		duration?: number;
		/**
		 * 标签
		 */
		tag?: string;
		/**
		 * 标签颜色
		 */
		tagColor?: string;
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

	interface AppVersionEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 版本号
		 */
		version?: string;
		/**
		 * 类型
		 */
		type?: number;
		/**
		 * 下载地址
		 */
		url?: string;
		/**
		 * 强制更新 0-否 1-是
		 */
		forceUpdate?: number;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
		/**
		 * 热更新 0-否 1-是
		 */
		hotUpdate?: number;
		/**
		 * 描述
		 */
		description?: string;
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

	interface InfoBannerEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		description?: string;
		/**
		 * 跳转路径
		 */
		path?: string;
		/**
		 * 图片
		 */
		pic?: string;
		/**
		 * 排序
		 */
		sortNum?: number;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
		/**
		 * 类型 0-顶部 1-中间
		 */
		type?: number;
		/**
		 * 内容
		 */
		content?: string;
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

	interface InfoCouponEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 金额
		 */
		amount?: number;
		/**
		 * 开始时间
		 */
		startTime?: Date;
		/**
		 * 结束时间
		 */
		endTime?: Date;
		/**
		 * 有效期(天)
		 */
		expireDay?: number;
		/**
		 * 类型 0-平台 1-商家
		 */
		type?: number;
		/**
		 * 核销码
		 */
		code?: string;
		/**
		 * 数据量
		 */
		num?: number;
		/**
		 * 余量
		 */
		remainNum?: number;
		/**
		 * 已使用
		 */
		use?: number;
		/**
		 * 状态 0-关闭 1-开启
		 */
		status?: number;
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

	interface InfoHelpEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 父ID
		 */
		parentId?: number;
		/**
		 * 排序
		 */
		sort?: number;
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

	interface InfoSafeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 父ID
		 */
		parentId?: number;
		/**
		 * 排序
		 */
		sort?: number;
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

	interface MsgDeviceEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * CID
		 */
		cid?: string;
		/**
		 * 别名
		 */
		alias?: string;
		/**
		 * 标签
		 */
		tags?: json;
		/**
		 * 类型 0-未知 1-H5 2-APP 3-小程序
		 */
		type?: number;
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

	interface MsgInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 内容
		 */
		content?: string;
		/**
		 * 数据
		 */
		data?: json;
		/**
		 * 类型 0-站内信 1-服务通知
		 */
		type?: number;
		/**
		 * 已读人数
		 */
		readCount?: number;
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

	interface MsgUserEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 消息ID
		 */
		infoId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 状态 0-已读 1-未读
		 */
		status?: number;
		/**
		 * 阅读时间
		 */
		readTime?: Date;
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

	interface PingReserveEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 拼车ID
		 */
		travelId?: number;
		/**
		 * 订单ID
		 */
		orderId?: number;
		/**
		 * A费
		 */
		price?: number;
		/**
		 * 状态 0-待支付 1-正常 2-已完成 3-退订 4-已评价 5-已关闭
		 */
		status?: number;
		/**
		 * 座位数
		 */
		seat?: number;
		/**
		 * 手机号
		 */
		phone?: string;
		/**
		 * 上车点
		 */
		startPoint?: string;
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

	interface PingSuggestEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 起点
		 */
		startCity?: string;
		/**
		 * 终点
		 */
		endCity?: string;
		/**
		 * 排序
		 */
		sortNum?: number;
		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;
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

	interface PingTravelEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 起点
		 */
		startCity?: string;
		/**
		 * 起点地址
		 */
		startAddress?: string;
		/**
		 * 起点经纬度
		 */
		startPoint?: point;
		/**
		 * 终点
		 */
		endCity?: string;
		/**
		 * 终点地址
		 */
		endAddress?: string;
		/**
		 * 终点经纬度
		 */
		endPoint?: point;
		/**
		 * 途经地点
		 */
		passCity?: json;
		/**
		 * 出发时间
		 */
		startTime?: Date;
		/**
		 * 车辆
		 */
		carInfo?: json;
		/**
		 * 余座
		 */
		seat?: number;
		/**
		 * A费
		 */
		price?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 联系电话
		 */
		phone?: string;
		/**
		 * 状态 0-无座 1-正常
		 */
		status?: number;
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

	interface UserAddressEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 联系人
		 */
		contact?: string;
		/**
		 * 手机号
		 */
		phone?: string;
		/**
		 * 省
		 */
		province?: string;
		/**
		 * 市
		 */
		city?: string;
		/**
		 * 区
		 */
		district?: string;
		/**
		 * 地址
		 */
		address?: string;
		/**
		 * 是否默认
		 */
		isDefault?: boolean;
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

	interface UserAuthCarEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 主页
		 */
		front?: string;
		/**
		 * 副页
		 */
		vice?: string;
		/**
		 * 状态 0-待认证 1-已认证 2-认证失败
		 */
		status?: number;
		/**
		 * 失败原因
		 */
		reason?: string;
		/**
		 * 车辆品牌
		 */
		brand?: string;
		/**
		 * 车辆型号
		 */
		model?: string;
		/**
		 * 车牌号
		 */
		carNumber?: string;
		/**
		 * 所有人
		 */
		owner?: string;
		/**
		 * 注册日期
		 */
		registerDate?: Date;
		/**
		 * 默认车辆 0-否 1-是
		 */
		isDefault?: number;
		/**
		 * 保险登记 0-否 1-是
		 */
		isInsurance?: number;
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

	interface UserAuthDriveEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 主页
		 */
		front?: string;
		/**
		 * 副页
		 */
		vice?: string;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 性别
		 */
		sex?: string;
		/**
		 * 准驾车型
		 */
		type?: string;
		/**
		 * 初次领证日期
		 */
		firstDate?: Date;
		/**
		 * 有效期开始日期
		 */
		startDate?: Date;
		/**
		 * 有效期结束日期
		 */
		endDate?: Date;
		/**
		 * 状态 0-待认证 1-已认证 2-认证失败 3-已失效
		 */
		status?: number;
		/**
		 * 失败原因
		 */
		reason?: string;
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

	interface UserAuthInsuranceEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 车辆ID
		 */
		carId?: number;
		/**
		 * 保险公司
		 */
		company?: string;
		/**
		 * 保单号
		 */
		policyNumber?: string;
		/**
		 * 保险期限
		 */
		insurancePeriod?: Date;
		/**
		 * 保单照片
		 */
		photo?: string;
		/**
		 * 状态 0-待认证 1-已认证 2-认证失败 3-已失效
		 */
		status?: number;
		/**
		 * 失败原因
		 */
		reason?: string;
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

	interface UserAuthOwnEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 身份证号
		 */
		idCard?: string;
		/**
		 * 状态 0-待认证 1-已认证 2-认证失败
		 */
		status?: number;
		/**
		 * 失败原因
		 */
		reason?: string;
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

	interface UserContactEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 联系人姓名
		 */
		name?: string;
		/**
		 * 联系人电话
		 */
		phone?: string;
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

	interface UserCouponEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 信息ID
		 */
		infoId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 金额
		 */
		amount?: number;
		/**
		 * 有效期
		 */
		expireTime?: Date;
		/**
		 * 状态 0-未使用 1-已使用
		 */
		status?: number;
		/**
		 * 来源 0-平台 1-会员 2-推广
		 */
		source?: number;
		/**
		 * 类型 0-平台 1-商家
		 */
		type?: number;
		/**
		 * 核销码
		 */
		code?: string;
		/**
		 * 使用时间
		 */
		useTime?: Date;
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
		 * 状态 0-禁用 1-正常 2-已注销
		 */
		status?: number;
		/**
		 * 登录方式 0-小程序 1-公众号 2-H5
		 */
		loginType?: number;
		/**
		 * 密码
		 */
		password?: string;
		/**
		 * 诚信分
		 */
		creditScore?: number;
		/**
		 * 好评率
		 */
		praiseRate?: number;
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
	interface AppComplain {
		/**
		 * 提交投诉举报
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: AppComplainEntity[];
			[key: string]: any;
		}>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AppComplainEntity>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			submit: string;
			page: string;
			info: string;
			delete: string;
			update: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			submit: boolean;
			page: boolean;
			info: boolean;
			delete: boolean;
			update: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AppFeedback {
		/**
		 * 提交意见反馈
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: AppFeedbackEntity[];
			[key: string]: any;
		}>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<AppFeedbackEntity>;
		/**
		 * 权限标识
		 */
		permission: { submit: string; page: string; info: string };
		/**
		 * 权限状态
		 */
		_permission: { submit: boolean; page: boolean; info: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AppGoods {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<AppGoodsEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AppVersion {
		/**
		 * 检查版本
		 */
		check(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { check: string };
		/**
		 * 权限状态
		 */
		_permission: { check: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
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
		 * 参数配置
		 */
		param(data?: any): Promise<any>;
		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { uploadMode: string; upload: string; param: string; eps: string };
		/**
		 * 权限状态
		 */
		_permission: { uploadMode: boolean; upload: boolean; param: boolean; eps: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictInfo {
		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { data: string };
		/**
		 * 权限状态
		 */
		_permission: { data: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface InfoBanner {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoBannerEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface InfoCoupon {
		/**
		 * 领取
		 */
		receive(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: InfoCouponEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: { receive: string; page: string };
		/**
		 * 权限状态
		 */
		_permission: { receive: boolean; page: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface InfoHelp {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoHelpEntity[]>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<InfoHelpEntity>;
		/**
		 * 权限标识
		 */
		permission: { list: string; info: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean; info: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface InfoSafe {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoSafeEntity[]>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<InfoSafeEntity>;
		/**
		 * 权限标识
		 */
		permission: { list: string; info: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean; info: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface MsgDevice {
		/**
		 * bind
		 */
		bind(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { bind: string };
		/**
		 * 权限状态
		 */
		_permission: { bind: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface MsgInfo {
		/**
		 * 未读消息数量
		 */
		unreadCount(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 全部已读
		 */
		clear(data?: any): Promise<any>;
		/**
		 * 标记为已读
		 */
		read(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<MsgInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<MsgInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: MsgInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			unreadCount: string;
			delete: string;
			update: string;
			clear: string;
			read: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			unreadCount: boolean;
			delete: boolean;
			update: boolean;
			clear: boolean;
			read: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface MsgUser {
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
		info(data?: any): Promise<MsgUserEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<MsgUserEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: MsgUserEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface OrderPay {
		/**
		 * 微信支付回调
		 */
		wxNotify(data?: any): Promise<any>;
		/**
		 * 微信公众号支付
		 */
		wxMpPay(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { wxNotify: string; wxMpPay: string };
		/**
		 * 权限状态
		 */
		_permission: { wxNotify: boolean; wxMpPay: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface PingReserve {
		/**
		 * 提交
		 */
		submit(data?: any): Promise<any>;
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
		info(data?: any): Promise<PingReserveEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<PingReserveEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: PingReserveEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			submit: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			submit: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface PingSuggest {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<PingSuggestEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface PingTravel {
		/**
		 * 提交
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<PingTravelEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: PingTravelEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: { submit: string; info: string; page: string };
		/**
		 * 权限状态
		 */
		_permission: { submit: boolean; info: boolean; page: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAddress {
		/**
		 * 默认地址
		 */
		default(data?: any): Promise<any>;
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
		info(data?: any): Promise<UserAddressEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserAddressEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: UserAddressEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			default: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			default: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAuthCar {
		/**
		 * 行驶证识别
		 */
		recognize(data?: any): Promise<any>;
		/**
		 * 获取用户默认车辆
		 */
		default(data?: any): Promise<any>;
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
		info(data?: any): Promise<UserAuthCarEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: UserAuthCarEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			recognize: string;
			default: string;
			delete: string;
			update: string;
			info: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			recognize: boolean;
			default: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAuthDrive {
		/**
		 * 驾驶证识别
		 */
		recognize(data?: any): Promise<any>;
		/**
		 * 提交驾驶证认证
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { recognize: string; submit: string };
		/**
		 * 权限状态
		 */
		_permission: { recognize: boolean; submit: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAuthInfo {
		/**
		 * 认证信息
		 */
		detail(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { detail: string };
		/**
		 * 权限状态
		 */
		_permission: { detail: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAuthInsurance {
		/**
		 * 保险登记详情
		 */
		detail(data?: any): Promise<any>;
		/**
		 * 提交保险登记
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { detail: string; submit: string };
		/**
		 * 权限状态
		 */
		_permission: { detail: boolean; submit: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAuthOwn {
		/**
		 * 提交实名认证
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 结果
		 */
		result(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { submit: string; result: string };
		/**
		 * 权限状态
		 */
		_permission: { submit: boolean; result: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserComm {
		/**
		 * 获取微信公众号配置
		 */
		wxMpConfig(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { wxMpConfig: string };
		/**
		 * 权限状态
		 */
		_permission: { wxMpConfig: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserContact {
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
		info(data?: any): Promise<UserContactEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: UserContactEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { delete: string; update: string; info: string; page: string; add: string };
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserCoupon {
		/**
		 * 核销
		 */
		collate(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: UserCouponEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: { collate: string; page: string };
		/**
		 * 权限状态
		 */
		_permission: { collate: boolean; page: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserInfo {
		/**
		 * 更新用户密码
		 */
		updatePassword(data?: any): Promise<any>;
		/**
		 * 更新用户信息
		 */
		updatePerson(data?: any): Promise<any>;
		/**
		 * 绑定手机号
		 */
		bindPhone(data?: any): Promise<any>;
		/**
		 * 绑定小程序手机号
		 */
		miniPhone(data?: any): Promise<any>;
		/**
		 * 获取用户信息
		 */
		person(data?: any): Promise<any>;
		/**
		 * 注销
		 */
		logoff(data?: any): Promise<any>;
		/**
		 * 绑定微信
		 */
		bingWx(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			updatePassword: string;
			updatePerson: string;
			bindPhone: string;
			miniPhone: string;
			person: string;
			logoff: string;
			bingWx: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			updatePassword: boolean;
			updatePerson: boolean;
			bindPhone: boolean;
			miniPhone: boolean;
			person: boolean;
			logoff: boolean;
			bingWx: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserLogin {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * 绑定小程序手机号
		 */
		miniPhone(data?: any): Promise<any>;
		/**
		 * 一键手机号登录
		 */
		uniPhone(data?: any): Promise<any>;
		/**
		 * 密码登录
		 */
		password(data?: any): Promise<any>;
		/**
		 * 图片验证码
		 */
		captcha(data?: any): Promise<any>;
		/**
		 * 验证码
		 */
		smsCode(data?: any): Promise<any>;
		/**
		 * 微信APP授权登录
		 */
		wxApp(data?: any): Promise<any>;
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
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			miniPhone: string;
			uniPhone: string;
			password: string;
			captcha: string;
			smsCode: string;
			wxApp: string;
			phone: string;
			mini: string;
			mp: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			miniPhone: boolean;
			uniPhone: boolean;
			password: boolean;
			captcha: boolean;
			smsCode: boolean;
			wxApp: boolean;
			phone: boolean;
			mini: boolean;
			mp: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	type json = any;

	type Service = {
		request(options?: {
			url: string;
			method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
			data?: any;
			params?: any;
			headers?: {
				[key: string]: any;
			};
			timeout?: number;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		app: { complain: AppComplain; feedback: AppFeedback; goods: AppGoods; version: AppVersion };
		base: { comm: BaseComm };
		dict: { info: DictInfo };
		info: { banner: InfoBanner; coupon: InfoCoupon; help: InfoHelp; safe: InfoSafe };
		msg: { device: MsgDevice; info: MsgInfo; user: MsgUser };
		order: { pay: OrderPay };
		ping: { reserve: PingReserve; suggest: PingSuggest; travel: PingTravel };
		user: {
			address: UserAddress;
			auth: {
				car: UserAuthCar;
				drive: UserAuthDrive;
				info: UserAuthInfo;
				insurance: UserAuthInsurance;
				own: UserAuthOwn;
			};
			comm: UserComm;
			contact: UserContact;
			coupon: UserCoupon;
			info: UserInfo;
			login: UserLogin;
		};
	};
}
