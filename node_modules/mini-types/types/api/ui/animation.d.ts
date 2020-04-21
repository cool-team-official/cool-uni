/**
 * @file 动画
 */
declare namespace my {
  /* tslint:disable:no-empty-interface */
  interface IAnimationInfo {}
  /* tslint:enable:no-empty-interface */

  interface IAnimation {
    /**
     * 透明度，参数范围 0~1
     */
    opacity(value: number): IAnimation;
    /**
     * 颜色值
     */
    backgroundColor(color: string): IAnimation;
    /**
     * 长度值，如果传入数字则默认单位为 px ，可传入其他自定义单位的长度值
     */
    width(length: number): IAnimation;
    /**
     * 高度值，如果传入数字则默认单位为 px ，可传入其他自定义单位的长度值
     */
    height(height: number): IAnimation;
    /**
     * 顶部坐标值，如果传入数字则默认单位为 px ，可传入其他自定义单位的长度值
     */
    top(top: number): IAnimation;
    /**
     * 左部坐标值，如果传入数字则默认单位为 px ，可传入其他自定义单位的长度值
     */
    left(left: number): IAnimation;
    /**
     * 底部坐标值，如果传入数字则默认单位为 px ，可传入其他自定义单位的长度值
     */
    bottom(bottom: number): IAnimation;
    /**
     * 右部坐标值，如果传入数字则默认单位为 px ，可传入其他自定义单位的长度值
     */
    right(right: number): IAnimation;

    /**
     * deg 范围 -180 ~ 180，从原点顺时针旋转一个 deg 角度
     */
    rotate(deg: number): IAnimation;
    /**
     * deg 范围 -180 ~ 180，在 X 轴旋转一个 deg 角度
     */
    rotateX(deg: number): IAnimation;
    /**
     * deg 范围 -180 ~ 180，在 Y 轴旋转一个 deg 角度
     */
    rotateY(deg: number): IAnimation;
    /**
     * deg 范围 -180 ~ 180，在 Z 轴旋转一个deg角度
     */
    rotateZ(deg: number): IAnimation;
    /**
     * 同 transform-function rotate3d
     */
    rotate3d(x: number, y: number, z: number, deg: number): IAnimation;

    /**
     * 只有一个参数时，表示在 X 轴、Y 轴同时缩放 sx 倍；两个参数时表示在 X 轴缩放 sx 倍，在 Y 轴缩放 sy 倍
     */
    scale(sx: number, sy?: number): IAnimation;
    /**
     * 在 X 轴缩放 sx 倍
     */
    scaleX(sx: number): IAnimation;
    /**
     * 在 Y 轴缩放 sy 倍
     */
    scaleY(sy: number): IAnimation;
    /**
     * 在 Z 轴缩放 sz 倍
     */
    scaleZ(sz: number): IAnimation;
    /**
     * 在 X 轴缩放 sx 倍，在 Y 轴缩放sy 倍，在 Z 轴缩放 sz 倍
     */
    scale3d(sx: number, sy: number, sz: number): IAnimation;

    /**
     * 只有一个参数时，表示在 X 轴偏移 tx；两个参数时，表示在 X 轴偏移 tx，在 Y 轴偏移 ty，单位均为 px。
     */
    translate(tx: number, ty?: number): IAnimation;
    /**
     * 在 X 轴偏移 tx，单位 px
     */
    translateX(tx: number): IAnimation;
    /**
     * 在 Y 轴偏移 ty，单位 px
     */
    translateY(ty: number): IAnimation;
    /**
     * 在 Z 轴偏移 tz，单位 px
     */
    translateZ(tz: number): IAnimation;
    /**
     * 在 X 轴偏移 tx，在 Y 轴偏移ty，在Z轴偏移 tz，单位 px
     */
    translate3d(tx: number, ty: number, tz: number): IAnimation;

    /**
     * 参数范围 -180 ~ 180。只有一个参数时，Y 轴坐标不变，X 轴坐标延顺时针倾斜 ax 度；两个参数时，分别在 X 轴倾斜 ax 度，在 Y 轴倾斜 ay 度
     */
    skew(ax: number, ay?: number): IAnimation;
    /**
     * 参数范围 -180 ~ 180。Y 轴坐标不变，X 轴坐标延顺时针倾斜 ax 度
     */
    skewX(ax: number): IAnimation;
    /**
     * 参数范围 -180 ~ 180。X 轴坐标不变，Y 轴坐标延顺时针倾斜 ay 度
     */
    skewY(ay: number): IAnimation;

    /**
     * 同 transform-function
     */
    matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): IAnimation;
    /**
     * 同 transform-function matrix3d
     */
    matrix3d(
      a1: number,
      b1: number,
      c1: number,
      d1: number,
      a2: number,
      b2: number,
      c2: number,
      d2: number,
      a3: number,
      b3: number,
      c3: number,
      d3: number,
      a4: number,
      b4: number,
      c4: number,
      d4: number,
    ): IAnimation;

    step(options?: ICreateAnimationOptions): void;

    export(): IAnimationInfo;
  }

  interface ICreateAnimationOptions {
    /**
     * 动画的持续时间，单位 ms，默认值 400
     */
    duration?: number;

    /**
     * 定义动画的效果，默认值"linear"，有效值："linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
     */
    timeFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';

    /**
     * 动画延迟时间，单位 ms，默认值 0
     */
    delay?: number;

    /**
     * 设置transform-origin，默认值 "50% 50% 0"
     */
    transformOrigin?: string;
  }

  /**
   * 创建动画实例 animation。调用实例的方法来描述动画，最后通过动画实例的export方法将动画数据导出并传递给组件的animation属性。
   * 注意: export 方法调用后会清掉之前的动画操作
   */
  function createAnimation(options?: ICreateAnimationOptions): IAnimation;
}
