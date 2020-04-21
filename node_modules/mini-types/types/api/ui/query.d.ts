/**
 * @file 节点查询
 */
declare namespace my {
  interface ISelectorQuerySelectMethod {
    /**
     * 选择当前第一个匹配选择器的节点，选择器支持 id 选择器以及 class 选择器.
     */
    select(selector: string): ISelectorQueryMeasureMethod;
    /**
     * 选择所有匹配选择器的节点，选择器支持 id 选择器以及 class 选择器.
     */
    selectAll(selector: string): ISelectorQueryMeasureMethod;
    /**
     * 选择窗口对象
     */
    selectViewport(): ISelectorQueryMeasureMethod;
  }

  type BoundingClientRectResult = {
    width: number;
    height: number;
  } | {
    width: number;
    height: number;
    left: number;
    top: number;
    bottom: number;
    right: number;
  };

  interface IScrollOffsetResult {
    scrollTop: number;
    scrollLeft: number;
  }

  interface ISelectorQueryMeasureMethod {
    /**
     * 将当前选择节点的位置信息放入查询结果，类似 dom 的 getBoundingClientRect，
     * 返回对象包含 width/height/left/top/bottom/right. 如果当前节点为窗口对象则只返回 width/height.
     */
    boundingClientRect(): ISelectorQuerySelectMethod & ISelectorQueryStopMethod;
    /**
     * 将当前选择节点的滚动信息放入查询结果，返回对象包含 scrollTop/scrollLeft.
     */
    scrollOffset(): ISelectorQuerySelectMethod & ISelectorQueryStopMethod;
  }

  type SelectorQueryStopMethodExecResult = ReadonlyArray<Readonly<
    BoundingClientRectResult>
    | Readonly<IScrollOffsetResult>
    | null
  >;

  interface ISelectorQueryStopMethod {
    /**
     * 将查询结果放入 callback 回调中。查询结果为数组，每项为一次查询的结果，如果当前是节点列表，则单次查询结果也为数组。
     * 注意 exec 必须放到 Page onReady 后调用。
     */
    exec(callback: (result: SelectorQueryStopMethodExecResult) => {}): void;
  }

  interface ICreateSelectorQueryOptions {
    page: string;
  }
  /**
   * 获取一个节点查询对象 SelectorQuery
   */
  function createSelectorQuery(params?: ICreateSelectorQueryOptions): ISelectorQuerySelectMethod;
}
