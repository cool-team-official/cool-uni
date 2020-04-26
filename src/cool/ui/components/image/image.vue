<template>
	<view
		:style="{
			height: size2,
			width: size2
		}"
		:class="['cl-image', isRound]"
	>
		<slot name="placeholder" v-if="!src">
			<view class="cl-image__placeholder">
				<i class="cl-icon-image"></i>
			</view>
		</slot>

		<slot name="error" v-else-if="isError">
			<view class="cl-image__error">
				加载失败
			</view>
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
import { isNumber } from '../../utils';

export default {
	props: {
		src: String,
		mode: String,
		lazyLoad: Boolean,
		fadeShow: {
			type: Boolean,
			default: true
		},
		webp: Boolean,
		showMenuByLongpress: Boolean,
		size: {
			type: [String, Number],
			default: '100%'
		},
		round: Boolean
	},

	data() {
		return {
			isError: null
		};
	},

	computed: {
		isRound() {
			return this.round ? 'cl-image--round' : '';
		},
		size2() {
			return isNumber(this.size) ? this.size + 'rpx' : this.size;
		}
	},

	methods: {
		handleError(e) {
			this.isError = true;
			this.$emit('error', e);
		},

		handleLoad(e) {
			this.isError = false;
			this.$emit('load', e);
		}
	}
};
</script>
