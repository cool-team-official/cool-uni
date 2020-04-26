<template>
	<view class="demo-waterfall">
		<cl-waterfall ref="waterfall" :value="list" :column="2" :gutter="20">
			<template v-slot="{ item }">
				<view :class="['h', `h-${item}`]">
					{{ item }}
				</view>
			</template>
		</cl-waterfall>

		<cl-loadmore :loading="loading" :finish="finish"></cl-loadmore>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			loading: false,
			finish: false,
			page: 1
		};
	},

	created() {
		this.list = this.rdList();
	},

	onReachBottom() {
		this.append();
	},

	methods: {
		append() {
			this.loading = true;

			if (this.page > 3) {
				this.finish = true;
			} else {
				this.page += 1;

				setTimeout(() => {
					this.$refs['waterfall'].append(this.rdList());
					this.loading = false;
				}, 1500);
			}
		},

		rdList() {
			return new Array(10).fill(1).map(() => {
				return parseInt(Math.random() * 10) + 1;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-waterfall {
	.h {
		width: 100%;
		background-color: #e5e9f2;
		border-radius: 6rpx;
		padding: 10rpx;
		box-sizing: border-box;
		word-break: break-all;

		image {
			display: block;
			height: auto;
			width: 100%;
		}
	}

	@for $i from 0 through 10 {
		.h-#{$i} {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			padding: 20rpx;
			box-sizing: border-box;
			height: 60rpx * $i;
			width: 100%;
			background-color: #e5e9f2;
			border-radius: 6rpx;
		}
	}
}
</style>
