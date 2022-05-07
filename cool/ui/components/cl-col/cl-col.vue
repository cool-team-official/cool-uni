<template>
	<view
		class="cl-col"
		:class="[classList]"
		:style="{
			'padding-left': padding,
			'padding-right': padding,
		}"
		@tap="onTap"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
/**
 * @description 布局组件
 * @property {Number} span 栅格占据的列数
 * @property {Number} offset 栅格左侧的间隔格数
 * @property {Number} pull 栅格向右移动格数
 * @property {Number} push 栅格向左移动格数
 * @example <cl-col :span="12"></cl-col>
 */

import { computed, defineComponent } from "vue";
import { useEl } from "../../hook";

export default defineComponent({
	name: "cl-col",

	props: {
		span: {
			type: Number,
			default: 24,
		},
		offset: Number,
		pull: Number,
		push: Number,
	},

	emits: ["click", "tap"],

	setup(props, { emit }) {
		const { getParent } = useEl();

		// cl-row
		const parent = getParent("cl-row", ["gutter"]);

		// 间距
		const padding = computed(() => parent.value.gutter / 2 + "rpx");

		// 样式
		const classList = computed(() => {
			let list: string[] = [];
			["span", "offset", "pull", "push"].forEach((k: any) => {
				let value = props[k];
				if (value || value === 0) {
					list.push(k !== "span" ? `cl-col-${k}-${value}` : `cl-col-${value}`);
				}
			});
			return list.join(" ");
		});

		function onTap(e: any) {
			emit("click", e);
			emit("tap", e);
		}

		return {
			classList,
			parent,
			padding,
			onTap,
		};
	},
});
</script>
