/**
 * @file 营销反作弊
 */
declare namespace my {
  interface IPreventCheatBizContext {
    /**
     * 合作伙伴匹配服务类型
     */
    service: 'marketing';

    /**
     * 风险策略类型
     */
    risk_type: 'riskinfo_anticheat_common';

    /**
     * 用于输入用户注册的手机号码。
     */
    mobile_no: string;

    /**
     * 申请业务合作伙伴ID
     */
    pid: string;

    /**
     * 支付宝用户ID
     */
    user_id?: string;

    /**
     * 银行卡号
     */
    bank_card_no?: string;

    /**
     * 用于输入用户的身份证号码
     */
    cert_no?: string;

    /**
     * 账户登录IP
     */
    client_ip?: string;

    /**
     * 邮箱账号
     */
    email_address?: string;

    /**
     * 手机序列号
     */
    imei?: string;

    /**
     * 国际移动用户识别码
     */
    imsi?: string;

    /**
     * mac地址或设备唯一标识
     */
    mac_address?: string;

    /**
     * 拓展字段，其余信息通过此字段进行传输：
     *
     * 业务约定：
     *  - nickname:账户昵称；
     *  - reg_time:账户注册时间
     */
    extended_info?: string;
  }

  interface IPreventCheatSuccessResult {
    /**
     * 风险识别结果：
     *
     * riskinfo_anticheat_common—风险评级结果：
     *  - rank0 信息不足/参数有误
     *  - rank1 表示用户作弊风险为低
     *  - rank2 表示用户作弊风险为中
     *  - rank3 表示用户作弊风险为高
     *
     * riskinfo_anticheat_common_infocode—风险评级说明：
     *  - 171-作弊风险
     *
     * @example {\"riskinfo_anticheat_common\":\"rank3\",\"riskinfo_anticheat_common_infocode\":\"171\"}
     */
    readonly riskResult: string;

    /**
     * 风险信息描述
     *
     * @example {\"rank0\":\"等级0\"}
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

  interface IPreventCheatFailResult {
    /**
     * 识别错误码
     */
    readonly error: string;

    /**
     * - serviceNoAuth：服务未授权。请检查配置的账户是否有当前接口权限以及service参数是否正确
     * - riskTypeNoAuth：场景（risktype）未授权。请检查risktype参数是否正确
     * - bizContentEmpty：风险数据内容为空。检查入参格式
     * - paramMissingError：参数缺失。检查必传参数是否传入
     * - param error：参数错误。检查入参格式是否符合文档要求
     * - SYSTEM_OUT_ERROR：系统繁忙。请稍后再试
     * - INVALID_PARAMETER：缺少必选参数或参数有误。检查参数是否正确或者缺失
     * - OVER_LIMIT：超过调用量限制。如需增加额度，请发邮件至RiskGoCSC@service.alipay.com进行申请
     */
    readonly errorMessage: 'serviceNoAuth' | 'riskTypeNoAuth' | 'bizContentEmpty'
      | 'paramMissingError' | 'param error' | 'SYSTEM_OUT_ERROR'
      | 'INVALID_PARAMETER' | 'OVER_LIMIT';
  }

  interface IPreventCheatOptions {
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
    biz_context: IPreventCheatBizContext;

    /**
     * 调用成功的回调函数
     */
    success?(res: IPreventCheatSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IPreventCheatFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IPreventCheatFailResult | IPreventCheatSuccessResult): void;
  }

  namespace ap {
    function preventCheat(options: IPreventCheatOptions): void;
  }
}
