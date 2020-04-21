/**
 * @file 先享后付保障
 */

declare namespace my {
  interface INsfSuccessResult {
    /**
     * 风险识别结果：
     * - riskinfo_nsf_common—风险评级结果 rank0 提供信息不足，提供参数信息有误，或提供的支付宝账号不存在
     *  - rank1 表示用户拒付风险为低rank2 表示用户拒付风险为中
     *  - rank3 表示用户拒付风险为高；
     *
     * - riskinfo_nsf_common_infocode——表示风险识别类型；先享后付场景下当前类型标识为172，无其余类型；
     *
     * @example {\"riskinfo_nsf_common_infocode\":\"172\",\"riskinfo_nsf_common\":\"rank1\"}
     */
    readonly riskResult: string;

    /**
     * 风险信息描述
     *
     * @example {"rank0":"等级0"}
     */
    readonly riskResultDesc: string;

    /**
     * 业务唯一识别码
     *
     * 用户标识请求信息
     *
     * @example 0b92uueie87636222
     */
    readonly uniqueId: string;
  }

  interface INsfFailResult {
    /**
     * 识别错误码
     */
    readonly errorCode: string;

    /**
     * 识别错误信息
     *
     * - serviceNoAuth：服务未授权。请检查配置的账户是否已签约响应的功能包
     * - riskTypeNoAuth：场景（risktype）未授权。请检查配置的账户是否已签约响应的功能包；请检查risktype参数是否正确
     * - bizContentEmpty：风险数据内容为空。检查入参数据格式
     * - paramMissingError：参数缺失。检查必传参数是否传入
     * - param error：参数错误。检查入参格式是否符合文档要求
     * - SYSTEM_OUT_ERROR：系统繁忙。请稍后再试
     * - INVALID_PARAMETER：缺少必选参数或参数有误。检查参数是否正确或者缺失
     * - OVER_LIMIT：超过调用量限制。如需增加额度，请发邮件至RiskGoCSC@service.alipay.com进行申请
     */
    readonly errorMessage: string;
  }

  interface INsfOptions {
    /**
     * 小程序的开放平台账号
     */
    pid: string;

    /**
     * 小程序对应的APPID
     */
    appId: string;

    /**
     * 需要识别的业务参数
     */
    biz_context: {
      /**
       * 用于代表商户风险类型
       */
      risk_type: 'riskinfo_nsf_common';

      /**
       * 用于输入使用此服务的商户ID
       */
      pid: string;

      /**
       * 用于输入用户支付宝的 2088 账号，如不了解此字段如何获取，可了解下静默授权。如参数无法提供，请填写“null”
       */
      user_id: string;

      /**
       * 用于输入用户注册支付宝的手机号码。如参数无法提供，请填写“null”
       */
      mobile_no: string;

      /**
       * 用于输入用户身份证号。如参数无法提供，请填写“null”
       */
      cert_no?: string;

      /**
       * 用于输入用户产生交易时的地理位置信息。如参数无法提供，请填写“null”
       */
      lbs: string;

      /**
       * 用户购买或使用服务时产生的具体金额。如参数无法提供，请填写“null”
       */
      sales_amount: string;
    };

    /**
     * 调用成功的回调函数
     */
    success?(res: INsfSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: INsfFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: INsfSuccessResult | INsfFailResult): void;
  }

  namespace ap {
    /**
     * 有关先享后付保障的产品和接入介绍，详见[先享后付保障](https://docs.alipay.com/mini/introduce/non-sufficient-funds)
     */
    function nsf(options: INsfOptions): void;
  }
}
