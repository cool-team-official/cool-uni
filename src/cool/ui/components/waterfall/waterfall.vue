<template>
	<view class="cl-waterfall">
		<view
			v-for="(col, colIndex) in list"
			:key="colIndex"
			:class="['cl-waterfall__col']"
			:style="{
				width: `calc(${100 / column}% - ${gutter}rpx)`,
				margin: `0 ${gutter / 2}rpx`
			}"
		>
			<view
				v-for="(row, rowIndex) in col"
				:key="rowIndex"
				:class="['cl-waterfall__row']"
				:style="{
					marginBottom: `${gutter}rpx`
				}"
			>
				<slot :item="row"></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: Array,
		column: {
			type: Number,
			default: 2
		},
		gutter: {
			type: Number,
			default: 20
		}
	},

	data() {
		return {
			list: []
		};
	},

	watch: {
		value(val) {
			this.refresh(val);
		}
	},

	mounted() {
		this.refresh(this.value);
	},

	methods: {
		refresh(list) {
			this.list = new Array(this.column).fill(1).map(() => []);
			this.append(list);
		},

		append(list) {
			this.$nextTick(async () => {
				for (let i in list) {
					const next = () => {
						return new Promise((resolve, reject) => {
							let selector = uni.createSelectorQuery().in(this);
							selector
								.selectAll(`.cl-waterfall__col`)
								.boundingClientRect(res => {
									let colsHeight = res.map(e => e.height);
									let minH = Math.min(...colsHeight);
									let index = colsHeight.indexOf(minH);
									if (index < 0) {
										index = 0;
									}
									this.list[index].push(list[i]);

									setTimeout(() => {
										resolve();
									}, 0);
								})
								.exec();
						});
					};

					await next();
				}
			});
		},

		clear() {
			this.list = [];
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-waterfall {
	padding: 20rpx 10rpx;
	overflow: hidden;
	width: 100%;
	box-sizing: border-box;

	&__col {
		float: left;
	}
}
</style>
