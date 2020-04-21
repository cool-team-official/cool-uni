/**
 * @file 摇一摇
 */
declare namespace my {
  interface IWatchShakeOptions {
    success(): void;
  }
  /**
   * 摇一摇功能。每次调用API，在摇一摇手机后触发回调，如需再次监听需要再次调用这个API。
   */
  function watchShake(options: IWatchShakeOptions): void;
}
