/**
 * @file 选择城市
 */
declare namespace my {
  interface IChooseCitySuccessResult {
    /**
     * 城市名
     */
    readonly city: string;

    /**
     * 行政区划代码
     */
    readonly adCode: string;
  }

  interface ICity {
    /**
     * 城市名
     */
    city: string;

    /**
     * 行政区划代码
     */
    adCode: string;

    /**
     * 城市名对应拼音拼写，方便用户搜索
     */
    spell: string;
  }

  interface IChooseCityOptions {
    /**
     * 是否显示当前定位城市，默认 false
     */
    showLocatedCity?: boolean;

    /**
     * 是否显示热门城市，默认 true
     */
    showHotCities?: boolean;

    /**
     * 自定义城市列表
     */
    cities?: Array<{ city: string; adCode: string; spell: string; }>;

    /**
     * 自定义热门城市列表
     */
    hotCities?: Array<{ city: string; adCode: string; spell: string; }>;

    /**
     * 调用成功的回调函数
     */
    success?(result: IChooseCitySuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(): void;

    /**
     * 调用失败的回调函数
     */
    complete?(res?: IChooseCitySuccessResult): void;
  }

  /**
   * 打开城市选择列表。
   * 如果用户没有选择任何城市直接点击了返回，将不会触发回调函数。
   */
  function chooseCity(options: IChooseCityOptions): void;
}
