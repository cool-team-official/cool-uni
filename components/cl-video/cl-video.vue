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

<script>
export default {
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

	watch: {
		src: {
			immediate: true,
			handler(val) {
				if (val) {
					this.ctx = uni.createVideoContext("video", this);
				}
			}
		}
	},

	methods: {
		play() {
			this.ctx.play();
		},

		pause() {
			this.ctx.pause();
		},

		stop() {
			this.ctx.stop();
		},

		onPlay(e) {
			this.$emit("play", e);
		},

		onPause(e) {
			this.$emit("pause", e);
		},

		onEnded(e) {
			this.$emit("ended", e);
		},

		onTimeUpdate(e) {
			this.$emit("timeupdate", e);
		},

		onWaiting(e) {
			this.$emit("waiting", e);
		},

		onError2(e) {
			this.$emit("error", e);
		},

		onProgress(e) {
			this.$emit("progress", e);
		},

		onLoadedMetaData(e) {
			this.$emit("loadedmetadata", e);
		},

		onFullScreenClick(e) {
			this.$emit("fullscreenclick", e);
		},

		onControlStoggle(e) {
			this.$emit("controlstoggle", e);
		}
	}
};
</script>
