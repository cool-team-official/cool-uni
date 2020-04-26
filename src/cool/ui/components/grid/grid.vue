<template>
	<view
		class="cl-grid"
		:class="[
			{
				'cl-grid--border': border
			},
			`cl-grid__column-${column}`
		]"
		:style="{
			border
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
export default {
	componentName: 'ClGrid',

	props: {
		column: {
			type: Number,
			default: 2
		},
		border: Boolean
	}
};
</script>