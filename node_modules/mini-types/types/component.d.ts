declare namespace tinyapp {
  interface IComponentLifeCycleMethods<D, P> {
    /**
     * 组件生命周期函数，组件创建时触发
     */
    onInit?(): void;

    /**
     * 组件生命周期函数，组件创建时和更新前触发
     *
     * @param nextProps 接收到的 props 数据
     */
    deriveDataFromProps?(nextProps: Partial<P>): void;

    /**
     * 组件生命周期函数，组件创建完毕时触发
     */
    didMount?(): void;

    /**
     * 组件生命周期函数，组件更新完毕时触发
     */
    didUpdate?(prevProps: Partial<P>, prevData: Partial<D>): void;

    /**
     * 组件生命周期函数，组件删除时触发
     */
    didUnmount?(): void;
  }

  interface IComponentMethods {
    [name: string]: (...args: any[]) => void;
  }

  interface IComponentInstance<P, D> extends Record<string, any> {
    /**
     * 组件内部状态
     */
    readonly data: D;

    /**
     * 传入组件的属性
     */
    readonly props: P;

    /**
     * 设置data触发视图渲染
     */
    setData: SetDataMethod<D>;

    /**
     * 组件所属页面实例
     */
    readonly $page: IPageInstance<any>;

    /**
     * 组件 id，可直接在组件 axml 中渲染值
     */
    readonly $id: number;

    /**
     * 组件路径
     */
    readonly is: string;

    /**
     * 设置data触发视图渲染
     */
    $spliceData: (operations: { [k: string]: [number, number, ...any[]] }) => void;
  }

  type ComponentOptions<
    P extends Record<string, any> = Record<string, any>,
    D = any,
    M extends IComponentMethods = IComponentMethods,
  > = IComponentLifeCycleMethods<D, P>
    & {
      /**
       * 组件间代码复用机制
       */
      mixins?: Array<ComponentOptions<any, any, any>>;

      /**
       * 组件内部状态
       */
      data?: D;

      /**
       * 为外部传入的数据设置默认值
       */
      props?: P;

      /**
       * 组件的方法，可以是事件响应函数或任意的自定义方法
       */
      methods?: M & ThisType<IComponentInstance<P, D> & M>;
    }
    & ThisType<IComponentInstance<P, D> & M>;
}
