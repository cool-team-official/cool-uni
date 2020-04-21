/**
 * @file 文件
 */
declare namespace my {
  interface ISaveFileSuccessResult {
    /**
     * 文件的保存路径
     */
    readonly savedFilePath: string;
  }

  interface ISaveFileOptions {
    /**
     * 需要保存的文件的临时路径
     */
    tempFilePath: string;

    /**
     * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
     */
    success?: (res?: ISaveFileSuccessResult) => void;

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
   * 保存文件到本地。（本地文件大小总容量限制：10M）
   */
  function saveFile(options: ISaveFileOptions): void;

  interface IFileListItem {
    /**
     * 文件的本地路径
     */
    filePath: string;

    /**
     * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
     */
    createTime: number;

    /**
     * 文件大小，单位B
     */
    size: number;
  }

  interface IGetSavedFileListSuccessResult {
    /**
     * 接口调用结果
     */
    readonly errMsg: string;

    /**
     * 文件列表
     */
    fileList: ReadonlyArray<Readonly<IFileListItem>>;
  }

  interface IGetSavedFileListOptions {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: IGetSavedFileListSuccessResult) => void;

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
   * 获取本地已保存的文件列表
   */
  function getSavedFileList(options: IGetSavedFileListOptions): void;

  interface IGetSavedFileInfoSuccessResult {
    /**
     * 接口调用结果
     */
    readonly errMsg: string;

    /**
     * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
     */
    readonly createTime: number;

    /**
     * 文件大小，单位B
     */
    readonly size: number;
  }

  interface IGetSavedFileInfoOptions {
    /**
     * 文件路径
     */
    filePath: string;

    /**
     * 接口调用成功的回调函数
     */
    success?: (res?: IGetSavedFileInfoSuccessResult) => void;

    fail?(): void;

    complete?(): void;
  }

  /**
   * 获取本地文件的文件信息
   */
  function getSavedFileInfo(options: IGetSavedFileInfoOptions): void;

  interface IRemoveSavedFileOptions {
    /**
     * 需要删除的文件路径
     */
    filePath: string;

    success?(): void;

    fail?(): void;

    complete?(): void;
  }

  /**
   * 删除本地存储的文件
   */
  function removeSavedFile(options: IRemoveSavedFileOptions): void;

  interface IGetFileInfoSuccessResult {
    readonly size: number;
    readonly digest: string;
  }

  interface IGetFileInfoOptions {
    apFilePath: string;
    digestAlgorithm?: 'md5' | 'md5';
    success?(res: IGetFileInfoSuccessResult): void;
    fail?(): void;
    complete?(): void;
  }

  function getFileInfo(options: IGetFileInfoOptions): void;
}
