<template>
    <cl-popup v-model="visible" direction="bottom" :padding="0" :z-index="1000">
        <view class="cl-share-popup">
            <cl-share
                :qq="conf.qq"
                :wx="conf.wx"
                :text="conf.text"
                :type="conf.type"
                :title="conf.title"
                :summary="conf.summary"
                :href="conf.href"
                :image-url="conf.imageUrl"
                :mediaUrl="conf.mediaUrl"
                :mini-program="conf.miniProgram"
                @success="onSuccess"
                @fail="onFail"
                @choose="close"
            ></cl-share>
        </view>
    </cl-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
    name: "cl-share-popup",

    setup() {
        // 是否显示
        const visible = ref(false)

        // 配置
        const conf = reactive<any>({})

        // 打开
        function open(options: ClShare.Options) {
            Object.assign(conf, { qq: true, wx: true, type: 0 }, options)
            visible.value = true
        }

        // 关闭
        function close() {
            visible.value = false
        }

        // 分享成功
        function onSuccess() {
            if (conf.success) {
                conf.success()
            }
        }

        // 分享失败
        function onFail(err: any) {
            if (conf.fail) {
                console.error("分享失败", err)
                conf.fail(err)
            }
        }

        return {
            visible,
            conf,
            open,
            close,
            onSuccess,
            onFail
        }
    }
})
</script>
