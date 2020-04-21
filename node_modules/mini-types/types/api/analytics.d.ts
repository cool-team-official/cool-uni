/**
 * @file 自定义分析
 */

declare namespace my {
  /**
   * 自定义分析数据的上报接口。使用前需要在小程序管理后台的事件管理中新建事件，并配置好事件名和字段。
   *
   * @param eventName 自定义事件名，需申请
   * @param data 上报的数据
   */
  function reportAnalytics(eventName: string, data: Record<string, any>): void;
}
