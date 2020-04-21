/**
 * @file 窗口背景
 */

declare namespace my {
  interface ISetBackgroundColorOptions {
    /**
     * 窗口的背景色
     */
    backgroundColor: string;

    /**
     * 顶部窗口的背景色，仅 iOS 支持
     */
    backgroundColorTop: string;

    /**
     * 底部窗口的背景色，仅 iOS 支持
     */
    backgroundColorBottom: string;

    /**
     * 接口调用成功的回调函数
     */
    success?(): void;

    /**
     * 接口调用失败的回调函数
     */
    fail?(): void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 动态设置窗口的背景色
   */
  function setBackgroundColor(options: ISetBackgroundColorOptions): void;

  interface ISetBackgroundTextStyleOptions {
    /**
     * 下拉背景字体、loading 图的样式，仅支持 'dark', 'light'
     */
    textStyle: 'dark' | 'light';

    /**
     * 接口调用成功的回调函数
     */
    success?(): void;

    /**
     * 接口调用失败的回调函数
     */
    fail?(): void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 动态设置下拉背景字体、loading 图的样式
   */
  function setBackgroundTextStyle(options: ISetBackgroundTextStyleOptions): void;
}
