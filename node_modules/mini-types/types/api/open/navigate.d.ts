/**
 * @file 小程序跳转
 */
declare namespace my {
  interface INavigateToMiniProgram {
    /**
     * 要跳转的目标小程序appId
     */
    appId: string;

    /**
     * 打开的页面路径，如果为空则打开首页
     */
    path?: string;

    /**
     * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
     */
    extraData?: Record<string, any>;

    /**
     * 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。默认值 release
     */
    envVersion?: 'develop' | 'trial' | 'release';

    /**
     * 调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: any): void;
  }

  /**
   * 跳转到其他小程序。
   */
  function navigateToMiniProgram(options: INavigateToMiniProgram): void;

  interface INavigateBackMiniProgram {
    /**
     * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
     */
    extraData?: Record<string, any>;

    /**
     * 调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: any): void;
  }

  /**
   * 跳转回上一个小程序，只有当另一个小程序跳转到当前小程序时才会能调用成功
   */
  function navigateBackMiniProgram(options: INavigateBackMiniProgram): void;
}
