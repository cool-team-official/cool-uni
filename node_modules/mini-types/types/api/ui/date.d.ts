/**
 * @file 选择日期
 */
declare namespace my {
  interface IDatePickerFailResult {
    /**
     * - 11：用户取消操作
     */
    readonly error: 11;
  }

  interface IDatePickerSuccessResult {
    /**
     * 选择的日期
     */
    readonly date: string;
  }

  interface IDatePickerOptions {
    /**
     * 返回的日期格式，
     * 1. yyyy-MM-dd（默认）
     * 2. HH:mm
     * 3. yyyy-MM-dd HH:mm
     * 4. yyyy-MM （最低基础库：1.1.1, 可用 canIUse('datePicker.object.format.yyyy-MM') 判断）
     * 5. yyyy （最低基础库：1.1.1,可用 canIUse('datePicker.object.format.yyyy') 判断）
     */
    format?: string;

    /**
     * 初始选择的日期时间，默认当前时间
     */
    currentDate?: string;

    /**
     * 最小日期时间
     */
    startDate?: string;

    /**
     * 最大日期时间
     */
    endDate?: string;

    /**
     * 调用成功的回调函数
     */
    success?(result: IDatePickerSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(result: IDatePickerFailResult): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(result: IDatePickerFailResult | IDatePickerSuccessResult): void;
  }

  /**
   * 打开日期选择列表
   */
  function datePicker(options: IDatePickerOptions): void;
}
