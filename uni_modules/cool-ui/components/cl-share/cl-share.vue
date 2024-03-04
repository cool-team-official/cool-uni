<template>
    <view class="cl-share">
        <view class="cl-share__title">{{ text }}</view>

        <view class="cl-share__container">
            <!-- #ifdef APP -->
            <button class="item" @tap="shareQQ" v-if="qq">
                <image src="./qq.png" mode="aspectFit" />
                <text>QQ好友</text>
            </button>

            <button class="item" @tap="shareWx('WXSceneTimeline')" v-if="wx">
                <image src="./wx2.png" mode="aspectFit" />
                <text>朋友圈</text>
            </button>
            <!-- #endif -->

            <button class="item" open-type="share" @tap="shareWx('WXSceneSession')" v-if="wx">
                <image src="./wx.png" mode="aspectFit" />
                <text>微信好友</text>
            </button>
        </view>
    </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "cl-share",

    props: {
        type: {
            type: null,
            default: 0
        },
        imageUrl: String,
        title: String,
        summary: String,
        href: String,
        mediaUrl: String,
        miniProgram: Object,
        text: {
            type: String,
            default: "分享至"
        },
        qq: {
            type: Boolean,
            default: true
        },
        wx: {
            type: Boolean,
            default: true
        }
    },

    emits: ["choose", "success", "error"],

    setup(props, { emit }) {
        function share() {
            uni.shareWithSystem({
                type: props.type,
                href: props.href,
                summary: props.summary,
                imageUrl: props.imageUrl,
                success: () => {
                    emit("success")
                },
                fail: (err: any) => {
                    emit("error", err)
                }
            })
        }

        function shareWx(scene: any) {
            choose("wx")

            uni.share({
                provider: "weixin",
                type: props.type,
                title: props.title,
                scene,
                summary: props.summary,
                href: props.href,
                imageUrl: props.imageUrl,
                mediaUrl: props.mediaUrl,
                miniProgram: props.miniProgram,
                success: () => {
                    emit("success")
                },
                fail: (err) => {
                    console.error(err)
                    share()
                }
            })
        }

        function shareQQ() {
            choose("qq")

            uni.share({
                provider: "qq",
                type: props.type,
                title: props.title,
                summary: props.summary,
                href: props.href,
                imageUrl: props.imageUrl,
                mediaUrl: props.mediaUrl,
                miniProgram: props.miniProgram,
                success: () => {
                    emit("success")
                },
                fail: () => {
                    share()
                }
            })
        }

        function choose(name: string) {
            emit("choose", name)
        }

        return {
            shareWx,
            shareQQ,
            share
        }
    }
})
</script>
