/**
 * 文本风险识别
 */
declare namespace my {
  type TextRiskIdentificationType = 'keyword' | '0' | '1' | '2' | '3';

  interface ITextRiskIdentificationSuccessResult {
    /**
     * 目标内容文本识别到的类型，keyword 表示关键词、0 表示广告、1表示涉政、2表示涉黄、3表示低俗辱骂
     */
    readonly type: TextRiskIdentificationType;

    /**
     * 仅当识别命中了 type 为 keyword 时，才会返回该字段
     */
    readonly hitKeywords?: ReadonlyArray<string>;

    /**
     * 识别命中得分，最高分100分。仅当识别没有命中 keyword ，但入参中包含了广告或涉政或涉黄时，才会返回该字段
     */
    readonly score?: string;
  }

  interface ITextRiskIdentificationFailResult {
    /**
     * 识别错误码
     */
    readonly error: string;

    /**
     * 识别错误消息
     */
    readonly errorMessage: string;
  }

  interface ITextRiskIdentificationOptions {
    /**
     * 需要进行风险识别的文本内容
     */
    content: string;

    /**
     * 识别类型：keyword 表示关键词、0 表示广告、1表示涉政、2表示涉黄、3表示低俗辱骂
     */
    type: TextRiskIdentificationType[];

    /**
     * 调用成功的回调函数
     */
    success?(res: ITextRiskIdentificationSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: ITextRiskIdentificationFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: ITextRiskIdentificationSuccessResult | ITextRiskIdentificationFailResult): void;
  }

  /**
   * 文本风险识别， 支付宝客户端10.1.10及以上版本支持。详细接入参考[指引](https://docs.alipay.com/mini/introduce/text-identification)。
   */
  function textRiskIdentification(options: ITextRiskIdentificationOptions): void;
}
