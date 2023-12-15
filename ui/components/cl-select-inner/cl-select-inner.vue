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
		:style="{
			height: parseRpx(height),
			padding: parseRpx(padding),
			backgroundColor,
			borderRadius: parseRpx(borderRadius),
		}"
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
import { parseRpx } from "/@/cool/utils";
import { useForm } from "../../hook";

export default defineComponent({
	props: {
		text: String,
		height: [String, Number],
		placeholder: {
			type: String,
			default: "请选择",
		},
		disabled: {
			type: Boolean,
			default: null,
		},
		border: {
			type: Boolean,
			default: true,
		},
		round: {
			type: Boolean,
			default: null,
		},
		backgroundColor: String,
		borderRadius: [String, Number],
		arrowIcon: {
			type: String,
			default: "cl-icon-arrow-bottom",
		},
		padding: {
			type: [String, Number],
			default: "0 20rpx",
		},
	},

	setup(props) {
		const { disabled } = useForm();

		// 是否禁用
		const isDisabled = computed(() => disabled.value || props.disabled);

		return {
			isDisabled,
			parseRpx,
		};
	},
});
</script>
