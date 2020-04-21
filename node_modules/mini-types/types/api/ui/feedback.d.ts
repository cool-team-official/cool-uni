/**
 * @file 交互反馈
 */
declare namespace my {
  interface IShowToastOptions {
    /**
     * 提示的内容
     */
    content?: string;

    /**
     * toast 类型，展示相应图标,success, fail, exception, none(默认值)。其中 exception 类型必须传文字信息
     */
    type?: 'success' | 'fail' | 'exception' | 'none';

    /**
     * 显示时长，单位为 ms，默认 2000
     */
    duration?: number;

    /**
     * 调用成功的回调函数
     */
    success?: () => void;

    /**
     * 调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
  }

  /**
   * 显示一个弱提示，可选择多少秒之后消失。
   */
  function showToast(options: IShowToastOptions): void;

  /**
   * 隐藏消息提示框
   */
  function hideToast(): void;

  interface IAlertOptions {
    /**
     * alert框的标题
     */
    title?: string;

    /**
     * alert框的内容
     */
    content?: string;

    /**
     * 按钮文字，默认确定
     */
    buttonText?: string;

    /**
     * 调用成功的回调函数
     */
    success?: () => void;

    /**
     * 调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
  }

  /**
   * alert 警告框
   */
  function alert(options: IAlertOptions): void;

  interface IConfirmSuccessResult {
    /**
     * 点击 confirm 返回 true，点击 cancel 返回false
     */
    readonly confirm: boolean;

    /**
     * 是否点击了确认
     */
    readonly ok?: boolean;
  }

  interface IConfirmOptions {
    /**
     * confirm框的标题
     */
    title?: string;

    /**
     * confirm框的内容
     */
    content?: string;

    /**
     * 确认按钮文字，默认‘确定’
     */
    confirmButtonText?: string;

    /**
     * 确认按钮文字，默认‘取消’
     */
    cancelButtonText?: string;

    /**
     * 调用成功的回调函数
     */
    success?: (result: IConfirmSuccessResult) => void;

    /**
     * 调用失败的回调函数
     */
    fail?: (result: IConfirmSuccessResult) => void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (result: IConfirmSuccessResult) => void;
  }

  /**
   * confirm 确认框。
   */
  function confirm(options: IConfirmOptions): void;

  interface IPromptSuccessResult {
    /**
     * 点击 ok 返回 true，点击 cancel 返回false
     */
    readonly ok: boolean;

    /**
     * 当ok为true时，返回用户输入的内容
     */
    readonly inputValue?: string;
  }

  interface IPromptOptions {
    /**
     * prompt框标题
     */
    title?: string;

    /**
     * prompt框文本，默认‘请输入内容’
     */
    message: string;

    /**
     * 输入框内的提示文案
     */
    placeholder?: string;

    /**
     * message对齐方式，可用枚举left/center/right，iOS ‘center’, android ‘left’
     */
    align?: 'left' | 'center' | 'right';

    /**
     * 确认按钮文字，默认‘确定’
     */
    okButtonText?: string;

    /**
     * 取消按钮文字，默认‘取消’
     */
    cancelButtonText?: string;

    /**
     * 调用成功的回调函数
     */
    success?: (result: IPromptSuccessResult) => void;

    /**
     * 调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete: () => void;
  }

  function prompt(options: IPromptOptions): void;

  interface IShowLoadingOptions {
    /**
     * loading内容
     */
    content?: string;

    /**
     * loading延迟时间,默认 0。如果在此时间之前调用了 my.hideLoading 则不会显示
     */
    delay?: number;

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
   * 显示消息提示框
   */
  function showLoading(options?: string | IShowLoadingOptions): Promise<void>;

  interface IHideLoadingOptions {
    /**
     * 页面实例, 每个页面实例有一个loading, 如果不传入该参数可能会导致loading无法取消。
     * 无语的设计@小程序
     * 参考: https://docs.alipay.com/mini/api/ui-feedback#a-name7bgvmdamyhideloading
     */
    page?: tinyapp.IPageInstance<any>;
  }

  /**
   * 显示消息提示框
   */
  function hideLoading(options?: IHideLoadingOptions): Promise<void>;

  interface IShowActionSheetSuccessResult {
    readonly index: number;
  }

  interface IShowActionSheetOptions {
    /**
     * 菜单标题
     */
    title?: string;

    /**
     * 菜单按钮文字数组
     */
    items: string[];

    /**
     * 取消按钮文案。默认为‘取消’。注：Android平台此字段无效，不会显示取消按钮。
     */
    cancelButtonText?: string;

    /**
     * （iOS特殊处理）指定按钮的索引号，从0开始，使用场景：需要删除或清除数据等类似场景，默认红色
     */
    destructiveBtnIndex?: number;

    /**
     * 需飘红选项的数组，数组内部对象字段见下表
     */
    badges?: Array<{
      /**
       * 需要飘红的选项的索引，从0开始
       */
      index: number;

      /**
       * 飘红类型，支持 none（无红点）/ point（纯红点） / num（数字红点）/ text（文案红点）/ more（...）
       */
      type: 'none' | 'point' | 'num' | 'text' | 'more';

      /**
       * 自定义飘红文案：
       * - 1、type为none/point/more时本文案可不填
       * - 2、type为num时本文案为小数或<=0均不显示, >100 显示"..."
       */
      text?: string;
    }>;

    /**
     * 调用成功的回调函数
     */
    success?(res: IShowActionSheetSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(res?: IShowActionSheetSuccessResult): void;
  }

  /**
   * 显示操作菜单。
   */
  function showActionSheet(options: IShowActionSheetOptions): void;
}
