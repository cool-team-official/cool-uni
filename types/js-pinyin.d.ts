namespace pinyinJs {
    interface pinyin {
        getCamelChars(str: string): string[]
        getFullChars(str: string): string
    }
}

declare module 'js-pinyin' {
    const pinyin: pinyinJs.pinyin
    export = pinyin
}
