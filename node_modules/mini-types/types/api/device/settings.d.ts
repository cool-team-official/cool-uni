/**
 * @file 设置
 */
declare namespace my {
  type SettingScopeList = 'scope.userInfo' | 'scope.location' | 'scope.album' | 'scope.camera' | 'scope.audioRecord';

  interface IOpenSettingSuccessOptions {
    /**
     * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见[scope列表](https://docs.alipay.com/mini/api/xmk3ml#scope-%E5%88%97%E8%A1%A8)。
     */
    readonly authSetting: Readonly<Record<SettingScopeList, boolean>>;
  }

  interface IOpenSettingOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?(res: IOpenSettingSuccessOptions): void;

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
   * 打开小程序设置界面，返回用户权限设置的结果；设置界面只会出现小程序已经向用户请求过的权限。
   */
  function openSetting(options: IOpenSettingOptions): void;

  interface IGetSettingSuccessResult {
    /**
     * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见[scope列表](https://docs.alipay.com/mini/api/xmk3ml#scope-%E5%88%97%E8%A1%A8)
     */
    readonly authSetting: Readonly<Record<SettingScopeList, boolean>>;
  }

  interface IGetSettingOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?(res: IGetSettingSuccessResult): void;

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
   * 获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限。
   */
  function getSetting(options: IGetSettingOptions): void;
}
