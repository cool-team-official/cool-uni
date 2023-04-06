<template>
	<view class="cl-tag" :class="tagClass" @tap="click" v-if="visible">
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
 * @event {Function} click 点击时触发
 * @event {Function} close 关闭时触发
 */

import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
	name: "cl-tag",

	props: {
		type: {
			type: String as PropType<"primary" | "success" | "error" | "warning" | "info">,
			default: "primary",
		},
		plain: Boolean,
		size: {
			type: String as PropType<"default" | "small">,
			default: "default",
		},
		closable: Boolean,
		round: Boolean,
	},

	setup(props, { emit }) {
		// 是否可见
		const visible = ref(true);

		// 样式
		const tagClass = computed(() => {
			let list = [];

			if (props.type) {
				list.push(`cl-tag--${props.type}`);
			}

			if (props.size) {
				list.push(`cl-tag--${props.size}`);
			}

			if (props.plain) {
				list.push("is-plain");
			}

			if (props.round) {
				list.push("is-round");
			}

			return list.join(" ");
		});

		// 点击
		function click() {
			emit("click");
			emit("tap");
		}

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
			tagClass,
			click,
			open,
			close,
		};
	},
});
</script>
