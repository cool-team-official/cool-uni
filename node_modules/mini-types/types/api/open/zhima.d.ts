/**
 * @file 芝麻认证
 */
declare namespace my {
  interface IStartZMVerifySuccessResult {
    /**
     * 认证标识
     */
    readonly token: string;

    /**
     * 认证是否通过
     */
    readonly passed: string;

    /**
     * 认证不通过原因
     */
    readonly reason?: string;
  }

  interface IStartZMVerifyOptions {
    /**
     * 认证标识
     */
    bizNo: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: IStartZMVerifySuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 芝麻认证接口，调用此接口可以唤起芝麻认证页面并进行人脸身份验证。
   *
   * 需要通过蚂蚁开发平台，调用certification.initialize接口进行[认证初始化](https://docs.alipay.com/zmxy/271/105914)。获得biz_no 后，方能通过以下接口激活芝麻认证小程序。
   */
  function startZMVerify(options: IStartZMVerifyOptions): void;
}
