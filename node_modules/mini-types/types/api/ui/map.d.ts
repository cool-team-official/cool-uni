/**
 * @file 地图
 */
declare namespace my {
  interface IGetCenterLocationResult {
    readonly longitude: number;
    readonly latitude: number;
    readonly scale: number;
  }

  interface IShowRouteOptions {
    /**
     * 搜索类型：10.1.50新增，有"walk", "bus", "drive", "ride", 默认值为walk
     */
    searchType: 'bus' | 'walk' | 'drive' | 'ride';

    /**
     * 起点纬度
     */
    startLat?: number;

    /**
     * 起点经度
     */
    startLng?: number;

    /**
     * 终点纬度
     */
    endLat?: number;

    /**
     * 终点经度
     */
    endLng?: number;

    /**
     * 途径点：10.1.50新增,仅驾车规划有效，searchType=“drive”
     */
    throughPoints: Array<{
      lat: number;
      lng: number;
    }>;

    /**
     * 路线颜色  10.1.50之后，该值仅在2d地图中生效
     */
    routeColor?: string;

    /**
     * 路线纹理  10.1.35 3d地图其优先级高于routeColor，即纹理会覆盖颜色值；10.1.50建议不再设置，在3d地图下提供了默认的纹理图案。
     */
    iconPath?: string;

    /**
     * 纹理宽度  10.1.35 iconPath设置时才生效。10.1.50建议不再设置，在3d地图下提供了默认的纹理宽度。
     */
    iconWidth?: number;

    /**
     * 路线宽度  在不设置纹理时有效。 10.1.50建议不再设置，在2d地图下提供了默认值，3d不需要设置。
     */
    routeWidth?: number;

    /**
     * 覆盖物 Z 轴坐标  10.1.35
     */
    zIndex?: number;

    /**
     * 只有驾车模式和公交模式支持，可选。
     *
     *  - 0：最快捷模式，速度优先（时间）
     *  - 1：最经济模式，费用优先（不走收费路段的最快道路）
     *  - 2：最少换乘模式，距离优先
     *  - 3：最少步行模式，不走快速路
     *  - 4：最舒适模式，结合实时交通（躲避拥堵）
     *  - 5：不乘地铁模式，多策略（同时使用速度优先、费用优先、距离优先三个策略）
     *  - 6：不走高速
     *  - 7：不走高速且避免收费
     *  - 8：躲避收费和拥堵
     *  - 9：不走高速且躲避收费和拥堵
     */
    mode?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

    /**
     * 公交模式下必填
     */
    city?: string;

    /**
     * 公交跨城模式下必填
     */
    destinationCity?: string;
  }

  interface IGestureEnableOptions {
    isGestureEnable: 0 | 1;
  }

  interface IShowsScaleOptions {
    isShowsScale: 0 | 1;
  }

  interface IShowsCompassOptions {
    isShowsCompass: 0 | 1;
  }

  interface IUpdateComponentsOptions {
    scale?: number;
    longitude?: number;
    latitude?: number;
    command?: {
      /**
       * marker动画
       */
      markerAnim?: Array<{
        type?: number;
        markerId?: string;
      }>,
    };
    setting?: {
      /**
       * 手势
       */
      gestureEnable?: 0 | 1;

      /**
       * 比例尺
       */
      showScale?: 0 | 1;

      /**
       * 指南针
       */
      showCompass?: 0 | 1;

      /**
       * 双手下滑
       */
      tiltGesturesEnabled?: 0 | 1;

      /**
       * 交通路况展示
       */
      trafficEnabled?: 0 | 1;

      /**
       * 地图POI信息
       */
      showMapText?: 0 | 1;

      /**
       * 高德地图logo位置
       */
      logoPosition?: { centerX?: number; centerY?: number; };
    };
    markers?: any[];
    polylines?: any[];
    'include-points'?: any[];
    'include-padding'?: {
      left?: 0;
      right?: 0;
      top?: 0;
      bottom?: 0;
    };
  }

  interface ITranslateMarkerOptions {
    markerId: string;
    destination: {
      longitude: number;
      latitude: number;
    };

    /**
     * 选填，默认true
     */
    autoRotate?: boolean;

    /**
     * 选填，在autoRotate为false的情况下才有效，不填默认是0
     */
    rotate?: number;

    /**
     * 选填，单位ms，默认1000ms
     */
    duration?: number;

    /**
     * 动画结束回调
     */
    animationEnd?: () => void;
  }

  interface IMapContext {
    /**
     * 移动视野到定位点并恢复到默认缩放级别，需要配合map组件的show-location使用
     */
    moveToLocation(): void;
    /**
     * 设置所有手势是否可用，1：可用 ，0：不可用
     */
    gestureEnable(options: IGestureEnableOptions): void;
    /**
     * 设置比例尺控件是否可见，1：可见 ，0：不可见
     */
    showsScale(options: IShowsScaleOptions): void;
    /**
     * 设置指南针是否可见，1：可见 ，0：不可见
     */
    showsCompass(options: IShowsCompassOptions): void;
    /**
     * 规划步行路线，一条
     */
    showRoute(options: IShowRouteOptions): void;
    /**
     * 清除地图上的步行导航路线
     */
    clearRoute(): void;
    /**
     * 获取当前地图中心位置
     */
    getCenterLocation(callback: (res: IGetCenterLocationResult) => {}): void;
    /**
     * 增量更新地图接口
     */
    updateComponents(options: IUpdateComponentsOptions): void;

    /**
     * 平移marker接口
     * 备注：对同一个markerId在translateMarker没animationEnd之前再次调动会被丢掉，下一次动画需要在animationEnd之后再调用才有效。
     */
    translateMarker(options: ITranslateMarkerOptions): void;
  }

  /**
   * 创建并返回一个 map 上下文对象 mapContext。
   */
  function createMapContext(mapId: string): IMapContext;
}
