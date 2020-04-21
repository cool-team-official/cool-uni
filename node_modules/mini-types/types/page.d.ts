declare namespace tinyapp {
  type OnShareAppMessageOptions = {
    from: 'button';
    target: Record<string, any>;
    webViewUrl?: string;
  } | {
    from: 'menu';
    webViewUrl?: string;
  };

  interface IOnShareAppMessageResult {
    title: string;
    desc?: string;
    path: string;
    content?: string;
    imageUrl?: string;
    bgImgUrl?: string;
    success?(): void;
    fail?(): void;
  }

  type IPageScrollEvent = [
    {
      readonly scrollTop: number;
      readonly scrollHeight: number;
    },
    null,
    null
  ] | {
    readonly scrollTop: number;
    readonly scrollHeight: number;
  };

  interface IPageEvents {
    onBack?(): void;
    onKeyboardHeight?(): void;
    onOptionMenuClick?(): void;
    onPopMenuClick?(): void;
    onPullIntercept?(): void;

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh?(params: { from: 'manual' | 'code'; }): void;
    onTitleClick?(): void;

    /**
     * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
     * 点击标签（tab）时触发。
     */
    onTabItemTap?(item: { index: number; pagePath: string; text: string; }): void;

    beforeTabItemTap?(): void;
  }

  interface IPageOptionsMethods extends Pick<
    IPageEvents,
    'onPullDownRefresh'
      | 'onTitleClick'
      | 'onOptionMenuClick'
      | 'onPopMenuClick'
      | 'onPullIntercept'
      | 'onTabItemTap'
  > {
    /**
     * 生命周期函数--监听页面加载
     *
     * @param query query 参数为 my.navigateTo 和 my.redirectTo 中传递的 query 对象。
     */
    onLoad?(query: Query): void;

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady?(): void;

    /**
     * 生命周期函数--监听页面显示
     */
    onShow?(): void;

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide?(): void;

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload?(): void;

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom?(): void;

    /**
     * 返回自定义分享信息
     */
    onShareAppMessage?(options: OnShareAppMessageOptions): IOnShareAppMessageResult;

    /**
     * 页面滚动时触发
     *
     * @param event 滚动事件参数
     */
    onPageScroll?(event: IPageScrollEvent): void;
  }

  type SetDataMethod<D> = (data: Partial<D>, callback?: () => void) => void;

  interface IPageInstance<D> extends Record<string, any> {
    /**
     * 页面数据。
     */
    readonly data: D;

    /**
     * 将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
     */
    setData: SetDataMethod<D>;

    /**
     * 同setData，但是相比于setData，在处理长列表的时候，其具有更高的性能
     */
    $spliceData: (operations: { [k: string]: [number, number, ...any[]] }) => void;

    /**
     * Page 路径，对应 app.json 中配置的路径值。
     */
    readonly route: string;

    /**
     * 批量更新数据。
     */
    $batchedUpdates: (fn: () => void) => void;
  }

  /**
   * Page 实现的接口对象
   */
  type PageOptions<D = Record<string, any>> = IPageOptionsMethods
    & {
        /**
         * 初始数据或返回初始化数据的函数, 为对象时所有页面共享。
         */
        data?: D;

        /**
         * 事件处理函数集合。
         */
        events?: IPageEvents & ThisType<IPageInstance<D>>;

        [name: string]: any;
      }
    & ThisType<IPageInstance<D>>;
}
