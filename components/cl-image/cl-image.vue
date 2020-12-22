<template>
	<view
		class="cl-image"
		:style="{
			height: size2[0],
			width: size2[1],
		}"
		:class="[classList]"
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

/**
 * image 图片
 * @description 该组件基于官方的 image 组件。参数与官方一致，同时添加新的支持。
 * @tutorial https://docs.cool-js.com/uni/components/basic/image.html
 * @property {String} src 图片链接
 * @property {String} mode 图片裁剪、缩放的模式
 * @property {String, Number, Array} size 图片大小
 * @property {Boolean} round 是否圆角
 * @property {Array} previewList 预览列表
 * @event {Function} load 加载成功时触发
 * @event {Function} error 加载失败时触发
 * @example <cl-image src="https://" />
 */

export default {
	name: "cl-image",
	props: {
		// 图片链接
		src: String,
		// 图片裁剪、缩放的模式
		mode: String,
		// 图片大小
		size: {
			type: [String, Number, Array],
			default: "100%",
		},
		// 是否圆角
		round: Boolean,
		// 预览列表
		previewList: Array,
		lazyLoad: Boolean,
		fadeShow: {
			type: Boolean,
			default: true,
		},
		webp: Boolean,
		showMenuByLongpress: Boolean,
	},
	data() {
		return {
			isError: null,
		};
	},
	computed: {
		classList() {
			let list = [];

			if (this.round) {
				list.push("is-round");
			}

			return list.join(" ");
		},
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
			// 点击是否预览图片
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
