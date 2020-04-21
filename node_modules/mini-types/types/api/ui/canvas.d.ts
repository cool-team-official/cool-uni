/**
 * @file 画布
 */
declare namespace my {
  interface ILinearGradient {
    /**
     * 创建一个颜色的渐变点。
     * 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
     * 需要使用 addColorStop() 来指定渐变点，至少需要两个。
     *
     * @param stop 表示渐变点在起点和终点中的位置，范围 0 ～ 1
     * @param color 渐变点颜色
     */
    addColorStop(stop: number, color: string): void;
  }

  /* tslint:disable:no-empty-interface */
  interface ICircularGradient extends ILinearGradient {}
  /* tslint:enable:no-empty-interface */

  interface IGetImageDataSuccessResult {
    readonly width: number;
    readonly height: number;
  }

  interface IGetImageDataOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    success?: (result: IGetImageDataSuccessResult) => void;
    fail?: () => void;
    complete?: () => void;
  }

  interface IPutImageDataOptions {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    success?: () => void;
    fail?: () => void;
    complete?: () => void;
  }

  interface ICanvasToTempFilePathOptions {
    /**
     * 画布 x 轴起点，默认为 0
     */
    x?: number;
    /**
     * 画布 y 轴起点，默认为 0
     */
    y?: number;
    /**
     * 画布宽度，默认为 canvas 宽度 - x
     */
    width?: number;
    /**
     * 画布高度，默认为 canvas 高度 - y
     */
    height?: number;
    /**
     * 输出的图片宽度，默认为 width
     */
    destWidth?: number;
    /**
     * 输出的图片高度，默认为 height
     */
    destHeight?: number;
    /**
     * 目标文件的类型。合法值为jpg、png。
     */
    fileType?: 'jpg' | 'png';
    /**
     * 图片的质量，取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
     */
    quality?: number;
    success?(): void;
    fail?(): void;
    complete?(): void;
  }

  interface ICanvasContext {
    /**
     * 把当前画布的内容导出生成图片，并返回文件路径。
     */
    toTempFilePath(options: ICanvasToTempFilePathOptions): void;
    /**
     * textAlign 是 Canvas 2D API 描述绘制文本时，文本的对齐方式的属性。
     * 注意，该对齐是基于CanvasRenderingContext2D.fillText 方法的x的值。
     * 所以如果 textAlign="center"，那么该文本将画在 x-50%*width。
     */
    setTextAlign(textAlign: 'left' | 'right' | 'center' | 'start' | 'end'): void;
    /**
     * textBaseline 是 Canvas 2D API 描述绘制文本时，当前文本基线的属性。
     */
    setTextBaseline(textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'): void;
    /**
     * 设置填充色。
     * 如果没有设置 fillStyle，则默认颜色为 black。
     */
    setFillStyle(color: string): void;
    /**
     * 设置边框颜色。
     * 如果没有设置 strokeStyle，则默认颜色为 black。
     */
    setStrokeStyle(color: string): void;
    /**
     * 设置阴影样式。
     * 如果没有设置，offsetX 的默认值为 0， offsetY 的默认值为 0， blur 的默认值为 0，color 的默认值为 black。
     */
    setShadow(
      /**
       * 阴影相对于形状水平方向的偏移
       */
      offsetX: number,
      /**
       * 阴影相对于形状竖直方向的偏移
       */
      offsetY: number,
      /**
       * 0~100，阴影的模糊级别，值越大越模糊
       */
      blur: number,
      /**
       * 阴影颜色
       */
      color: string,
    ): void;

    /**
     * 创建一个线性的渐变色。
     */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): ILinearGradient;
    /**
     * 创建一个圆形的渐变色。
     * 起点在圆心，终点在圆环。
     * 需要使用 addColorStop() 来指定渐变点，至少需要两个。
     */
    createCircularGradient(x: number, y: number, r: number): ICircularGradient;
    /**
     * 设置线条的宽度。
     */
    setLineWidth(lineWidth: number): void;
    /**
     * 设置线条的端点样式。
     */
    setLineCap(lineCap: 'round' | 'butt' | 'square'): void;
    /**
     * 设置线条的交点样式。
     */
    setLineJoin(lineJoin: 'round' | 'bevel' | 'miter'): void;
    /**
     * 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 setLineJoin() 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
     */
    setMiterLimit(miterLimit: number): void;
    /**
     * 创建一个矩形。
     * 用 fill() 或者 stroke() 方法将矩形画到 canvas 中。
     */
    rect(x: number, y: number, width: number, height: number): void;
    /**
     * 填充矩形。
     * 用 setFillStyle() 设置矩形的填充色，如果没设置则默认是 black。
     */
    fillRect(x: number, y: number, width: number, height: number): void;
    /**
     * 画一个矩形(非填充)。
     * 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是 black。
     */
    strokeRect(x: number, y: number, width: number, height: number): void;
    /**
     * 清除画布上在该矩形区域内的内容。
     * clearRect 并非画一个白色的矩形在地址区域，而是清空，为了有直观感受，可以对 canvas 加了一层背景色。
     */
    clearRect(x: number, y: number, width: number, height: number): void;
    /**
     * 对当前路径中的内容进行填充。默认的填充色为黑色。
     * 如果当前路径没有闭合，fill() 方法会将起点和终点进行连接，然后填充。
     * fill() 填充的的路径是从 beginPath() 开始计算，但是不会将 fillRect() 包含进去。
     */
    fill(): void;
    /**
     * 画出当前路径的边框。默认 black。
     * stroke() 描绘的的路径是从 beginPath() 开始计算，但是不会将 strokeRect() 包含进去。
     */
    stroke(): void;
    /**
     * 开始创建一个路径，需要调用 fill 或者 stroke 才会使用路径进行填充或描边。
     * 在最开始的时候相当于调用了一次 beginPath()。
     * 同一个路径内的多次setFillStyle()、setStrokeStyle()、setLineWidth()等设置，以最后一次设置为准。
     */
    beginPath(): void;
    /**
     * 关闭一个路径。
     * 关闭路径会连接起点和终点。
     * 如果关闭路径后没有调用 fill() 或者 stroke() 并开启了新的路径，那之前的路径将不会被渲染。
     */
    closePath(): void;
    /**
     * 把路径移动到画布中的指定点，不创建线条。
     * 用 stroke() 方法来画线条。
     */
    moveTo(x: number, y: number): void;
    /**
     * lineTo 方法增加一个新点，然后创建一条从上次指定点到目标点的线。
     * 用 stroke() 方法来画线条
     */
    lineTo(x: number, y: number): void;
    /**
     * 画一条弧线。
     * 创建一个圆可以用 arc() 方法指定其实弧度为0，终止弧度为 2 * Math.PI。
     * 用 stroke() 或者 fill() 方法来在 canvas 中画弧线。
     *
     * @param x 圆 x 坐标
     * @param y 圆 y 坐标
     * @param r 圆半径
     * @param sAngle 起始弧度，单位弧度（在3点钟方向）
     * @param eAngle 终止弧度
     * @param counterclockwise 可选，指定弧度的方向是逆时针还是顺时针，默认为 false。
     */
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: number): void;
    /**
     * 创建三次方贝塞尔曲线路径。
     * 曲线的起始点为路径中前一个点。
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    /**
     * 将当前创建的路径设置为当前剪切路径。
     */
    clip(): void;
    /**
     * 创建二次贝塞尔曲线路径。
     * 曲线的起始点为路径中前一个点。
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    /**
     * 在调用scale方法后，之后创建的路径其横纵坐标会被缩放。多次调用scale，倍数会相乘。
     */
    scale(scaleWidth: number, scaleHeight: number): void;
    /**
     * 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
     */
    rotate(rotate: number): void;
    /**
     * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
     */
    translate(x: number, y: number): void;
    /**
     * 设置字体大小。
     */
    setFontSize(fontSize: number): void;
    /**
     * 在画布上绘制被填充的文本。
     */
    fillText(text: string, x: number, y: number): void;
    /**
     * 绘制图像，图像保持原始尺寸。
     *
     * @param imageResource 图片资源, 只支持线上 cdn 地址或离线包地址，线上 cdn 需返回头 Access-Control-Allow-Origin: *
     */
    drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;
    /**
     * 设置全局画笔透明度。
     */
    setGlobalAlpha(alpha: number): void;
    /**
     * 设置虚线的样式
     *
     * @param segments 一组描述交替绘制线段和间距（坐标空间单位）长度的数字。如果数组元素的数量是奇数，数组的元素会被复制并重复。例如，[5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
     */
    setLineDash(segments: number[]): void;
    /**
     * 使用矩阵多次叠加当前变换的方法，矩阵由方法的参数进行描述。你可以缩放、旋转、移动和倾斜上下文。
     */
    transform(scaleX: number, skewX: number, skewY: number, scaleY: number, translateX: number, translateY: number): void;
    /**
     * 使用单位矩阵重新设置（覆盖）当前的变换并调用变换的方法，此变换由方法的变量进行描述。
     */
    setTransform(scaleX: number, skewX: number, skewY: number, scaleY: number, translateX: number, translateY: number): void;
    /**
     * 获取 canvas 区域隐含的像素数据。
     */
    getImageData(options: IGetImageDataOptions): void;
    /**
     * 将像素数据绘制到画布。
     */
    putImageData(options: IPutImageDataOptions): void;
    /**
     * 保存当前的绘图上下文。
     */
    save(): void;
    /**
     * 恢复之前保存的绘图上下文。
     */
    restore(): void;
    /**
     * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
     * 绘图上下文需要由 my.createCanvasContext(canvasId) 来创建。
     *
     * @param reserve 非必填。本次绘制是否接着上一次绘制，即 reserve 参数为 false 时则在本次调用 drawCanvas绘制之前 native 层应先清空画布再继续绘制；若 reserver 参数为true 时，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
     * @param callback 绘制完成后执行的回调函数。
     */
    draw(reserve?: boolean, callback?: () => void): void;
    /**
     * 测量文本尺寸信息，目前仅返回文本宽度。同步接口。
     */
    measureText(text: string): { width: number };
  }

  /**
   * 创建 canvas 绘图上下文。
   * 该绘图上下文只作用于对应 canvasId 的 <canvas/>
   */
  function createCanvasContext(canvasId: string): ICanvasContext;
}
