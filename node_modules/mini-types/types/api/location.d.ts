/**
 * @file 位置
 */
declare namespace my {
  interface ILocation {
    /**
     * 纬度，浮点数，范围为-90~90，负数表示南纬
     */
    latitude: number;

    /**
     * 经度，浮点数，范围为-180~180，负数表示西经
     */
    longitude: number;
  }

  interface IGetLocationSuccessResult {
    /**
     * 城市级别的地区代码(type>0生效)
     */
    readonly cityAdcode?: string;

    /**
     * 国家编号 (type>0生效)
     */
    readonly countryCode?: string;

    /**
     * 省份(type>0生效)
     */
    readonly province?: string;

    /**
     * 区县级别的地区代码(type>0生效)
     */
    readonly districtAdcode?: string;

    /**
     * 需要POI级别逆地理的才会有的字段,定位点附近的 POI 信息，结构是：{name, address}（type>2生效）
     */
    readonly pois?: ReadonlyArray<{ readonly name: string; readonly address: string; }>;

    /**
     * 城市(type>0生效)
     */
    readonly city?: string;

    /**
     * 区县(type>0生效)
     */
    readonly district?: string;

    /**
     * 需要街道级别逆地理的才会有的字段,街道门牌信息，结构是：{street, number} (type>1生效)
     */
    readonly streetNumber?: {
      readonly street: string;
      readonly number: string;
    };

    /**
     * 国家(type>0生效)
     */
    readonly country?: string;
    readonly bearing: string;

    /**
     * 纬度
     */
    readonly latitude: string;

    /**
     * 精确度，单位m
     */
    readonly accuracy: string;

    /**
     * 经度
     */
    readonly longitude: string;

    /**
     * 水平精确度，单位m
     */
    readonly horizontalAccuracy: string;
  }

  interface IGetLocationFailResult {
    /**
     * - 11：请确认定位相关权限已开启。提示用户打开定位权限
     * - 12：网络异常，请稍后再试。提示用户检查当前网络
     * - 13：定位失败，请稍后再试
     * - 14：业务定位超时。提示用户再次尝试
     */
    readonly error: 11 | 12 | 13 | 14;
  }

  interface IGetLocationOptions {
    /**
     * 支付宝客户端经纬度定位缓存过期时间，单位秒。默认 30s。使用缓存会加快定位速度，缓存过期会重新定位
     */
    cacheTimeout?: number;

    /**
     * - 0：默认，获取经纬度
     * - 1：获取经纬度和详细到区县级别的逆地理编码数据
     * - 2：获取经纬度和详细到街道级别的逆地理编码数据，不推荐使用
     * - 3：获取经纬度和详细到POI级别的逆地理编码
     */
    type?: 0 | 1 | 2 | 3;

    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: IGetLocationSuccessResult) => void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IGetLocationFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IGetLocationFailResult | IGetLocationSuccessResult): void;
  }

  /**
   * 获取用户当前的地理位置信息
   */
  function getLocation(options: IGetLocationOptions): void;

  interface IChooseLocationResult extends Readonly<ILocation> {
    /**
     * 位置名称
     */
    readonly name: string;

    /**
     * 详细地址
     */
    readonly address: string;
  }

  interface IChooseLocationOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: IChooseLocationResult) => void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res?: IChooseLocationResult): void;
  }

  /**
   * 使用支付宝内置地图选择地理位置。
   */
  function chooseLocation(options: IChooseLocationOptions): void;

  interface IOpenLocationOptions extends ILocation {
    /**
     * 缩放比例，范围1~28，默认为28
     */
    scale?: number;

    /**
     * 位置名
     */
    name?: string;

    /**
     * 地址的详细说明
     */
    address?: string;

    /**
     * 调用成功的回调函数
     */
    success?(): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 使用支付宝内置地图查看位置
   */
  function openLocation(options: IOpenLocationOptions): void;
}
