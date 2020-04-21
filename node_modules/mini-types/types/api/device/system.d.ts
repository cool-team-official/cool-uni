/**
 * @file 系统信息
 */
declare namespace my {
  interface IGetSystemInfoSuccessResult {
    /**
     * 用户设置字体大小
     */
    readonly fontSizeSetting: number;

    /**
     * 系统版本
     */
    readonly system: string;

    /**
     * 支付宝版本号
     */
    readonly version: string;

    /**
     * 手机品牌
     */
    readonly brand: string;

    /**
     * 当前电量百分比
     */
    readonly currentBattery: string;

    /**
     * 窗口高度
     */
    readonly windowHeight: number;

    /**
     * 设备像素比
     */
    readonly pixelRatio: number;

    /**
     * 系统名
     */
    readonly platform: 'Android' | 'iOS' | 'iPhone OS';

    /**
     * 屏幕高度
     */
    readonly screenHeight: number;

    /**
     * 状态栏高度
     */
    readonly statusBarHeight: number;

    /**
     * 支付宝设置的语言
     */
    readonly language: string;

    /**
     * 设备磁盘容量
     */
    readonly storage: string;

    /**
     * 当前运行的客户端，当前是支付宝则有效值是"alipay"
     */
    readonly app: string;

    /**
     * 标题栏高度
     */
    readonly titleBarHeight: number;

    /**
     * 手机型号
     */
    readonly model: string;

    /**
     * 屏幕宽度
     */
    readonly screenWidth: number;

    /**
     * 窗口宽度
     */
    readonly windowWidth: number;
  }

  interface IGetSystemInfoOptions {
    /**
     * 接口调用成功的回调
     */
    success?(res?: IGetSystemInfoSuccessResult): void;

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
   * 获取系统信息。
   */
  function getSystemInfo(options: IGetSystemInfoOptions): void;

  /**
   * 返回值同 getSystemInfo success 回调参数
   */
  function getSystemInfoSync(): IGetSystemInfoSuccessResult;
}
