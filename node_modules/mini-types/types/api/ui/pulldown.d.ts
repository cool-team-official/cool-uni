/**
 * @file 设置页面是否支持下拉
 */

declare namespace my {
  interface ICanPullDownOptions {
    canPullDown: boolean;
  }

  /**
   * 设置页面是否支持下拉（小程序内页面默认支持下拉）
   */
  function setCanPullDown(options: ICanPullDownOptions): void;
}
