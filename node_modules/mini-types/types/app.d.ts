declare namespace tinyapp {
  type Query = Record<string, string | number>;

  interface IAppLaunchOptions {
    /**
     * 当前小程序的 query，从启动参数的 query 字段解析而来
     */
    query?: Query;

    /**
     * 当前小程序的页面地址，从启动参数 page 字段解析而来，page 忽略时默认为首页
     */
    path?: string;

    /**
     * 来源信息。
     */
    referrerInfo?: {
      /**
       * 来源小程序
       */
      appId: string;

      /**
       * 来源插件，当处于插件运行模式时可见
       */
      sourceServiceId: string;

      /**
       * 来源小程序传过来的数据。
       */
      extraData: Record<string, any>;
    };
  }

  interface IAppOptionsMethods {
    /**
     * 生命周期函数。
     *
     * 监听小程序初始化。
     *
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）。
     */
    onLaunch?(options: IAppLaunchOptions): void;

    /**
     * 生命周期函数。
     *
     * 监听小程序显示。
     *
     * 当小程序启动，或从后台进入前台显示，会触发 onShow。
     *
     * **注意:** 不要在 onShow 中进行 redirectTo/navigateTo 等操作页面栈的行为。
     */
    onShow?(options: IAppLaunchOptions): void;

    /**
     * 生命周期函数。
     *
     * 监听小程序隐藏。
     *
     * 当小程序从前台进入后台，会触发 onHide。
     */
    onHide?(): void;

    /**
     * 错误监听函数。
     *
     * 当小程序发生脚本错误，或者 API 调用失败时，会触发 onError 并带上错误信息。
     */
    onError?(error: any): void;

    /**
     * 全局分享配置。
     *
     * 当页面未设置 `page.onShareAppMessage` 时调用分享会执行全局的分享设置。
     */
    onShareAppMessage?(options: OnShareAppMessageOptions): IOnShareAppMessageResult;
  }

  interface IAppInstance<G> {
    /**
     * 全局状态数据。
     */
    globalData: G;
  }

  /**
   * App 实现的接口对象
   * 参考: https://docs.alipay.com/mini/framework/app
   */
  type AppOptions<G = any> = IAppOptionsMethods
    & {
        globalData?: G;
        [name: string]: any;
      }
    & ThisType<IAppInstance<G>>;
}
