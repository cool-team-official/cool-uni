/**
 * @file 用户截屏事件
 */
declare namespace my {
  /**
   * 用于监听用户发起的主动截屏事件，可以接收到系统以及第三方截屏工具的截屏事件通知。
   */
  function onUserCaptureScreen(cb: () => void): void;

  /**
   * 取消监听截屏事件。一般需要与 my.onUserCaptureScreen 成对出现。
   */
  function offUserCaptureScreen(): void;
}
