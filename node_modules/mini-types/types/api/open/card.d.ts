/**
 * @file 支付宝卡包
 */
declare namespace my {
  /**
   * 打开支付宝卡列表。
   */
  function openCardList(): void;

  interface IOpenMerchantCardListOptions {
    /**
     * 商户编号
     */
    partnerId: string;
  }

  /**
   * 打开当前用户的某个商户的卡列表
   */
  function openMerchantCardList(params: IOpenMerchantCardListOptions): void;

  interface IOpenCardDetailOptions {
    /**
     * 卡实例Id
     *
     * passId获取方式：
     *  - 1）通过alipass创建的卡
     *      调用alipay.pass.instance.add(支付宝pass新建卡券实例接口)接口，在出参“result”中可获取
     *
     *  - 2）通过会员卡创建的卡
     *      调用alipay.marketing.card.query(会员卡查询)接口，在schema_url中可获取，具体参数为“p=xxx”，xxx即为passId。
     */
    passId: string;
  }

  /**
   * 打开当前用户的某张卡的详情页
   */
  function openCardDetail(params: IOpenCardDetailOptions): void;

  /**
   * 打开支付宝券列表
   */
  function openVoucherList(): void;

  interface IOpenMerchantVoucherListOptions {
    /**
     * 商户编号
     */
    partnerId: string;
  }

  /**
   * 打开当前用户的某个商户的券列表
   */
  function openMerchantVoucherList(params: IOpenMerchantVoucherListOptions): void;

  type OpenDetailOptions = {
    /**
     * 券实例Id，调用券发放接口可以获取该参数（如果传入了partnerId和serialNumber则不需传入）
     */
    passId: string;
  } | {
    /**
     * 商户编号，以 2088 为开头（如果传入了passId则不需传入）
     */
    partnerId: string;

    /**
     * 序列号，调用新建卡券模板可以获取该参数（如果传入了passId则不需传入）
     */
    serialNumber: string;
  };

  /**
   * 打开当前用户的某张券的详情页（非口碑）
   */
  function openVoucherDetail(params: OpenDetailOptions): void;

  /**
   * 打开当前用户的某张券的详情页（口碑）
   */
  function openKBVoucherDetail(params: OpenDetailOptions): void;

  /**
   * 打开支付宝票列表。
   */
  function openTicketList(): void;

  /**
   * 打开某个商户的票列表
   */
  function openMerchantTicketList(params: { partnerId: string; }): void;

  /**
   * 打开当前用户的某张票的详情页
   */
  function openTicketDetail(params: OpenDetailOptions): void;

  type AddCardAuthSuccessResult = {
    /**
     * true 表示领卡成功
     */
    readonly success: true;

    /**
     * 9000 表示成功
     */
    readonly resultStatus: string;

    /**
     * 结果内容
     */
    readonly result: {
      /**
       * 应用id
       */
      readonly app_id: string;

      /**
       * 授权码，用于换取authtoken
       */
      readonly auth_code: string;

      /**
       * 授权的state
       */
      readonly state: string;

      /**
       * 授权scope
       */
      readonly scope: string;

      /**
       * 会员卡模板Id
       */
      readonly template_id: string;

      /**
       * 会员卡表单信息请求Id
       */
      readonly request_id: string;

      /**
       * 会员卡领卡链接透传参数
       */
      readonly out_string: string;
    };
  } | {
    /**
     * true 表示领卡成功
     */
    readonly success: false;

    /**
     * 失败的错误码
     * - JSAPI_SERVICE_TERMINATED：用户取消
     * - JSAPI_PARAM_INVALID：url 为空或非法参数
     * - JSAPI_SYSTEM_ERROR：系统错误
     */
    readonly code: 'JSAPI_SERVICE_TERMINATED' | 'JSAPI_PARAM_INVALID' | 'JSAPI_SYSTEM_ERROR';
  };

  interface IAddCardAuthOptions {
    /**
     * 开卡授权的页面地址，从  alipay.marketing.card.activateurl.apply接口获取
     */
    url: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: AddCardAuthSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res?: AddCardAuthSuccessResult): void;
  }

  /**
   * 小程序唤起会员开卡授权页面
   */
  function addCardAuth(options: IAddCardAuthOptions): void;
}
