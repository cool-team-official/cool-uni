/**
 * @file 缓存
 * @description
 *  - 缓存数据本地加密存储，通过API读取时会自动解密返回。
 *  - 覆盖安装支付宝(不是先删除再安装)，不会导致小程序缓存失效；
 *  - 支付宝设置中心清除缓存不会导致小程序缓存失效；
 *  - 小程序缓存默认具有支付宝账号和小程序id两级隔离；
 *  - iOS支持iTunes备份。
 */

declare namespace my {
  interface ISetStorageOptions {
    /**
     * 缓存数据的key
     */
    key: string;

    /**
     * 要缓存的数据
     */
    data: string | Record<string, any>;

    /**
     * 调用成功的回调函数
     */
    success?(): void;

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
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的数据。
   *
   * > 支持内嵌webview的存储与小程序存储隔离，内嵌webview中指定key存储数据不会覆盖小程序自身相同key对应的数据
   *
   * > 注意：单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB
   */
  function setStorage(options: ISetStorageOptions): void;

  interface ISetStorageSyncOptions {
    /**
     * 缓存数据的key
     */
    key: string;

    /**
     * 要缓存的数据
     */
    data: string | Record<string, any>;
  }

  /**
   * 同步将数据存储在本地缓存中指定的 key 中。
   */
  function setStorageSync(options: ISetStorageSyncOptions): void;

  interface IGetStorageSuccessResult {
    /**
     * key对应的内容
     */
    readonly data: string | Readonly<Record<string, any>>;
  }

  interface IGetStorageOptions {
    /**
     * 缓存数据的key
     */
    key: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: IGetStorageSuccessResult): void;

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
   * 获取缓存数据。
   *
   * > 支持内嵌webview内缓与小程序缓存隔离，获取内嵌webview指定key的缓存不会同时返回小程序相同key下的缓存数据
   */
  function getStorage(option: IGetStorageOptions): void;

  interface IGetStorageSyncOptions {
    /**
     * 缓存数据的key
     */
    key: string;
  }

  /**
   * 同步获取缓存数据。
   */
  function getStorageSync(options: IGetStorageSyncOptions): IGetStorageSuccessResult;

  interface IRemoveStorageOptions {
    /**
     * 缓存数据的key
     */
    key: string;

    /**
     * 调用成功的回调函数
     */
    success?(): void;

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
   * 删除缓存数据。
   *
   * > 移除内嵌webview的存储数据时不会移除当前小程序的存储数据
   */
  function removeStorage(options: IRemoveStorageOptions): void;

  interface IRemoveStorageSyncOptions {
    /**
     * 缓存数据的key
     */
    key: string;
  }

  /**
   * 同步删除缓存数据。
   */
  function removeStorageSync(options: IRemoveStorageSyncOptions): void;

  /**
   * 清除本地数据缓存。
   *
   * > 清空内嵌内嵌webview的存储时不会同时清空当前小程序本身的存储数据
   */
  function clearStorage(): void;

  /**
   * 同步清除本地数据缓存。
   */
  function clearStorageSync(): void;

  interface IStorageInfo {
    /**
     * 当前storage中所有的key
     */
    readonly keys: ReadonlyArray<string>;

    /**
     * 当前占用的空间大小, 单位KB
     */
    readonly currentSize: string;

    /**
     * 限制的空间大小，单位KB
     */
    readonly limitSize: string;
  }

  interface IGetStorageInfoOptions {
    /**
     * 调用成功的回调函数
     */
    success?(res: IStorageInfo): void;

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
   * 异步获取当前storage的相关信息。
   *
   * > 在内嵌webview内获取当前storage的相关信息不会获取到当前小程序storage的相关信息
   */
  function getStorageInfo(options: IGetStorageInfoOptions): void;

  /**
   * 同步获取当前storage的相关信息。
   */
  function getStorageInfoSync(): IStorageInfo;
}
