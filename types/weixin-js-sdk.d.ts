namespace wx {
    // 微信 JS-SDK 配置对象
    interface Config {
        debug?: boolean
        appId: string
        timestamp: number
        nonceStr: string
        signature: string
        beta?: boolean
        jsApiList: string[]
    }

    // 微信 JS-SDK 全局对象
    interface WX {
        config(config: Config): void
        ready(callback: () => void): void
        error(callback: (error: any) => void): void

        // 具体的微信 JS-SDK API
        checkJsApi(params: CheckJsApiParams): void
        chooseImage(params: ChooseImageParams): void
        chooseWXPay(params: chooseWXPayParams): void
        // 添加其他 API 定义...
    }

    // 具体 API 的参数类型定义

    interface CheckJsApiParams {
        jsApiList: string[]
        success?(res: CheckJsApiResult): void
        fail?(error: any): void
        complete?(): void
    }

    interface CheckJsApiResult {
        [api: string]: boolean
    }

    interface ChooseImageParams {
        count?: number
        sizeType?: string[]
        sourceType?: string[]
        success?(res: ChooseImageResult): void
        fail?(error: any): void
        complete?(): void
    }
    interface chooseWXPayParams {
        timestamp?: number
        nonceStr?: string
        package?: string
        signType?: string
        paySign?: string
        success?(res: ChooseImageResult): void
        fail?(error: any): void
        complete?(): void
    }

    interface ChooseImageResult {
        localIds: string[]
        errMsg: string
    }

    // 添加其他 API 参数类型定义...
}

declare module 'weixin-js-sdk' {
    const wx: wx.WX
    export = wx
}
