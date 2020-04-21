declare namespace my {
  interface ILoadFontFaceOptions {
    /**
     * 字体名称
     */
    family: string;

    /**
     * 字体资源地址。
     * 目前只支持 woff，otf，ttf，sfnt 字体。
     * 支付宝小程序不支持woff2字体，原因是：
     * 1. 相对其他格式字体，对内存占用较高。
     * 2. 此字体支持对于内核so size有较大负担，目前支付宝使用的 u4 内核3.0 将woff2格式支持给裁剪了，导致无法正常显示，建议业务使用其他格式。
     */
    source: string;

    /**
     * 字体描述符
     */
    desc?: {
      /**
       * 字体样式
       */
      style?: 'normal' | 'italic' | 'oblique';

      /**
       * 字体粗细
       */
      weight?: 'normal' | 'bold' | '100' | '200' | '300'
        | '400' | '500' | '600' | '700' | '800' | '900';

      /**
       * 设置小型大写字母的字体显示文本
       */
      variant?: 'normal' | 'small-caps' | 'inherit';
    };

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  function loadFontFace(options: ILoadFontFaceOptions): void;
}
