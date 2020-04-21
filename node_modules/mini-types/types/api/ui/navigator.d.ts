declare namespace my {
  interface INavigateBaseCallbackOptions {
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

  interface INavigateToOptions extends INavigateBaseCallbackOptions {
    /**
     * 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。
     * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；
     * 如 path?key1=value1&key2=value2
     */
    url: string;
  }
  /**
   * 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。
   * 注意：页面最大深度为10，即可连续调用 10 次 navigateTo
   */
  function navigateTo(options: INavigateToOptions): void;

  interface IRedirectToOptions extends INavigateBaseCallbackOptions {
    /**
     * 需要跳转的应用内非 tabBar 的目标页面路径，路径后可以带参数。
     * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；
     * 如path?key1=value1&key2=value2
     */
    url: string;
  }
  /**
   * 关闭当前页面，跳转到应用内的某个指定页面。
   */
  function redirectTo(options: IRedirectToOptions): void;

  interface INavigateBackOptions {
    /**
     * 返回的页面数，如果 delta 大于现有打开的页面数，则返回到首页
     */
    delta?: number;
  }
  /**
   * 关闭当前页面，返回上一级或多级页面。可通过 getCurrentPages 获取当前的页面栈信息，决定需要返回几层。
   */
  function navigateBack(options?: INavigateBackOptions): void;

  interface IRelaunchOptions extends INavigateBaseCallbackOptions {
    /**
     * 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。
     * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；
     * 如path?key1=value1&key2=value2
     */
    url: string;
  }
  /**
   * 关闭当前所有页面，跳转到应用内的某个指定页面。
   * 基础库 1.4.0+ & 支付宝客户端 10.1.8+ 支持
   */
  function reLaunch(options: IRelaunchOptions): void;

  interface ISetNavigationBar extends INavigateBaseCallbackOptions {
    /**
     * 导航栏标题
     */
    title?: string;
    /**
     * 图片连接地址，必须是https，请使用3x高清图片。若设置了image则title参数失效
     */
    image?: string;
    /**
     * 导航栏背景色，支持十六进制颜色值
     */
    backgroundColor?: string;
    /**
     * 导航栏底部边框颜色，支持十六进制颜色值。若设置了 backgroundColor，则borderBottomColor 不会生效，默认会和 backgroundColor 颜色一样
     */
    borderBottomColor?: string;
    /**
     * 是否重置导航栏为支付宝默认配色，默认 false
     */
    reset?: boolean;
  }

  /**
   * 设置导航栏文字及样式。
   */
  function setNavigationBar(options: ISetNavigationBar): void;

  /**
   * 显示导航栏 loading。
   */
  function showNavigationBarLoading(): void;

  /**
   * 隐藏导航栏 loading。
   */
  function hideNavigationBarLoading(): void;

  /**
   * 隐藏TitleBar上的返回首页图标，和通用菜单中的“返回首页”功能。
   * 返回首页功能出现时机：当用户启动小程序，若直接进入的页面不是小程序的首页，则会在左上角出现返回首页icon，若用户继续在页面中进入下一级页面，则在右上角更多菜单中，会出现“返回首页”功能。
   */
  function hideBackHome(): void;
}
