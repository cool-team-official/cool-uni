/**
 * @file 打开支付宝应用或页面
 */
declare namespace my {
  interface INavigateToAlipayPageSuccessResult {
    readonly success: boolean;
  }

  interface INavigateToAlipayPageOptions {
    /**
     * 要跳转的支付宝业务、运营活动schema或url，如果url中带有参数，请务必先将整个url做encode处理
     *
     * 注：path目前暂未全量开放，跳转链接请找对应的接口人咨询。
     */
    path: string;

    /**
     * 跳转成功
     */
    success?(res: INavigateToAlipayPageSuccessResult): void;

    /**
     * 跳转失败
     *
     * - 2：参数错误，打开失败
     */
    fail?(error: any): void;
  }

  namespace ap {
    /**
     * 小程序中跳转到支付宝官方业务或运营活动页面，例如共享单车、城市服务。
     */
    function navigateToAlipayPage(options: INavigateToAlipayPageOptions): void;
  }
}
