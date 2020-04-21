/**
 * @file 刷脸认证
 */
declare namespace my {
  interface IFaceVerifySuccessResult {
    /**
     * 刷脸认证标识
     */
    readonly zimId: string;

    /**
     * 刷脸认证结果返回码
     *
     * - 1000：刷脸认证成功
     * - 1001：系统错误
     * - 1003：验证中断
     * - 2002：网络错误
     * - 2006：刷脸失败
     */
    readonly faceRetCode?: '1000' | '1001' | '1003' | '2002' | '2006';

    /**
     * 认证可用性返回码
     *
     * - OK_SUCCESS：刷脸可用性判断通过，代表刷脸功能可用
     * - SYSTEM_ERROR：系统错误
     * - ACCOUNT_SERVICE_SUSPEND：用户不可用刷脸
     * - HIGH_RISK：刷脸失败次数过多，请稍候再试
     * - DEVICE_NOT_SUPPORT：设备不支持刷脸
     * - OS_NOT_SUPPORT：手机操作系统不支持刷脸
     * - SDKVERSION_NOT_SUPPORT：SDK版本不支持
     * - ASSET_NOT_AVAILABLE：刷脸资源未准备好
     * - UNABLE_GET_IMAGE：比对源不可用
     * - ALG_NOT_SUPPORT：算法不支持
     * - NOT_REAL_NAME：非实名认证用户
     */
    readonly retCode: 'OK_SUCCESS' | 'SYSTEM_ERROR' | 'ACCOUNT_SERVICE_SUSPEND' | 'HIGH_RISK' | 'DEVICE_NOT_SUPPORT'
      | 'OS_NOT_SUPPORT' | 'SDKVERSION_NOT_SUPPORT' | 'ASSET_NOT_AVAILABLE' | 'UNABLE_GET_IMAGE'
      | 'ALG_NOT_SUPPORT' | 'NOT_REAL_NAME';

    /**
     * 认证可用性返回码明细
     */
    readonly retCodeSub: string;

    /**
     * 认证可用性结果描述
     */
    readonly retMessageSub?: string;
  }

  interface IFaceVerifyOptions {
    /**
     * 业务流水号，需要保证唯一性，不超过64位
     */
    bizId: string;

    /**
     * 填写 2，代表刷脸认证场景
     */
    bizType: string;

    /**
     * 是否使用后置摄像头，true为使用后置摄像头；不设置时，默认使用前置摄像头
     */
    useBackCamera?: boolean;

    /**
     * 调用成功的回调函数 (返回刷脸调用结果，包括刷脸认证成功和失败的结果)
     */
    success?(res: IFaceVerifySuccessResult): void;

    /**
     * 调用失败的回调函数 （返回小程序框架系统错误）
     */
    fail?(error: any): void;
  }

  namespace ap {
    /**
     * 该接口通过活体检测和人脸比对技术，认证当前用户是否为登陆支付宝用户的本人和真人。
     */
    function faceVerify(options: IFaceVerifyOptions): void;
  }
}
