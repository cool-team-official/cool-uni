/**
 * @file 级联选择
 */
declare namespace my {
  type MultiLevelSelectOptionsList = Array<{ name: string; subList?: MultiLevelSelectOptionsList; }>;

  type MultiLevelSelectSuccessResult = {
    /**
     * 是否选择完成,取消返回false
     */
    readonly success: false
  } | {
    /**
     * 是否选择完成,取消返回false
     */
    readonly success: true;

    /**
     * 选择的结果，如[{“name”:”杭州市”},{“name”:”上城区”},{“name”:”古翠街道”}]
     */
    readonly result: MultiLevelSelectOptionsList;
  };

  interface IMultiLevelSelectOptions {
    /**
     * 标题
     */
    title?: string;

    /**
     * 选择数据列表
     */
    list: MultiLevelSelectOptionsList;

    /**
     * 条目名称
     */
    name: string;

    /**
     * 子条目列表
     */
    subList?: IMultiLevelSelectOptions;

    /**
     * 调用成功的回调函数
     */
    success?(result: MultiLevelSelectSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(result?: MultiLevelSelectSuccessResult): void;
  }

  /**
   * 级联选择功能主要使用在于多级关联数据选择，比如说省市区的信息选择。
   */
  function multiLevelSelect(options: IMultiLevelSelectOptions): void;
}
