/**
 * @file 小程序唤起支付
 */
declare namespace my {
  interface ITradePaySuccessResult {
    /**
     * - 9000：订单支付成功
     * - 8000：正在处理中
     * - 4000：订单支付失败
     * - 6001：用户中途取消
     * - 6002：网络连接出错
     * - 6004：支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
     * - 99：用户点击忘记密码导致快捷界面退出(only iOS)
     */
    resultCode: '9000' | '8000' | '4000' | '6001' | '6002' | '6004' | '99';

    callbackUrl?: string;
    extendInfo?: Record<string, any>;
    memo?: string;
    result?: any;
  }

  interface ITradePayOptions {
    /**
     * 接入小程序支付时传入此参数。此参数为支付宝交易号，注意参数有大小写区分。
     */
    tradeNO?: string;

    /**
     * 完整的支付参数拼接成的字符串，从服务端获取。
     */
    orderStr?: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: ITradePaySuccessResult): void;

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
   * 发起支付
   */
  function tradePay(options: ITradePayOptions): void;
}
