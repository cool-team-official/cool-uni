/**
 * @file 权限引导
 */
declare namespace my {
  type AuthType = 'BACKGROUNDER' | 'SHORTCUT' | 'MICROPHONE' | 'ADDRESSBOOK' | 'CAMERA'
    | 'PHOTO' | 'NOTIFICATION' | 'SELFSTARTING' | 'LBSSERVICE' | 'LBS';

  interface IShowAuthGuideOptions {
    /**
     * 引导的权限标识，用于标识该权限类型(如 LBS)
     *
     * - BACKGROUNDER：后台保活权限【Android】
     * - SHORTCUT：桌面快捷权限【Android】
     * - MICROPHONE：麦克风权限【iOS】
     * - ADDRESSBOOK：通讯录权限【iOS】
     * - CAMERA：相机权限【iOS】
     * - PHOTO：照片权限【iOS】
     * - NOTIFICATION：push通知栏权限【iOS】
     * - SELFSTARTING：自启动权限【Android】
     * - LBSSERVICE：lbs总开关【iOS】
     * - LBS：lbs开关(app)【iOS】
     */
    authType: AuthType;
  }

  /**
   * 通过权限引导模块以图文等形式向用户弹出 Dialog，引导用户打开相应的权限。
   * 权限引导的核心是引导而非权限判断，调用时机应该在业务方确认所需权限被限制的时候；此外权限引导弹框受疲劳度等因素控制。
   */
  function showAuthGuide(options: IShowAuthGuideOptions): void;
}
