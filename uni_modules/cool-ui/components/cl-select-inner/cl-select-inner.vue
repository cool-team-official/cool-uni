<template>
	<view
		class="cl-select-inner"
		:class="[
			{
				'is-disabled': isDisabled,
				'is-round': round,
				'is-border': border,
			},
		]"
		:style="[baseStyle]"
	>
		<slot>
			<view class="cl-select-inner__value">
				{{ text }}
				<text class="cl-select-inner__placeholder" v-if="!text">
					{{ placeholder }}
				</text>
			</view>

			<text class="cl-select-inner__icon" :class="[arrowIcon]" v-if="arrowIcon"></text>
		</slot>
	</view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useForm, useStyle } from "../../hooks";
import { Props } from "./config";

export default defineComponent({
	props: {
		...Props,

		// 显示文本
		text: String,
	},

	setup(props) {
		const { disabled } = useForm();

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		return {
			isDisabled,
			...useStyle({
				padding: "0 20rpx",
			}),
		};
	},
});
</script>
