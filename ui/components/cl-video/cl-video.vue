<template>
    <video
        class="cl-video"
        id="video"
        :src="src"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        :initial-time="initialTime"
        :duration="duration"
        :controls="controls"
        :danmu-list="danmuList"
        :danmu-btn="danmuBtn"
        :enable-danmu="enableDanmu"
        :page-gesture="pageGesture"
        :direction="direction"
        :show-progress="showProgress"
        :show-fullscreen-btn="showFullscreenBtn"
        :show-play-btn="showPlayBtn"
        :show-center-play-btn="showCenterPlayBtn"
        :show-loading="showLoading"
        :enable-progress-gesture="enableProgressGesture"
        :object-fit="objectFit"
        :poster="poster"
        :show-mute-btn="showMuteBtn"
        :title="title"
        :play-btn-position="playBtnPosition"
        :enable-play-gesture="enablePlayGesture"
        :auto-pause-if-navigate="autoPauseIfNavigate"
        :auto-pause-if-open-native="autoPauseIfOpenNative"
        :vslide-gesture="vslideGesture"
        :vslide-gesture-in-fullscreen="vslideGestureInFullscreen"
        :ad-unit-id="adUnitId"
        :poster-for-crawler="posterForCrawler"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        @timeupdate="onTimeUpdate"
        @waiting="onWaiting"
        @error="onError2"
        @progress="onProgress"
        @loadedmetadata="onLoadedMetaData"
        @fullscreenclick="onFullScreenClick"
        @controlstoggle="onControlStoggle"
    ></video>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, watch } from "vue"

export default defineComponent({
    name: "cl-video",

    props: {
        src: String,
        autoplay: Boolean,
        loop: Boolean,
        muted: Boolean,
        initialTime: Number,
        duration: Number,
        controls: {
            type: Boolean,
            default: true
        },
        danmuList: [Object, Array],
        danmuBtn: Boolean,
        enableDanmu: Boolean,
        pageGesture: Boolean,
        direction: Number,
        showProgress: {
            type: Boolean,
            default: true
        },
        showPlayBtn: {
            type: Boolean,
            default: true
        },
        showCenterPlayBtn: {
            type: Boolean,
            default: true
        },
        showLoading: {
            type: Boolean,
            default: true
        },
        showFullscreenBtn: {
            type: Boolean,
            default: true
        },
        enableProgressGesture: {
            type: Boolean,
            default: true
        },
        objectFit: {
            type: String,
            default: "contain"
        },
        poster: String,
        showMuteBtn: Boolean,
        title: String,
        playBtnPosition: {
            type: String,
            default: "bottom"
        },
        enablePlayGesture: Boolean,
        autoPauseIfNavigate: {
            type: Boolean,
            default: true
        },
        autoPauseIfOpenNative: {
            type: Boolean,
            default: true
        },
        vslideGesture: Boolean,
        vslideGestureInFullscreen: {
            type: Boolean,
            default: true
        },
        adUnitId: String,
        posterForCrawler: String
    },

    setup(props, { emit }) {
        const { proxy }: any = getCurrentInstance()

        // 视频对象
        let ctx: any = null

        watch(
            () => props.src,
            () => {
                ctx = uni.createVideoContext("video", proxy)
            },
            {
                immediate: true
            }
        )

        function play() {
            ctx.play()
        }

        function pause() {
            ctx.pause()
        }

        function stop() {
            ctx.stop()
        }

        function onPlay(e: any) {
            emit("play", e)
        }

        function onPause(e: any) {
            emit("pause", e)
        }

        function onEnded(e: any) {
            emit("ended", e)
        }

        function onTimeUpdate(e: any) {
            emit("timeupdate", e)
        }

        function onWaiting(e: any) {
            emit("waiting", e)
        }

        function onError2(e: any) {
            emit("error", e)
        }

        function onProgress(e: any) {
            emit("progress", e)
        }

        function onLoadedMetaData(e: any) {
            emit("loadedmetadata", e)
        }

        function onFullScreenClick(e: any) {
            emit("fullscreenclick", e)
        }

        function onControlStoggle(e: any) {
            emit("controlstoggle", e)
        }

        return {
            play,
            pause,
            stop,
            onPlay,
            onPause,
            onEnded,
            onTimeUpdate,
            onWaiting,
            onError2,
            onProgress,
            onLoadedMetaData,
            onFullScreenClick,
            onControlStoggle
        }
    }
})
</script>
