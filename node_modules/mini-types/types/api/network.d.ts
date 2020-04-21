/**
 * @file 网络
 */
declare namespace my {
  interface IHttpRequestSuccessResult {
    /**
     * 响应数据，格式取决于请求时的 dataType 参数
     */
    readonly data?: any;

    /**
     * 响应码
     *
     * - 1：{error: 1, message: "not implemented!"} 请求没有结束，就跳转到了另一个页面。
     * - 2：参数错误。
     * - 11：无权跨域
     * - 12：网络出错
     * - 13：超时
     * - 14：解码失败
     * - 15：小程序页面传参如果做urlencode需要把整体参数进行编码。
     * - 19：HTTP错误。
     * - 20：请求已被停止/服务端限流
     * - 23：代理请求失败。
     */
    readonly status?: 1 | 2 | 11 | 12 | 13 | 14 | 15 | 19 | 20 | 23;

    /**
     * 响应头
     */
    readonly headers?: Readonly<Record<string, string>>;
  }

  /**
   * 返回 RequestTask，可以调用 abort 方法取消请求
   */
  interface IRequestTask extends Promise<IHttpRequestSuccessResult> {
    abort: () => void;
  }

  interface IHttpRequestOptions {
    /**
     * 目标服务器url
     */
    url: string;

    /**
     * 设置请求的 HTTP 头，默认 {'content-type': 'application/json'}
     */
    headers?: Record<string, string>;

    /**
     * 默认GET，目前支持GET/POST
     */
    method?: 'GET' | 'POST';

    /**
     * 请求参数。
     *
     * 传给服务器的数据最终会是 String 类型，如果 data 不是 String 类型，会被转换成 String 。转换规则如下：
     * - 若方法为GET，会将数据转换成 query string： encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...
     * - 若方法为 POST 且 headers['content-type'] 为 application/json ，会对数据进行 JSON 序列化
     * - 若方法为 POST 且 headers['content-type'] 为 application/x-www-form-urlencoded ，会将数据转换成 query string： encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...
     */
    data?: Record<string, any>;

    /**
     * 超时时间，单位ms，默认30000
     */
    timeout?: number;

    /**
     * 期望返回的数据格式，默认json，支持json，text，base64
     */
    dataType?: 'json' | 'text' | 'base64';

    /**
     * 调用成功的回调函数
     */
    success?(res: IHttpRequestSuccessResult): void;

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
   * 小程序网络请求
   *
   * @deprecated
   */
  function httpRequest(options: IHttpRequestOptions): void;

  /**
   * 小程序网络请求
   */
  function request(options: IHttpRequestOptions): IRequestTask;

  interface IUploadFileSuccessResult {
    /**
     * 开发者服务器返回的数据
     */
    readonly data: string;

    /**
     * HTTP状态码
     */
    readonly statusCode: number;

    /**
     * 服务器返回的 header
     */
    readonly header: Readonly<Record<string, string>>;
  }

  interface IUploadFileOptions {
    /**
     * 开发者服务器 url
     */
    url: string;

    /**
     * 要上传文件资源的路径
     */
    filePath: string;

    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    fileName: string;

    /**
     * 文件类型，image / video / audio
     */
    fileType?: 'image' | 'video' | 'audio';

    /**
     * HTTP 请求 Header , header 中不能设置 Referer
     */
    header?: Record<string, string>;

    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: Record<string, any>;

    /**
     * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
     */
    success?: (res?: IUploadFileSuccessResult) => void;

    fail?(res: { error: 11 | 12 | 13 }): void;

    complete?(): void;
  }

  /**
   * 将本地资源上传到开发者服务器。
   * 如页面通过 [my.chooseImage](#my.chooseImage) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。
   * 客户端发起一个 HTTPS POST 请求，其中 `Content-Type` 为 `multipart/form-data` 。
   */
  function uploadFile(options: IUploadFileOptions): void;

  interface IDownloadFileSuccessResult {
    /**
     * 文件的临时路径
     */
    readonly apFilePath: string;
  }

  interface IDownloadFileFailResult {
    /**
     * - 12：下载失败
     * - 13：没有权限
     */
    error: 12 | 13;
  }

  interface IDownloadFileOptions {
    /**
     * 下载资源的 url
     */
    url: string;

    /**
     * HTTP 请求 Header
     */
    header?: Record<string, string>;

    /**
     * 下载成功后以 apFilePath 的形式传给页面，res = {apFilePath: '文件的临时路径'}
     */
    success?: (res?: IDownloadFileSuccessResult) => void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IDownloadFileFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res: IDownloadFileFailResult | IDownloadFileSuccessResult): void;
  }

  /**
   * 下载文件资源到本地。
   * 客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
   */
  function downloadFile(options: IDownloadFileOptions): void;

  interface IConnectFailResult {
    /**
     * - 1：未知错误
     * - 2：网络连接已经存在
     * - 3：URL参数为空
     * - 4：无法识别的URL格式
     * - 5：URL必须以ws或者wss开头
     * - 6：连接服务器超时
     * - 7：服务器返回的https证书无效
     * - 8：服务端返回协议头无效
     * - 9：WebSocket请求没有指定Sec-WebSocket-Protocol请求头
     * - 10：网络连接没有打开，无法发送消息
     * - 11：消息发送失败
     * - 12：无法申请更多内存来读取网络数据
     */
    readonly error: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  }

  interface IConnectSocketOptions {
    /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     */
    url: string;

    /**
     * 请求的数据
     */
    data?: string;

    /**
     * HTTP Header , header 中不能设置 Referer
     */
    header?: Record<string, string>;

    /**
     * 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     */
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

    /**
     * 调用成功的回调函数
     */
    success?(): void;

    /**
     * 调用失败的回调函数
     */
    fail?(res: IConnectFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res?: IConnectFailResult): void;
  }

  /**
   * 创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket?t=1477656499061) 连接；
   * **一个支付宝小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接**。
   */
  function connectSocket(options: IConnectSocketOptions): void;

  /**
   * 监听WebSocket连接打开事件。
   */
  function onSocketOpen(callback: (res?: any) => void): void;

  /**
   * 监听WebSocket错误。
   */
  function onSocketError(callback: (res?: any) => void): void;

  interface ISendSocketMessageOptions {
    /**
     * 需要发送的内容：普通的文本内容 String 或者经 base64 编码后的 String
     */
    data: string;

    /**
     * 如果需要发送二进制数据，需要将入参数据经 base64 编码成 String 后赋值 data，同时将此字段设置为true，否则如果是普通的文本内容 String，不需要设置此字段
     */
    isBuffer?: boolean;

    /**
     * 回调函数
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
   * 通过 WebSocket 连接发送数据，需要先 [my.connectSocket](#my.connectSocket)，并在 [my.onSocketOpen](#my.onSocketOpen) 回调之后才能发送。
   */
  function sendSocketMessage(options: ISendSocketMessageOptions): void;

  interface ISocketMessageResponse {
    /**
     * 服务器返回的消息
     */
    readonly data: string;

    /**
     * 如果此字段值为true，data字段表示接收到的经过了 base64 编码后的 String，否则 data 字段表示接收到的普通 String 文本。
     */
    readonly isBuffer: boolean;
  }

  /**
   * 监听WebSocket接受到服务器的消息事件。
   */
  function onSocketMessage(
    callback: (res?: ISocketMessageResponse) => void
  ): void;

  interface ICloseSocketOptions {
    /**
     * 回调函数
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
   * 关闭WebSocket连接。
   */
  function closeSocket(options: ICloseSocketOptions): void;

  /**
   * 监听WebSocket关闭。
   */
  function onSocketClose(callback: (res?: any) => void): void;

  /**
   * 取消监听WebSocket关闭。
   */
  function offSocketClose(): void;
}
