/**
 * @file 震动
 */
declare namespace my {
  interface IVibrateOptions {
    success(): void;
  }
  /**
   * 调用振动功能。
   */
  function vibrate(options: IVibrateOptions): void;

  interface IVibrateLongOptions {
    success(): void;
  }
  /**
   * 较长时间的振动 (400ms)。
   */
  function vibrateLong(options: IVibrateLongOptions): void;

  interface IVibrateShortOptions {
    success(): void;
  }
  /**
   * 较短时间的振动 (40ms)。
   */
  function vibrateShort(options: IVibrateShortOptions): void;
}
