declare namespace my {
  interface ISwitchTabOptions extends INavigateBaseCallbackOptions {
    /**
     * 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
     */
    url: string;
  }
  /**
   * 跳转到指定 tabBar 页面，并关闭其他所有非 tabBar 页面。
   */
  function switchTab(options: ISwitchTabOptions): void;

  interface IHideTabBarOptions {
    /**
     * 是否需要动画效果，默认无。
     */
    animation?: boolean;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库版本 1.11.0 或更高版本，低版本需要做 兼容处理。
   * 隐藏标签页（tabbar）。
   */
  function hideTabBar(options: IHideTabBarOptions): void;

  interface IHideTabBarRedDotOptions {
    /**
     * tabbar 的哪一项，从左边算起。
     */
    index: number;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 隐藏标签页（tabbar）某一项右上角的红点。
   */
  function hideTabBarRedDot(options: IHideTabBarRedDotOptions): void;

  interface IRemoveTabBarBadgeOptions {
    /**
     * 标签页的项数序号，从左边开始计数。
     */
    index: number;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 移除标签页（tabbar） 某一项右上角的文本。
   */
  function removeTabBarBadge(options: IRemoveTabBarBadgeOptions): void;

  interface ISetTabBarBadgeOptions {
    /**
     * 标签页的项数序号，从左边开始计数。
     */
    index: number;

    /**
     * 显示的文本，超过三个字符则显示成前两个字符+“…”，例如：“支付宝”显示“支付宝”，“蚂蚁金服”显示“蚂蚁…”。
     */
    text: string;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 及以上版本。
   * 为标签页（tabbar）某一项的右上角添加文本。
   */
  function setTabBarBadge(options: ISetTabBarBadgeOptions): void;

  interface ISetTabBarItemOptions {
    /**
     * 标签页的项数序号，从左边开始计数。
     */
    index: number;

    /**
     * 标签页按钮上的文字。
     */
    text: string;

    /**
     * 图片路径，建议尺寸为 81px * 81px，支持网络图片。
     */
    iconPath: string;

    /**
     * 选中时的图片路径，建议尺寸为 81px * 81px，支持网络图片。
     */
    selectedIconPath: string;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 动态设置标签页（tabbar）某一项的内容。
   */
  function setTabBarItem(options: ISetTabBarItemOptions): void;

  interface ISetTabBarStyleOptions {
    /**
     * 标签（tab）上的文字默认颜色
     */
    color: string;

    /**
     * 标签（tab）上的文字选中时的颜色
     */
    selectedColor: string;

    /**
     * 标签（tab）的背景色
     */
    backgroundColor: string;

    /**
     * 标签页（tabbar）上边框的颜色， 仅支持  black 、 white 。
     */
    borderStyle: string;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 动态设置标签页（tabbar）的整体样式，如文字颜色、标签背景色、标签边框颜色等。
   */
  function setTabBarStyle(options: ISetTabBarStyleOptions): void;

  interface IShowTabBarOptions {
    /**
     * 是否需要动画效果，默认无。
     */
    animation?: string;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 显示标签页（tabbar）。
   */
  function showTabBar(options: IShowTabBarOptions): void;

  interface IShowTabBarRedDotOptions {
    /**
     * 标签页的项数序号，从左边开始计数。
     */
    index: number;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 显示标签页（tabbar）某一项的右上角的红点。
   */
  function showTabBarRedDot(options: IShowTabBarRedDotOptions): void;
}
