/**
 * @file 数据安全
 */
declare namespace my {
  interface IRSASuccessResult {
    /**
     * 经过处理过后得到的文本，加密为Base64编码文本，解密为原始文本
     */
    readonly text: string;
  }

  interface IRSAFailResult {
    /**
     * - 10：参数错误
     * - 11：key错误
     */
    readonly error: 10 | 11;
  }

  interface IRSAOptions {
    /**
     * 使用rsa加密还是rsa解密，encrypt加密，decrypt解密
     */
    action: 'encrypt' | 'decrypt';

    /**
     * 要处理的文本，加密为原始文本，解密为Base64编码格式文本
     */
    text: string;

    /**
     * rsa秘钥，加密使用公钥，解密使用私钥
     */
    key: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: IRSASuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IRSAFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IRSASuccessResult | IRSAFailResult): void;
  }

  /**
   * 非对称加密。
   *
   * 注：加密与解密过程分别放置在客户端与服务端，且私钥放在服务端，私钥放在客户端易泄露将导致安全问题。
   */
  function rsa(options: IRSAOptions): void;
}
