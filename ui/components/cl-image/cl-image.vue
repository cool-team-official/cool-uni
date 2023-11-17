<template>
	<view
		class="cl-image"
		:style="imgStyle"
		:class="[
			{
				'is-round': round,
				'is-error': !src || isError,
			},
		]"
		@tap.stop="onPreview"
	>
		<view class="cl-image__placeholder" v-if="!src">
			<slot name="placeholder">
				<text class="cl-icon-image"></text>
			</slot>
		</view>

		<view class="cl-image__error" v-else-if="isError">
			<slot name="error"> 加载失败 </slot>
		</view>

		<view class="cl-image__loading" v-if="isLoading">
			<cl-loading />
		</view>

		<image
			class="cl-image__target"
			:src="src"
			:mode="mode"
			:lazy-load="lazyLoad"
			:webp="webp"
			:show-menu-by-longpress="showMenuByLongpress"
			@error="handleError"
			@load="handleLoad"
		/>
	</view>
</template>

<script lang="ts">
/**
 * @description 该组件基于官方的 image 组件。参数与官方一致，同时添加新的支持。
 * @property {String} src 图片链接
 * @property {String} mode 图片裁剪、缩放的模式
 * @property {String, Number, Array} size 图片大小
 * @property {Boolean} round 是否圆角
 * @property {Number, String, Array} margin 外间距
 * @property {Array} previewList 预览列表
 * @event {Function} load 加载成功时触发
 * @event {Function} error 加载失败时触发
 */

import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { isNumber, isArray, isString } from "lodash-es";
import { useTap } from "../../hook";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-image",
	props: {
		src: String,
		mode: String,
		size: {
			type: [String, Number, Array],
			default: "100%",
		},
		round: Boolean,
		radius: [Number, String],
		margin: [Number, String, Array],
		previewCurrent: String,
		previewList: Array as PropType<string[]>,
		lazyLoad: Boolean,
		fadeShow: {
			type: Boolean,
			default: true,
		},
		webp: Boolean,
		showMenuByLongpress: Boolean,
		customStyle: Object,
	},

	setup(props, { emit }) {
		const { tap } = useTap(emit);

		// 是否加载失败
		const isError = ref(false);

		// 是否加载中
		const isLoading = ref(false);

		// 样式
		const imgStyle = computed(() => {
			const [height, width] = size.value;
			return {
				height,
				width,
				margin: parseRpx(props.margin),
				borderRadius: parseRpx(props.radius),
				...props.customStyle,
			};
		});

		// 尺寸
		const size = computed(() => {
			let size: any = ["100%", "100%"];

			if (isString(props.size) || isNumber(props.size)) {
				size = [props.size, props.size];
			} else if (isArray(props.size)) {
				size = props.size;
			}

			return size.map(parseRpx);
		});

		// 加载失败
		function handleError(e: any) {
			isError.value = true;
			isLoading.value = false;
			emit("error", e);
		}

		// 加载成功
		function handleLoad(e: any) {
			isError.value = false;
			isLoading.value = false;
			emit("load", e);
		}

		// 点击是否预览图片
		function onPreview() {
			if (props.previewList) {
				uni.previewImage({
					urls: props.previewList || [],
					current: props.previewCurrent || props.src,
				});
			}

			tap();
		}

		watch(
			() => props.src,
			(val) => {
				isLoading.value = !!val;
			},
			{
				immediate: true,
			}
		);

		return {
			isError,
			isLoading,
			size,
			imgStyle,
			handleError,
			handleLoad,
			onPreview,
			parseRpx,
		};
	},
});
</script>
