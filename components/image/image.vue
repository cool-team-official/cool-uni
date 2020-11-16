<template>
	<view
		:style="{
			height: height2 || size2,
			width: width2 || size2,
		}"
		:class="['cl-image', isRound]"
		@tap.stop="onPreview"
	>
		<slot name="placeholder" v-if="!src">
			<view class="cl-image__placeholder">
				<text class="cl-icon-image"></text>
			</view>
		</slot>

		<slot name="error" v-else-if="isError">
			<view class="cl-image__error"> 加载失败 </view>
		</slot>

		<image
			class="cl-image__target"
			:src="src"
			:mode="mode"
			:lazy-load="lazyLoad"
			:webp="webp"
			:show-menu-by-longpress="showMenuByLongpress"
			@error="handleError"
			@load="handleLoad"
		></image>
	</view>
</template>

<script>
import { isNumber } from "../../utils";
import Style from "../../mixins/style";

export default {
	name: "cl-image",
	mixins: [Style],
	props: {
		src: String,
		mode: String,
		lazyLoad: Boolean,
		fadeShow: {
			type: Boolean,
			default: true,
		},
		webp: Boolean,
		showMenuByLongpress: Boolean,
		size: {
			type: [String, Number],
			default: "100%",
		},
		round: Boolean,
		previewList: Array,
	},
	data() {
		return {
			isError: null,
		};
	},
	computed: {
		isRound() {
			return this.round ? "cl-image--round" : "";
		},
		size2() {
			return this.parse_rpx(this.size);
		},
	},
	methods: {
		handleError(e) {
			this.isError = true;
			this.$emit("error", e);
		},

		handleLoad(e) {
			this.isError = false;
			this.$emit("load", e);
		},

		onPreview() {
			if (this.previewList) {
				uni.previewImage({
					urls: this.previewList,
					current: this.src,
				});
			}
		},
	},
};
</script>
