/**
 * @file 获取服务器时间
 */
declare namespace my {
  interface IGetServerTimeSuccessResult {
    /**
     * 服务器时间的毫秒数
     */
    readonly time: number;
  }

  interface IGetServerTimeOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: IGetServerTimeSuccessResult): void;

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
   * 获取当前服务器时间的毫秒数。
   */
  function getServerTime(options: IGetServerTimeOptions): void;
}
