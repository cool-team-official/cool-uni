/// <reference path="./ui/index.d.ts" />
/// <reference path="./open/index.d.ts" />
/// <reference path="./media/index.d.ts" />
/// <reference path="./cache.d.ts" />
/// <reference path="./file.d.ts" />
/// <reference path="./location.d.ts" />
/// <reference path="./network.d.ts" />
/// <reference path="./device/index.d.ts" />
/// <reference path="./bluetooth.d.ts" />
/// <reference path="./ibeacon.d.ts" />
/// <reference path="./data.d.ts" />
/// <reference path="./share.d.ts" />
/// <reference path="./menu.d.ts" />
/// <reference path="./scene.d.ts" />
/// <reference path="./analytics.d.ts" />

declare namespace my {
  /**
   * 节点查询 https://docs.alipay.com/mini/api/selector-query
   */
  interface IBoundingClientRect {
    width: number;
    height: number;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  type ScrollOffset = Record<"scrollTop" | "scrollLeft", number>;

  type SelectorResult = ReadonlyArray<
    null
    | Readonly<IBoundingClientRect>
    | Readonly<ScrollOffset>
  >;

  type ISelectorExecCallback = (ret: SelectorResult) => void;

  interface ISelectorQuery {
    select(selector: string): ISelectorQuery;
    selectAll(selector: string): ISelectorQuery;
    selectViewport(): ISelectorQuery;
    boundingClientRect(): ISelectorQuery;
    scrollOffset(): ISelectorQuery;
    exec(ret: ISelectorExecCallback): void;
  }

  function createSelectorQuery(params?: Record<string, any>): ISelectorQuery;

  function canIUse(query: string): boolean;

  function reportCustomError(error: Error): void;

  function reportBizReady(): void;

  function call(apiName: string, params?: Record<string, any> | ((...args: any[]) => void)): void;
  function call(apiName: string, params?: Record<string, any>, callback?: (...args: any[]) => void): void;
}
