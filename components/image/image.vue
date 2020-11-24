<template>
	<view
		class="cl-image"
		:style="{
			height: size2[0],
			width: size2[1],
		}"
		:class="[
			{
				'is-round': round,
			},
		]"
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
import { isNumber, isArray, isString, parseRpx } from "../../utils";

export default {
	name: "cl-image",
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
			type: [String, Number, Array],
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
		size2() {
			let size = ["100%", "100%"];

			if (isString(this.size) || isNumber(this.size)) {
				size = [this.size, this.size];
			} else if (isArray(this.size)) {
				size = this.size;
			}

			return size.map(parseRpx);
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
