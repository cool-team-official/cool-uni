<template>
	<view class="cl-timeline">
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-timeline",

	props: {
		// 左侧时间宽度
		timestampWidth: {
			type: Number,
			default: 150,
		},
	},
});
</script>
