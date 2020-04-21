/**
 * @file 网络状态
 */
declare namespace my {
  type INetworkType = 'UNKNOWN' | 'NOTREACHABLE' | 'WIFI' | '3G' | '2G' | '4G' | 'WWAN';

  interface IGetNetworkTypeSuccessResult {
    /**
     * 网络是否可用
     */
    readonly networkAvailable: boolean;

    /**
     * 网络类型值 UNKNOWN / NOTREACHABLE / WIFI / 3G / 2G / 4G / WWAN
     */
    readonly networkType: INetworkType;
  }

  interface IGetNetworkTypeOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: IGetNetworkTypeSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 获取当前网络状态。
   */
  function getNetworkType(options: IGetNetworkTypeOptions): void;

  interface IOnNetworkStatusChangeEvent {
    /**
     * 网络是否可用
     */
    readonly isConnected: boolean;

    /**
     * 网络类型值 UNKNOWN / NOTREACHABLE / WIFI / 3G / 2G / 4G / WWAN
     */
    readonly networkType: INetworkType;
  }

  /**
   * 开始网络状态变化的监听
   */
  function onNetworkStatusChange(callback: (res: IOnNetworkStatusChangeEvent) => void): void;

  /**
   * 取消网络状态变化的监听
   */
  function offNetworkStatusChange(callback?: (res: IOnNetworkStatusChangeEvent) => void): void;
}
