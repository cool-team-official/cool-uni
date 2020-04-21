/**
 * @file 拨打电话
 */
declare namespace my {
  interface IMakePhoneCallOptions {
    /**
     * 电话号码
     */
    number: string;
  }

  /**
   * 拨打电话。
   */
  function makePhoneCall(options: IMakePhoneCallOptions): void;
}
