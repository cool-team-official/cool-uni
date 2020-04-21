/**
 * @file 扫码
 */
declare namespace my {
  interface IScanSuccessResult {
    /**
     * 扫码所得数据
     */
    readonly code: string;

    /**
     * 扫描二维码时返回二维码数据
     */
    readonly qrCode: string;

    /**
     * 扫描条形码时返回条形码数据
     */
    readonly barCode: string;
  }

  interface IScanFailResult {
    /**
     * 1. 10，用户取消；
     * 2. 11，操作失败。
     */
    readonly error: 10 | 11;
  }

  interface IScanOptions {
    /**
     * 扫码样式(默认 qr)：
     * 1. qr，扫码框样式为二维码扫码框；
     * 2. bar，扫码样式为条形码扫码框。
     */
    type?: 'qr' | 'bar';

    /**
     * 是否隐藏相册（不允许从相册选择图片），只能从相机扫码
     */
    hideAlbum?: boolean;

    /**
     * 调用成功的回调函数
     */
    success?(res: IScanSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IScanFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IScanSuccessResult | IScanFailResult): void;
  }

  /**
   * 调用扫一扫功能。
   */
  function scan(options: IScanOptions): void;
}
