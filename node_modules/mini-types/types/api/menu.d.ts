/**
 * @file 自定义通用菜单
 */
declare namespace my {
  interface IHideShareMenuOptions {
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
   * 隐藏当前页面通用菜单（右上角）中的分享功能。
   */
  function hideShareMenu(options?: IHideShareMenuOptions): void;

  /**
   * 隐藏当前页面通用菜单中的添加到桌面功能
   */
  function hideAddToDesktopMenu(): void;

  /**
   * 隐藏所有页面的通用菜单中的添加到桌面功能
   */
  function hideAllAddToDesktopMenu(): void;

  /**
   * 隐藏当前页面的通用菜单中的收藏按钮
   */
  function hideFavoriteMenu(): void;

  /**
   * 隐藏所有页面的通用菜单中的收藏功能
   */
  function hideAllFavoriteMenu(): void;
}
