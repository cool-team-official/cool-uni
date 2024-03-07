<template>
	<view
		class="cl-col"
		:class="[classList]"
		:style="{
			'padding-left': padding,
			'padding-right': padding,
		}"
		@click="tap"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useTap } from "../../hooks";
import { getParent } from "/@/cool/utils";

export default defineComponent({
	name: "cl-col",

	props: {
		// 栅格占据的列数
		span: {
			type: Number,
			default: 24,
		},
		// 栅格左侧的间隔格数
		offset: Number,
		// 栅格向右移动格数
		pull: Number,
		// 栅格向左移动格数
		push: Number,
	},

	setup(props, { emit }) {
		// <cl-row />
		const parent = getParent("cl-row", ["gutter"]);

		// 间距
		const padding = computed(() => (parent.value ? parent.value.gutter / 2 + "rpx" : 0));

		// 样式
		const classList = computed(() => {
			let list: string[] = [];
			const validProps: (keyof typeof props)[] = ["span", "offset", "pull", "push"];
			validProps.forEach((k) => {
				let value = props[k] as number;
				if (value || value === 0) {
					list.push(k !== "span" ? `cl-col-${k}-${value}` : `cl-col-${value}`);
				}
			});
			return list.join(" ");
		});

		return {
			classList,
			parent,
			padding,
			...useTap(emit),
		};
	},
});
</script>
