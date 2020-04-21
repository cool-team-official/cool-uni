/**
 * @file 屏幕亮度
 */
declare namespace my {
  interface ISetKeepScreenOnOptions {
    /**
     * 是否保持屏幕长亮状态
     */
    keepScreenOn: boolean;

    /**
     * 接口调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 设置是否保持屏幕长亮状态。仅在当前小程序生效，离开小程序后失效。
   */
  function setKeepScreenOn(options: ISetKeepScreenOnOptions): void;

  interface IGetScreenBrightnessOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 获取屏幕亮度
   */
  function getScreenBrightness(options: IGetScreenBrightnessOptions): void;

  interface ISetScreenBrightnessOptions {
    /**
     * 需要设置的屏幕亮度，取值范围0-1
     */
    brightness: number;

    /**
     * 接口调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 设置屏幕亮度
   */
  function setScreenBrightness(options: ISetScreenBrightnessOptions): void;
}
