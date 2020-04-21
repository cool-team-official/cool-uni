/**
 * @file 升级支付宝最新版本
 */
declare namespace my {
  interface IUpdateAlipayClientSuccessResult {
    readonly success: boolean;
  }

  interface IUpdateAlipayClientOptions {
    /**
     * 跳转成功
     */
    success?(res: IUpdateAlipayClientSuccessResult): void;

    /**
     * - 3：发生未知错误
     */
    fail?(error: any): void;
  }

  namespace ap {
    /**
     * 打开支付宝客户端升级界面，用户可主动选择升级支付宝客户端。
     */
    function updateAlipayClient(options: IUpdateAlipayClientOptions): void;
  }
}
