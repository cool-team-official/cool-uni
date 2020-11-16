<template>
	<view
		class="cl-waterfall"
		:style="{
			columnCount,
			columnGap,
		}"
	>
		<!-- 纵向 -->
		<template v-if="direction === 'vertical'">
			<view class="cl-waterfall__item" v-for="(item, index) in list" :key="index">
				<slot :item="item" :index="index"></slot>
			</view>
		</template>

		<!-- 横向 -->
		<template v-else-if="direction === 'horizontal'">
			<view
				v-for="(col, colIndex) in list"
				:key="colIndex"
				:class="['cl-waterfall__col']"
				:style="{
					width: `calc(${100 / column}% - ${gutter}rpx)`,
					margin: `0 ${gutter / 2}rpx`,
				}"
			>
				<view
					v-for="(row, rowIndex) in col"
					:key="rowIndex"
					:class="['cl-waterfall__row']"
					:style="{
						marginBottom: `${gutter}rpx`,
					}"
				>
					<slot :item="row" :index="rowIndex" :col-index="colIndex"></slot>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	props: {
		value: Array,
		column: {
			type: Number,
			default: 2,
		},
		gutter: {
			type: Number,
			default: 20,
		},
		direction: {
			type: String,
			default: "horizontal", // horizontal, vertical
		},
	},

	data() {
		return {
			list: [],
		};
	},

	watch: {
		column() {
			this.refresh(this.value);
		},
	},

	computed: {
		columnCount() {
			return this.direction === "vertical" ? this.column : "none";
		},

		columnGap() {
			return this.direction === "vertical" ? `${this.gutter}rpx` : "none";
		},
	},

	mounted() {
		this.refresh(this.value);
	},

	methods: {
		refresh(list) {
			switch (this.direction) {
				case "horizontal":
					this.list = new Array(this.column).fill(1).map(() => []);
					this.append(list);
					break;
				case "vertical":
					this.list = list;
					break;
			}
		},

		append(list) {
			this.$nextTick(async () => {
				for (let i in list) {
					const next = () => {
						return new Promise((resolve, reject) => {
							let selector = uni.createSelectorQuery().in(this);
							selector
								.selectAll(`.cl-waterfall__col`)
								.boundingClientRect((res) => {
									let colsHeight = res.map((e) => e.height);
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

		update(id, data) {
			const next = (e) => {
				let d = e.id === id;

				if (d) {
					Object.assign(e, data);
				}

				return Boolean(d);
			};

			switch (this.direction) {
				case "horizontal":
					this.list.find((col) => {
						return col.find(next);
					});
					break;
				case "vertical":
					this.list.find(next);
					break;
			}
		},

		clear() {
			this.list = [];
		},
	},
};
</script>
