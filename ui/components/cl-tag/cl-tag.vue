<template>
	<view
		class="cl-tag"
		:class="[
			`cl-tag--${type}`,
			`cl-tag--${size}`,
			{
				'is-plain': plain,
				'is-round': round,
			},
		]"
		:style="{
			backgroundColor: color,
			margin: parseRpx(margin),
		}"
		@click="tap"
		v-if="visible"
	>
		<slot></slot>
		<text class="cl-tag__close cl-icon-close" v-if="closable" @tap.stop="close"></text>
	</view>
</template>

<script lang="ts">
/**
 * @description 用于标记和选择
 * @property {String} type 类型 (primary | success | error | warning | info)
 * @property {Boolean} plain 图片裁剪、缩放的模式
 * @property {String} size 图片大小 (default | small)，默认default
 * @property {Boolean} closable 是否可关闭
 * @property {Boolean} round 是否圆角
 * @property {String} color 颜色值
 * @event {Function} click 点击时触发
 * @event {Function} close 关闭时触发
 */

import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import { useTap } from "../../hook";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-tag",

	props: {
		type: {
			type: String as PropType<"primary" | "success" | "error" | "warning" | "info">,
			default: "primary",
		},
		plain: Boolean,
		size: {
			type: String as PropType<"default" | "small" | "larget">,
			default: "default",
		},
		color: String,
		closable: Boolean,
		round: Boolean,
		margin: [String, Number, Array],
	},

	setup(_, { emit }) {
		const { tap } = useTap(emit);

		// 是否可见
		const visible = ref(true);

		// 打开
		function open() {
			visible.value = true;
		}

		// 关闭
		function close() {
			visible.value = false;
			emit("close");
		}

		return {
			visible,
			tap,
			open,
			close,
			parseRpx,
		};
	},
});
</script>
