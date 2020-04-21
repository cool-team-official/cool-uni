/**
 * @file 客户端获取会员信息
 */
declare namespace my {
  interface IGetAuthUserInfoSuccessResult {
    /**
     * 用户昵称
     */
    readonly nickName: string;

    /**
     * 用户头像链接
     */
    readonly avatar: string;
  }

  interface IGetAuthUserInfoOptions {
    /**
     * 调用成功的回调函数
     */
    success?(result: IGetAuthUserInfoSuccessResult): void;

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
   * 客户端获取会员信息。
   */
  function getAuthUserInfo(options: IGetAuthUserInfoOptions): void;
}
