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
/**
 * card 卡片
 * @description 卡片
 * @tutorial https://docs.cool-js.com/uni/components/layout/card.html
 * @property {String} label 标签内容
 * @property {Boolean} showMore 是否实现查看更多
 * @property {Boolean} moreText 更多的文本内容,默认"查看更多"
 * @event {Function} more 点击更多时触发
 * @example 见教程
 */

export default {
	name: "cl-card",

	props: {
		label: String,
		showMore: {
			type: Boolean,
			default: true
		},
		moreText: {
			type: String,
			default: "查看更多"
		}
	},

	methods: {
		toMore() {
			this.$emit("more");
		}
	}
};
</script>
