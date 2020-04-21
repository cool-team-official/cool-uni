/**
 * @file 获取用户手机号
 */
declare namespace my {
  interface IGetPhoneNumberSuccessResult {
    /**
     * 完整的报文数据，前端需要将该报文发送到开发者服务端做验签和解密处理
     */
    readonly response: string;
  }

  interface IGetPhoneNumberOptions {
    success?(res: IGetPhoneNumberSuccessResult): void;
    fail?(res: any): void;
  }

  /**
   * 获取支付宝用户绑定的手机号
   */
  function getPhoneNumber(options: IGetPhoneNumberOptions): void;
}
