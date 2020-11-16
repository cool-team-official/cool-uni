<template>
	<view class="cl-card">
		<view class="cl-card__header">
			<cl-text :size="28" bold :value="label"></cl-text>

			<view class="cl-card__more" v-if="showMore" @tap="toMore">
				<slot name="more">
					<cl-text :value="moreText" color="#777"></cl-text>
					<text class="cl-icon-arrow-right"></text>
				</slot>
			</view>
		</view>

		<view class="cl-card__container">
			<slot></slot>
		</view>

		<view class="cl-card__footer" v-if="$slots.footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		label: String,
		showMore: {
			type: Boolean,
			default: true,
		},
		moreText: {
			type: String,
			default: "查看更多",
		},
	},
	methods: {
		toMore() {
			this.$emit("more");
		},
	},
};
</script>
