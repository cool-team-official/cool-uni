declare namespace my {
  interface IOptionsSelectSuccessResult {
    /**
     * 选项一选择的值
     */
    selectedOneIndex: number;

    /**
     * 选项一选择的内容
     */
    selectedOneOption: string;

    /**
     * 选项二选择的值
     */
    selectedTwoIndex: number;

    /**
     * 选项二选择的值
     */
    selectedTwoOption: string;
  }

  interface IOptionsSelectOptions {
    /**
     * 头部标题信息
     */
    title?: string;

    /**
     * 选项一列表
     */
    optionsOne: string[];

    /**
     * 选项二列表
     */
    optionsTwo?: string[];

    /**
     * 选项一默认选中
     */
    selectedOneIndex?: number;

    /**
     * 选项二默认选中
     */
    selectedTwoIndex?: number;

    /**
     * 确定按钮文案
     */
    positiveString?: string;

    /**
     * 取消按钮文档
     */
    negativeString?: string;

    success?(res: IOptionsSelectSuccessResult): void;
  }

  /**
   * 类似于 safari 原生 select 的组件，但是功能更加强大，一般用来替代 select，或者 2 级数据的选择。
   * 注意不支持 2 级数据之间的联动。
   */
  function optionsSelect(options: IOptionsSelectOptions): void;
}
