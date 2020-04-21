<template>
	<view class="demo-swiper">
		<cl-card label="卡片式">
			<view class="cl-swiper--card">
				<swiper
					previous-margin="80rpx"
					next-margin="80rpx"
					circular
					indicator-dots
					autoplay
					@change="onChangeCard"
				>
					<swiper-item v-for="(item, index) in list" :key="index">
						<view :class="['cl-swiper-item', { active: index === active.card }]">{{
							item
						}}</view>
					</swiper-item>
				</swiper>
			</view>
		</cl-card>

		<cl-card label="链式">
			<view class="cl-swiper--chain">
				<swiper
					:previous-margin="chainPreviousMargin"
					:next-margin="chainNextMargin"
					@change="onChangeChain"
				>
					<swiper-item v-for="(item, index) in list" :key="index">
						<view :class="['cl-swiper-item']">{{ item }}</view>
					</swiper-item>
				</swiper>

				<view class="cl-swiper__labels">
					<view
						:class="['block', { active: index === active.chain }]"
						v-for="(item, index) in list"
						:key="index"
						>{{ item }}</view
					>
				</view>
			</view>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: {
				card: 0,
				chain: 0
			},
			list: [1, 2, 3, 4]
		};
	},

	computed: {
		chainPreviousMargin() {
			switch (this.active.chain) {
				case 0:
					return '20rpx';
				case 3:
					return '120rpx';
				default:
					return '70rpx';
			}
		},
		chainNextMargin() {
			switch (this.active.chain) {
				case 0:
					return '120rpx';
				case 3:
					return '20rpx';
				default:
					return '70rpx';
			}
		}
	},

	methods: {
		onChangeCard(e) {
			this.active.card = e.detail.current;
		},
		onChangeChain(e) {
			this.active.chain = e.detail.current;
		}
	}
};
</script>
