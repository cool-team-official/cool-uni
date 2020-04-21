/**
 * @file iBeacon
 */
declare namespace my {
  interface IStartBeaconDiscoveryOptions {
    /**
     * 目标 iBeacon 设备广播的 uuids
     */
    uuids: string[];

    /**
     * 调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: any): void;
  }

  /**
   * 开始搜索附近的 iBeacon 设备
   *
   * Bug & Tip
   *  - tip: uuid1、uuid2 为目标 iBeacon 的UUID，可从硬件厂商获取，如果为空，无法搜索到 iBeacon
   *  - tip: iBeacon 需要位置权限，iOS 11 之前需要蓝牙开关打开，iOS 11 以后，需要 设置->蓝牙->开关开启(控制中心的蓝牙开关不影响 iBeacon 使用)
   *  - tip: 推荐在 my.onBeaconUpdate 回调中处理发现到的iBeacon设备信息
   */
  function startBeaconDiscovery(options: IStartBeaconDiscoveryOptions): void;

  interface IStopBeaconDiscoveryOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用失败的回调函数
     */
    complete?(res: any): void;
  }

  /**
   * 停止搜索附近的 iBeacon 设备
   */
  function stopBeaconDiscovery(options: IStopBeaconDiscoveryOptions): void;

  interface IIBeacon {
    /**
     * iBeacon 设备广播的 uuid
     */
    uuid: string;

    /**
     * iBeacon 设备的主 id
     */
    major: string;

    /**
     * iBeacon 设备的次 id
     */
    minor: string;

    /**
     * 表示设备距离的枚举值(0-3分别代表：未知、极近、近、远)
     */
    proximity: number;

    /**
     * iBeacon 设备的距离
     */
    accuracy: number;

    /**
     * iBeacon 信号强度
     */
    rssi: number;
  }

  interface IGetBeaconsSuccessResult {
    /**
     * iBeacon 设备列表
     */
    readonly beacons: ReadonlyArray<Readonly<IIBeacon>>;

    /**
     * errorCode=0 ,接口调用成功
     */
    readonly errCode: string;

    /**
     * ok
     */
    readonly errorMsg: string;
  }

  interface IGetBeaconsOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: IGetBeaconsSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: any): void;
  }

  /**
   * 获取已经搜索到的 iBeacon 设备
   *
   * Bug & Tip
   *  - bug: Android 支付宝客户端 10.1.28 及以前的版本该接口返回的 rssi 值不能动态更新，推荐使用事件触发方式
   */
  function getBeacons(options: IGetBeaconsOptions): void;

  interface IOnBeaconUpdateSuccessResult {
    /**
     * 当前搜寻到的所有 iBeacon 设备列表
     */
    readonly beacons: ReadonlyArray<Readonly<IIBeacon>>;
  }

  interface IOnBeaconUpdateOptions {
    success: (res: IOnBeaconUpdateSuccessResult) => void;
  }
  /**
   * 监听 iBeacon 设备的更新事件
   */
  function onBeaconUpdate(options: IOnBeaconUpdateOptions): void;

  interface IOnBeaconServiceChangeSuccessResult {
    /**
     * 服务目前是否可用
     */
    readonly available: boolean;

    /**
     * 目前是否处于搜索状态
     */
    readonly discovering: boolean;
  }

  interface IOnBeaconServiceChangeOptions {
    success?(res: IOnBeaconServiceChangeSuccessResult): void;
  }
  /**
   * 监听 iBeacon 服务的状态变化
   *
   * Bug & Tip
   *  - tip: iOS 11及以后版本 “控制中心蓝牙开关” 和 “设置->蓝牙->开关” 分离，控制中心蓝牙开关不再影响 iBeacon 使用，但是 my.onBeaconServiceChange 事件仍然会回调，建议iOS 11以后该事件回调以后继续等待 my.onBeaconUpdate 以确认是否提示用户开启蓝牙。
   */
  function onBeaconServiceChange(options: IOnBeaconServiceChangeOptions): void;
}
