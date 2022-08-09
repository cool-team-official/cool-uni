declare namespace Eps {
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
		 * 图片
		 */
		pic?: string;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 分类 0-鞋子 1-衣服
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

	interface InfoCompanyAbilityEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 主要工艺
		 */
		craftDict?: json;
		/**
		 * 最擅长加工的材料
		 */
		materialDict?: json;
		/**
		 * 主要客户所在行业
		 */
		industryDict?: json;
		/**
		 * 已获得认证体系
		 */
		certDict?: json;
		/**
		 * 员工数量
		 */
		staffCount?: number;
		/**
		 * 厂房面积(平方)
		 */
		area?: number;
		/**
		 * 销售额(万元)
		 */
		saleMoney?: number;
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

	interface InfoCompanyCreditEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 额度
		 */
		quota?: number;
		/**
		 * 状态 0-待评估 1-成功 2-失败
		 */
		status?: number;
		/**
		 * 不通过原因
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

	interface InfoCompanyDeviceLocationEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 类型 0-主要生产设备 1-检测设备
		 */
		type?: number;
		/**
		 * 经度
		 */
		lon?: number;
		/**
		 * 纬度
		 */
		lat?: number;
		/**
		 * 位置名称
		 */
		name?: string;
		/**
		 * 详细地址
		 */
		address?: string;
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

	interface InfoCompanyDeviceMainEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 设备名称
		 */
		nameDict?: json;
		/**
		 * 机床品牌
		 */
		brandDict?: json;
		/**
		 * 设备型号
		 */
		model?: string;
		/**
		 * 行程/吨位
		 */
		grade?: string;
		/**
		 * 出厂年份
		 */
		year?: string;
		/**
		 * 设备数量
		 */
		num?: number;
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

	interface InfoCompanyDeviceQualityEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 设备名称
		 */
		nameDict?: json;
		/**
		 * 设备品牌
		 */
		brandDict?: json;
		/**
		 * 设备型号
		 */
		model?: string;
		/**
		 * 测量范围
		 */
		measure?: string;
		/**
		 * 出厂年份
		 */
		year?: string;
		/**
		 * 设备数量
		 */
		num?: number;
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

	interface InfoCompanyPhotoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 照片
		 */
		pic?: string;
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

	interface InfoConsultDrawEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 询价信息ID
		 */
		infoId?: string;
		/**
		 * 文件名
		 */
		name?: string;
		/**
		 * 2D图纸
		 */
		d2?: string;
		/**
		 * 3D图纸
		 */
		d3?: string;
		/**
		 * 外形尺寸
		 */
		size?: string;
		/**
		 * 材料
		 */
		materialDict?: json;
		/**
		 * 表面处理
		 */
		surfaceDict?: number;
		/**
		 * 数量
		 */
		num?: number;
		/**
		 * 期望单价
		 */
		expectPrice?: number;
		/**
		 * 3D图纸解析状态 0-解析中 1-成功 2-失败
		 */
		d3Status?: number;
		/**
		 * 3D图纸解析完的URL
		 */
		d3Url?: string;
		/**
		 * 3D图纸解析完的图片
		 */
		d3Pic?: string;
		/**
		 * 3D图纸解析结果
		 */
		d3Result?: json;
		/**
		 * 3D图纸的轴
		 */
		boundingBox?: json;
		/**
		 * 体积
		 */
		volume?: number;
		/**
		 * 表面积
		 */
		area?: number;
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

	interface InfoConsultInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 项目名称
		 */
		name?: string;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 图纸数量
		 */
		drawNum?: number;
		/**
		 * 总件数
		 */
		num?: number;
		/**
		 * 状态 0-待报价 1-已报价
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

	interface InfoFeedbackEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 身份
		 */
		identityDict?: number;
		/**
		 * 不满意
		 */
		dissatisfied?: string;
		/**
		 * 希望做
		 */
		hopeDo?: string;
		/**
		 * 联系方式
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

	interface InfoNewsEntity {
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

	interface UserAddressEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: BigInt;
		/**
		 * 省份
		 */
		province?: string;
		/**
		 * 城市
		 */
		city?: string;
		/**
		 * 区
		 */
		district?: string;
		/**
		 * 详细地址
		 */
		detail?: string;
		/**
		 * 联系人
		 */
		contact?: string;
		/**
		 * 手机号码
		 */
		phone?: string;
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

	interface UserCollectCompanyEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 标签
		 */
		labels?: json;
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
		 * 昵称
		 */
		nickname?: string;
		/**
		 * 手机号
		 */
		phone?: string;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 邮箱
		 */
		email?: string;
		/**
		 * 头像
		 */
		avatar?: string;
		/**
		 * 微信unionid
		 */
		unionid?: string;
		/**
		 * 省
		 */
		province?: string;
		/**
		 * 城市
		 */
		city?: string;
		/**
		 * 区域
		 */
		district?: string;
		/**
		 * 公司名称
		 */
		company?: string;
		/**
		 * 公司ID
		 */
		companyId?: number;
		/**
		 * 性别 0-未知 1-男 2-女
		 */
		sex?: number;
		/**
		 * 状态 0-禁用 1-正常
		 */
		status?: boolean;
		/**
		 * 角色 0-复核 1-制单
		 */
		role?: number;
		/**
		 * 邀请人ID
		 */
		inviterId?: number;
		/**
		 * 来源 owner-机主端
		 */
		app?: string;
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

	interface UserInvoiceInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 类型 0-普通发票 1-专用发票
		 */
		type?: number;
		/**
		 * 抬头
		 */
		lookUp?: string;
		/**
		 * 纳税人识别号
		 */
		taxNumber?: string;
		/**
		 * 开户行
		 */
		bankName?: string;
		/**
		 * 开户账户
		 */
		bankNum?: string;
		/**
		 * 注册地址
		 */
		regAddress?: string;
		/**
		 * 注册电话
		 */
		regPhone?: string;
		/**
		 * 地址ID
		 */
		addressId?: number;
		/**
		 * 邮箱
		 */
		email?: string;
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

	interface UserInvoiceOrderEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 订单ID
		 */
		orderId?: number;
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

	interface UserInvoiceRecordEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: number;
		/**
		 * 介质 0-电子发票 1-纸质发票
		 */
		medium?: number;
		/**
		 * 号码
		 */
		num?: string;
		/**
		 * 金额
		 */
		money?: number;
		/**
		 * 开票信息
		 */
		info?: json;
		/**
		 * 状态 0-开票中 1-已发邮箱 2-已邮寄 3-已取消
		 */
		status?: number;
		/**
		 * 物流单号
		 */
		logisticsNum?: string;
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
		 * 获得配置参数
		 */
		data(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
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

	interface DemoCache {
		/**
		 * geo
		 */
		geo(data?: any): Promise<any>;
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

	interface DemoConfig {
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

	interface DemoEs {
		/**
		 * test
		 */
		test(data?: any): Promise<any>;
		/**
		 * 空间地理位置
		 */
		geo(data?: any): Promise<any>;
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

	interface DemoFile {
		/**
		 * 下载并上传
		 */
		downAndUpload(data?: any): Promise<any>;
		/**
		 * 获得上传模式
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
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
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DemoGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;
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
		 * alipay
		 */
		alipay(data?: any): Promise<any>;
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

	interface DemoSms {
		/**
		 * test
		 */
		test(data?: any): Promise<any>;
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

	interface DemoSwagger {
		/**
		 * 创建
		 */
		create(data?: any): Promise<any>;
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

	interface DemoTag {
		/**
		 * data
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

	interface DemoUtil {
		/**
		 * 公司信息
		 */
		companyInfo(data?: any): Promise<any>;
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

	interface InfoCompanyAbility {
		/**
		 * 提交
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 详情
		 */
		detail(data?: any): Promise<any>;
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
		info(data?: any): Promise<InfoCompanyAbilityEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoCompanyAbilityEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoCompanyAbilityEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface InfoCompanyCredit {
		/**
		 * 提交
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoCompanyCreditEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoCompanyCreditEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<InfoCompanyCreditEntity>;
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

	interface InfoCompanyDeviceLocation {
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<InfoCompanyDeviceLocationEntity>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<InfoCompanyDeviceLocationEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoCompanyDeviceLocationEntity[];
			[key: string]: any;
		}>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
	}

	interface InfoCompanyDeviceMain {
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
		info(data?: any): Promise<InfoCompanyDeviceMainEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoCompanyDeviceMainEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoCompanyDeviceMainEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface InfoCompanyDeviceQuality {
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
		info(data?: any): Promise<InfoCompanyDeviceQualityEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoCompanyDeviceQualityEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoCompanyDeviceQualityEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface InfoCompanyInfo {
		/**
		 * 公司详情
		 */
		detailAll(data?: any): Promise<any>;
		/**
		 * 搜索公司信息(天眼查接口)
		 */
		search(data?: any): Promise<any>;
		/**
		 * 公司概况
		 */
		survey(data?: any): Promise<any>;
		/**
		 * 检索信息(搜索引擎，公司设备信息)
		 */
		find(data?: any): Promise<any>;
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

	interface InfoCompanyPhoto {
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
		info(data?: any): Promise<InfoCompanyPhotoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoCompanyPhotoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoCompanyPhotoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface InfoCompanyRealaddr {
		/**
		 * 提交
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 状态
		 */
		status(data?: any): Promise<any>;
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

	interface InfoConsultDraw {
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
		info(data?: any): Promise<InfoConsultDrawEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoConsultDrawEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoConsultDrawEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface InfoConsultInfo {
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
		info(data?: any): Promise<InfoConsultInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoConsultInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoConsultInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface InfoFeedback {
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoFeedbackEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<InfoFeedbackEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<InfoFeedbackEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
	}

	interface InfoNews {
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<InfoNewsEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: InfoNewsEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<InfoNewsEntity>;
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

	interface OrderInfo {
		/**
		 * 物流查询
		 */
		logistics(data?: any): Promise<any>;
		/**
		 * 提交订单
		 */
		submit(data?: any): Promise<any>;
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

	interface OrderPay {
		/**
		 * wxNotify
		 */
		wxNotify(data?: any): Promise<any>;
		/**
		 * 小程序支付
		 */
		wxMini(data?: any): Promise<any>;
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

	interface Preview {
		/**
		 * 触发处理
		 */
		handle(data?: any): Promise<any>;
		/**
		 * 完善参数
		 */
		param(data?: any): Promise<any>;
		/**
		 * 3D图纸预览
		 */
		d3(data?: any): Promise<any>;
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

	interface UserAddress {
		/**
		 * default
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
			pagination: { size: number; page: number; total: number };
			list: UserAddressEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface UserCollect {
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
		info(data?: any): Promise<UserCollectCompanyEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserCollectCompanyEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: UserCollectCompanyEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface UserInfo {
		/**
		 * 更新用户信息
		 */
		personUpdate(data?: any): Promise<any>;
		/**
		 * 获得手机号
		 */
		getMiniPhone(data?: any): Promise<any>;
		/**
		 * 条件 0-实地认证 1-添加角色 2-询价
		 */
		condition(data?: any): Promise<any>;
		/**
		 * 个人信息
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

	interface UserInvoiceInfo {
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
		info(data?: any): Promise<UserInvoiceInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserInvoiceInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: UserInvoiceInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
	}

	interface UserInvoiceOrder {
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: UserInvoiceOrderEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<UserInvoiceOrderEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<UserInvoiceOrderEntity>;
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

	interface UserInvoiceRecord {
		/**
		 * 提交开票信息
		 */
		submit(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserInvoiceRecordEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: UserInvoiceRecordEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<UserInvoiceRecordEntity[]>;
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

	interface UserLogin {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * 小程序登录
		 */
		wxMini(data?: any): Promise<any>;
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
		base: { comm: BaseComm };
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
			sms: DemoSms;
			swagger: DemoSwagger;
			tag: DemoTag;
			util: DemoUtil;
		};
		dict: { info: DictInfo };
		info: {
			company: {
				ability: InfoCompanyAbility;
				credit: InfoCompanyCredit;
				device: {
					location: InfoCompanyDeviceLocation;
					main: InfoCompanyDeviceMain;
					quality: InfoCompanyDeviceQuality;
				};
				info: InfoCompanyInfo;
				photo: InfoCompanyPhoto;
				realaddr: InfoCompanyRealaddr;
			};
			consult: { draw: InfoConsultDraw; info: InfoConsultInfo };
			feedback: InfoFeedback;
			news: InfoNews;
		};
		order: { info: OrderInfo; pay: OrderPay };
		preview: Preview;
		user: {
			address: UserAddress;
			collect: UserCollect;
			info: UserInfo;
			invoice: { info: UserInvoiceInfo; order: UserInvoiceOrder; record: UserInvoiceRecord };
			login: UserLogin;
		};
		test: Test;
	};
}
