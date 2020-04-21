/**
 * @file 多媒体
 */
declare namespace my {
  interface IChooseImageSuccessResult {
    /**
     * 本地文件路径列表
     */
    readonly apFilePaths?: ReadonlyArray<string>;
  }

  interface IChooseImageOptions {
    /**
     * 最多可以选择的图片张数，默认9
     */
    count?: number;

    /**
     * original 原图，compressed 压缩图，默认二者都有
     */
    sizeType?: string[];

    /**
     * album 从相册选图，camera 使用相机，默认二者都有
     */
    sourceType?: string[];

    /**
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    success?: (res?: IChooseImageSuccessResult) => void;

    /**
     * 调用失败的回调函数
     *
     * - 11：用户取消操作
     */
    fail?(error: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: any): void;
  }

  /**
   * 从本地相册选择图片或使用相机拍照。
   */
  function chooseImage(options: IChooseImageOptions): void;

  interface IPreviewImageOptions {
    /**
     * 当前显示图片索引，默认 0
     */
    current?: number;

    /**
     * 需要预览的图片链接列表
     */
    urls: string[];

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
   * 预览图片。
   */
  function previewImage(options: IPreviewImageOptions): void;

  interface IGetImageInfoSuccessResult {
    /**
     * 图片宽度，单位px
     */
    readonly width: number;

    /**
     * 图片高度 单位px
     */
    readonly height: number;

    /**
     * 图片本地路径
     */
    readonly path: string;

    /**
     * 返回图片的方向
     *
     * - up：默认
     * - down：180度旋转
     * - left：逆时针旋转90度
     * - right：顺时针旋转90度
     * - up-mirrored：同up，但水平翻转
     * - down-mirrored：同down，但水平翻转
     * - left-mirrored：同left，但垂直翻转
     * - right-mirrored：同right，但垂直翻转
     */
    readonly orientation: 'up' | 'down' | 'left' | 'right'
      | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';

    /**
     * 返回图片的格式
     */
    readonly type: string;
  }

  interface IGetImageInfoOptions {
    /**
     * 图片的路径，可以是相对路径，临时文件路径，存储文件路径
     */
    src: string;

    /**
     * 接口调用成功的回调函数，包含图片信息
     */
    success?: (res?: IGetImageInfoSuccessResult) => void;

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
   * 获取图片信息
   */
  function getImageInfo(options: IGetImageInfoOptions): void;

  interface ISaveImageOptions {
    /**
     * 要保存的图片链接
     */
    url: string;

    /**
     * 调用成功的回调函数
     */
    success?(): void;

    /**
     * 调用失败的回调函数
     *
     * - 2：参数无效，没有传 url 参数
     * - 15：没有开启相册权限(ios only)
     * - 16：手机相册存储空间不足(ios only)
     * - 17：保存图片过程中的其他错误
     */
    fail?(error: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 保存在线图片到手机相册。
   */
  function saveImage(options: ISaveImageOptions): void;

  interface ICompressImageOptions {
    /**
     * 要压缩的图片地址数组
     */
    apFilePaths: string[];

    /**
     * 压缩级别，支持 0 ~ 4 的整数，默认 4。
     *
     * - 0：低质量
     * - 1：中等质量
     * - 2：高质量
     * - 3：不压缩
     * - 4：根据网络适应
     */
    compressLevel: 0 | 1 | 2 | 3 | 4;

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
   * 压缩图片。
   */
  function compressImage(options: ICompressImageOptions): void;

  interface IVideoContext {
    /**
     * 播放
     */
    play(): void;
    /**
     * 暂停
     */
    pause(): void;
    /**
     * 停止
     */
    stop(): void;
    /**
     * 跳转到指定位置，单位秒（s）
     */
    seek(position: number): void;
    /**
     *  进入全屏，0为正常竖屏，90为横屏，-90反向横屏。
     */
    requestFullScreen(direction: 0 | 90 | -90): void;
    /**
     * 退出全屏
     */
    exitFullScreen(): void;
    /**
     * 显示状态栏，仅在 iOS 全屏下有效
     */
    showStatusBar(): void;
    /**
     * 隐藏状态栏，仅在 iOS 全屏下有效
     */
    hideStatusBar(): void;
  }
  /**
   * 获取视频上下文
   */
  function createVideoContext(id: string): IVideoContext;
}
