/**
 * @file 蓝牙
 */
declare namespace my {
  interface IOpenBluetoothAdapterSuccessResult {
    /**
     * 是否支持 BLE
     */
    readonly isSupportBLE: boolean;
  }

  interface IOpenBluetoothAdapterFailResult {
    /**
     * - 12：蓝牙未打开
     * - 13：与系统服务的链接暂时丢失
     * - 14：未授权支付宝使用蓝牙功能
     * - 15：未知错误
     */
    readonly error: 12 | 13 | 14 | 15;
  }

  interface IOpenBluetoothAdapterOptions {
    /**
     * 不传的话默认是true，表示是否在离开当前页面时自动断开蓝牙(仅对android有效)
     */
    autoClose?: boolean;

    /**
     * 调用成功的回调函数
     */
    success?(res: IOpenBluetoothAdapterSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IOpenBluetoothAdapterFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IOpenBluetoothAdapterSuccessResult | IOpenBluetoothAdapterFailResult): void;
  }

  /**
   * 初始化小程序蓝牙模块，生效周期为调用 [my.openBluetoothAdapter](#my.openBluetoothAdapter) 至调用 [my.closeBluetoothAdapter](#my.closeBluetoothAdapter) 或小程序被销毁为止。
   * 在小程序蓝牙适配器模块生效期间，开发者可以正常调用下面的小程序API，并会收到蓝牙模块相关的 on 事件回调。
   */
  function openBluetoothAdapter(options?: IOpenBluetoothAdapterOptions): void;

  interface ICloseBluetoothAdapterOptions {
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
   * 关闭本机蓝牙模块。
   *
   * Bug & Tip
   * 1. tip: 调用该方法将断开所有已建立的蓝牙连接并释放系统资源。
   * 2. tip: 建议在结束小程序蓝牙流程时调用，与 my.openBluetoothAdapter 成对调用。
   * 3. tip: 调用 my.closeBluetoothAdapter 释放资源为异步操作，不建议使用 my.closeBluetoothAdapter 和 my.openBluetoothAdapter 作为异常处理流程（相当于先关闭再开启，重新初始化，效率低，易发生线程同步问题）
   */
  function closeBluetoothAdapter(options?: ICloseBluetoothAdapterOptions): void;

  interface IGetBluetoothAdapterStateSuccessResult {
    /**
     * 是否正在搜索设备
     */
    readonly discovering: boolean;

    /**
     * 蓝牙模块是否可用(需支持 BLE 并且蓝牙是打开状态)
     */
    readonly available: boolean;
  }

  interface IGetBluetoothAdapterStateOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: IGetBluetoothAdapterStateSuccessResult): void;

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
   * 获取本机蓝牙模块状态。
   */
  function getBluetoothAdapterState(options: IGetBluetoothAdapterStateOptions): void;

  interface IStartBluetoothDevicesDiscoveryOptions {
    /**
     * 蓝牙设备主 service 的 uuid 列表
     */
    services?: string[];

    /**
     * 是否允许重复上报同一设备， 如果允许重复上报，则 onBluetoothDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
     */
    allowDuplicatesKey?: boolean;

    /**
     * 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
     */
    interval?: number;

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
   * 开始搜寻附近的蓝牙外围设备。搜索结果将在 [my.onBluetoothDeviceFound](#my.onBluetoothDeviceFound) 事件中返回。
   *
   * Bug & Tip
   * - tip: 该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
   */
  function startBluetoothDevicesDiscovery(options?: IStartBluetoothDevicesDiscoveryOptions): void;

  interface IStopBluetoothDevicesDiscoveryOptions {
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
   * 停止搜寻附近的蓝牙外围设备。
   */
  function stopBluetoothDevicesDiscovery(options?: IStopBluetoothDevicesDiscoveryOptions): void;

  interface IBluetoothDevice {
    /**
     * 蓝牙设备名称，某些设备可能没有
     */
    name: string;

    /**
     * 值与 name 一致
     *
     * @deprecated
     */
    deviceName: string;

    /**
     * 广播设备名称
     */
    localName: string;

    /**
     * 设备 Id
     */
    deviceId: string;

    /**
     * 设备信号强度
     */
    RSSI: number;

    /**
     * 设备的广播内容
     */
    advertisData: string;

    /**
     * 设备的manufacturerData
     */
    manufacturerData: string;
  }

  interface IGetBluetoothDevicesSuccessResult {
    /**
     * 已发现的设备列表
     */
    readonly devices: ReadonlyArray<Readonly<IBluetoothDevice>>;
  }

  interface IGetBluetoothDevicesOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: IGetBluetoothDevicesSuccessResult): void;

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
   * 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。
   *
   * Bug & Tip
   * - tip: 模拟器可能无法获取 advertisData 及 RSSI，请使用真机调试
   * - tip: 开发者工具和 Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid; 因此 deviceId 不能硬编码到代码中，需要分平台处理，iOS可根据设备属性（localName/advertisData/manufacturerData 等属性）进行动态匹配。
   */
  function getBluetoothDevices(options: IGetBluetoothDevicesOptions): void;

  interface IGetConnectedBluetoothDevicesSuccessResult {
    /**
     * 已连接的设备列表
     */
    readonly devices: ReadonlyArray<Readonly<IBluetoothDevice>>;
  }

  interface IGetConnectedBluetoothDevicesOptions {
    /**
     * 蓝牙设备主 service 的 uuid 列表
     */
    services?: string[];

    /**
     * 调用成功的回调函数
     */
    success?(res: IGetConnectedBluetoothDevicesSuccessResult): void;

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
   * 获取处于已连接状态的设备。
   *
   * Bug & Tip
   * - tip: 如果传递的 services 为空，则返回所有的已经连接的设备。
   * - tip: Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中，需要区分处理。
   */
  function getConnectedBluetoothDevices(options: IGetConnectedBluetoothDevicesOptions): void;

  interface IConnectBLEDeviceOptions {
    /**
     * 蓝牙设备id
     */
    deviceId: string;

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
   * 连接低功耗蓝牙设备。
   *
   * Bug & Tip
   * - tip: 若小程序在之前已有搜索过某个蓝牙设备，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。
   * - tip: 若指定的蓝牙设备已经连接，重复连接直接返回成功。
   */
  function connectBLEDevice(options: IConnectBLEDeviceOptions): void;

  interface IDisconnectBLEDeviceOptions {
    /**
     * 蓝牙设备id
     */
    deviceId: string;

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
   * 断开与低功耗蓝牙设备的连接。
   *
   * Bug & Tip
   * - tip: 蓝牙连接随时可能断开，建议监听 [my.onBLEConnectionStateChanged](#my.onBLEConnectionStateChanged) 回调事件，当蓝牙设备断开时按需执行重连操作
   * - tip: 若对未连接的设备或已断开连接的设备调用数据读写操作的接口，会返回10006错误，详见错误码，建议进行重连操作
   */
  function disconnectBLEDevice(options: IDisconnectBLEDeviceOptions): void;

  interface IWriteBLECharacteristicValueOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;

    /**
     * 蓝牙特征值对应 service 的 uuid
     */
    serviceId: string;

    /**
     * 蓝牙特征值的 uuid
     */
    characteristicId: string;

    /**
     * 蓝牙设备特征值对应的值，16进制字符串，限制在20字节内
     */
    value: string;

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
   * 向低功耗蓝牙设备特征值中写入数据。
   *
   * Bug & Tip
   * - tip: 设备的特征值必须支持 write 才可以成功调用，具体参照 characteristic 的 properties 属性。
   * - tip: 写入的二进制数据需要进行 hex 编码。
   */
  function writeBLECharacteristicValue(options: IWriteBLECharacteristicValueOptions): void;

  interface IReadBLECharacteristicValueSuccessResult {
    /**
     * 设备特征值信息
     */
    readonly characteristic: {
      /**
       * 蓝牙设备特征值的 uuid
       */
      readonly characteristicId: string;

      /**
       * 蓝牙设备特征值对应服务的 uuid
       */
      readonly serviceId: string;

      /**
       * 蓝牙设备特征值的value
       */
      readonly value: string;
    };
  }
  interface IReadBLECharacteristicValueOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;

    /**
     * 蓝牙特征值对应 service 的 uuid
     */
    serviceId: string;

    /**
     * 蓝牙特征值的 uuid
     */
    characteristicId: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: IReadBLECharacteristicValueSuccessResult): void;

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
   * 读取低功耗蓝牙设备特征值中的数据。调用后在 [my.onBLECharacteristicValueChange()](#my.onBLECharacteristicValueChange) 事件中接收数据返回。
   *
   * Bug & Tip
   * - tip: 设备的特征值必须支持read才可以成功调用，具体参照 characteristic 的 properties 属性
   * - tip: 并行多次调用读写接口存在读写失败的可能性。
   * - tip: 如果读取超时，错误码 10015，[my.onBLECharacteristicValueChange](#my.onBLECharacteristicValueChange) 接口之后可能返回数据，需要接入方酌情处理。
   */
  function readBLECharacteristicValue(options: IReadBLECharacteristicValueOptions): void;

  interface INotifyBLECharacteristicValueChangeOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;

    /**
     * 蓝牙特征值对应 service 的 uuid
     */
    serviceId: string;

    /**
     * 蓝牙特征值的 uuid
     */
    characteristicId: string;

    /**
     * notify 的 descriptor 的 uuid （只有android 会用到，非必填，默认值00002902-0000-10008000-00805f9b34fb）
     */
    descriptorId?: string;

    /**
     * 是否启用notify或indicate
     */
    state?: boolean;

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
   * 启用低功耗蓝牙设备特征值变化时的 notify 功能。注意：设备的特征值必须支持 notify/indicate 才可以成功调用，具体参照 characteristic 的 properties 属性 另外，必须先启用 notify 才能监听到设备 characteristicValueChange 事件。
   *
   * Bug & Tip
   * - tip: 订阅操作成功后需要设备主动更新特征值的 value，才会触发 my.onBLECharacteristicValueChange 。
   * - tip: 订阅方式效率比较高，推荐使用订阅代替 read 方式。
   */
  function notifyBLECharacteristicValueChange(options: INotifyBLECharacteristicValueChangeOptions): void;

  interface IGetBLEDeviceServicesSuccessResult {
    /**
     * 设备service 对象列表，详见下表特征值信息
     */
    readonly services: ReadonlyArray<{
      /**
       * 蓝牙设备服务的 uuid
       */
      readonly serviceId: string;

      /**
       * 该服务是否为主服务
       */
      readonly isPrimary: boolean;
    }>;
  }

  interface IGetBLEDeviceServicesOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: IGetBLEDeviceServicesSuccessResult): void;

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
   * 获取蓝牙设备所有 service（服务）
   *
   * Bug & Tip
   * - tip: 建立连接后先执行 my.getBLEDeviceServices 与 my.getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互。
   */
  function getBLEDeviceServices(options: IGetBLEDeviceServicesOptions): void;

  interface IGetBLEDeviceCharacteristicsSuccessResult {
    /**
     * 设备特征值列
     */
    readonly characteristics: ReadonlyArray<{
      /**
       * 蓝牙设备特征值的 uuid
       */
      readonly characteristicId: string;

      /**
       * 蓝牙设备特征值对应服务的 uuid
       */
      readonly serviceId: string;

      /**
       * 蓝牙设备特征值对应的16进制值
       */
      readonly value: string;

      /**
       * 该特征值支持的操作类型
       */
      readonly properties: {
        /**
         * 该特征值是否支持 read 操作
         */
        readonly read: boolean;

        /**
         * 该特征值是否支持 write 操作
         */
        readonly write: boolean;

        /**
         * 该特征值是否支持 notify 操作
         */
        readonly notify: boolean;

        /**
         * 该特征值是否支持 indicate 操作
         */
        readonly indicate: boolean;
      };
    }>;
  }

  interface IGetBLEDeviceCharacteristicsOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;

    /**
     * 蓝牙特征值对应 service 的 uuid
     */
    serviceId: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: IGetBLEDeviceCharacteristicsSuccessResult): void;

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
   * 获取蓝牙设备所有 characteristic（特征值）
   *
   * Bug & Tip
   * - tip: 建立连接后先执行 my.getBLEDeviceServices 与 my.getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互。
   */
  function getBLEDeviceCharacteristics(options: IGetBLEDeviceCharacteristicsOptions): void;

  interface IOnBluetoothDeviceFoundEvent {
    /**
     * 新搜索到的设备列表
     */
    readonly devices: ReadonlyArray<Readonly<IBluetoothDevice>>;
  }

  /**
   * 搜索到新的蓝牙设备时触发此事件。
   *
   * Bug & Tip
   * - tip: 模拟器可能无法获取 advertisData 及 RSSI ，请使用真机调试。
   * - tip: 开发者工具和 Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中，需要分平台处理，iOS可根据设备属性（localName/advertisData/manufacturerData等）进行动态匹配。
   * - tip: 若在 my.onBluetoothDeviceFound 回调中包含了某个蓝牙设备，则此设备会添加到 my.getBluetoothDevices 接口获取到的数组中。
   */
  function onBluetoothDeviceFound(callback: (res: IOnBluetoothDeviceFoundEvent) => void): void;

  /**
   * 移除寻找到新的蓝牙设备事件的监听。
   *
   * Bug & Tip
   * - tip: 为防止多次注册事件监听导致一次事件多次回调，建议每次调用on方法监听事件之前，先调用off方法，关闭之前的事件监听。
   */
  function offBluetoothDeviceFound(): void;

  interface IOnBLECharacteristicValueChangeEvent {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    readonly deviceId: string;

    /**
     * 蓝牙特征值对应 service 的 uuid
     */
    readonly serviceId: string;

    /**
     * 蓝牙特征值的 uuid
     */
    readonly characteristicId: string;

    /**
     * 特征值最新的16进制值
     */
    readonly value: string;
  }

  /**
   * 监听低功耗蓝牙设备的特征值变化的事件。
   */
  function onBLECharacteristicValueChange(callback: (res: IOnBLECharacteristicValueChangeEvent) => void): void;

  /**
   * 移除低功耗蓝牙设备的特征值变化事件的监听。
   */
  function offBLECharacteristicValueChange(): void;

  interface IOnBLEConnectionStateChangedEvent {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    readonly deviceId: string;

    /**
     * 连接目前的状态
     */
    readonly connected: string;
  }

  /**
   * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等。
   *
   * Bug & Tip
   * - tip: 为防止多次注册事件监听导致一次事件多次回调，建议每次调用on方法监听事件之前，先调用off方法，关闭之前的事件监听。
   */
  function onBLEConnectionStateChanged(callback: (res: IOnBLEConnectionStateChangedEvent) => void): void;

  /**
   * 移除低功耗蓝牙连接状态变化事件的监听。
   *
   * Bug & Tip
   * - tip: 为防止多次注册事件监听导致一次事件多次回调，建议每次调用on方法监听事件之前，先调用off方法，关闭之前的事件监听。
   */
  function offBLEConnectionStateChanged(): void;

  interface IOnBluetoothAdapterStateChangeEvent {
    /**
     * 蓝牙模块是否可用
     */
    readonly available: boolean;

    /**
     * 蓝牙模块是否处于搜索状态
     */
    readonly discovering: boolean;
  }

  /**
   * 监听本机蓝牙状态变化的事件。
   */
  function onBluetoothAdapterStateChange(callback: (res: IOnBluetoothAdapterStateChangeEvent) => void): void;

  /**
   * 移除本机蓝牙状态变化的事件的监听。
   *
   * Bug & Tip
   * - tip: 为防止多次注册事件监听导致一次事件多次回调，建议每次调用on方法监听事件之前，先调用off方法，关闭之前的事件监听。
   */
  function offBluetoothAdapterStateChange(): void;
}
