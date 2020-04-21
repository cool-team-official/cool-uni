/**
 * @file 图片内容安全
 */

declare namespace my {
  interface IImgRiskOptions {
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
       * 风险类型，固定传img_risk
       */
      risk_type: 'img_risk';

      /**
       * 需要验证的图片URL
       */
      content: string;
    };

    /**
     * 调用成功的回调函数
     */
    success?(res: IImgRiskSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IImgRiskFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IImgRiskSuccessResult | IImgRiskFailResult): void;
  }

  interface IImgRiskFailResult {
    /**
     * 识别错误码
     */
    errorCode: string;

    /**
     * 识别错误信息
     */
    errorMessage: string;
  }

  interface IImgRiskSuccessResult {
    /**
     * 图片风险识别的任务的任务ID。
     *
     * @example \"apply_id\":\"dfaef54c-70ae-4011-91cc-5806d7bb0990\"
     */
    risk_result: string;

    /**
     * 风险识别结果描述。返回结果会默认为空，忽略即可
     */
    risk_result_desc: string;

    /**
     * 业务唯一识别码
     *
     * @example 0b92uueie87636222
     */
    uniqueId: string;
  }

  interface IImgRiskCallbackSuccessResult {
    /**
     * 图片风险识别的任务的任务ID
     *
     * @example
     *  \"action\":\"REJECTED\"
     *  \"action\":\"PASSED\"
     */
    readonly risk_result: string;

    /**
     * 风险识别结果描述
     *
     * @example
     *   \"REJECTED\":\"拦截\"
     *   \"PASSED\":\"放过\
     */
    readonly risk_result_desc: string;

    /**
     * 业务唯一识别码
     *
     * @example 0b92uueie87636222
     */
    readonly uniqueId: string;
  }

  interface IImgRiskCallbackFailResult {
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

  interface IImgRiskCallbackOptions {
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
       * 风险类型
       */
      risk_type: 'img_risk_result';

      /**
       * 需要查询图片的任务id
       */
      apply_id: string;
    };

    /**
     * 调用成功的回调函数
     */
    success?(res: IImgRiskCallbackSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  namespace ap {
    /**
     * 图片风险咨询任务提交接口，用于提交
     */
    function imgRisk(options: IImgRiskOptions): void;

    function imgRiskCallback(options: IImgRiskCallbackOptions): void;
  }
}
