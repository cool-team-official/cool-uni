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
			<slot></slot>
		</template>
	</view>
</template>

<script>
import { isEmpty } from "../../utils";

/**
 * waterfall 瀑布流
 * @description 瀑布流布局，自定义内容
 * @tutorial https://docs.cool-js.com/uni/components/layout/waterfall.html
 * @property {Array} value 数据列表
 * @property {Number} column 列的数量，默认2
 * @property {Number} gutter 列间隔，默认20
 * @property {String} direction 布局方向 horizontal | vertical，默认horizontal
 * @property {String} nodeKey 匹配值，默认 id
 * @example 见教程
 */

export default {
	name: "cl-waterfall",

	componentName: "ClWaterfall",

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
		nodeKey: {
			type: String,
			default: "id",
		},
	},

	data() {
		return {
			list: [],
		};
	},

	watch: {
		list: {
			handler(val) {
				this.$emit("input", val);
			},
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
		// 刷新列表
		refresh(list) {
			// 清空列表，清空 cl-waterfall-column 的组件遍历
			this.clear();

			this.$nextTick(() => {
				switch (this.direction) {
					case "horizontal":
						this.list = new Array(this.column).fill(1).map(() => []);

						// 等待 cl-waterfall-column 渲染完成后追加数据
						this.$nextTick(() => {
							this.append(list);
						});
						break;
					case "vertical":
						this.list = list;
						break;
				}
			});
		},

		// 计算高度，一个个往列表追加
		async append(list) {
			for (let i in list) {
				const next = async () => {
					const rects = await this.getRect();

					// 获取 cl-waterfall-column 的高度，比较后在最小的列中塞入
					return Promise.all(rects).then((res) => {
						let colsHeight = res.map((e) => e.height);
						let minH = Math.min(...colsHeight);
						let index = colsHeight.indexOf(minH);

						if (index < 0) {
							index = 0;
						}

						this.list[index].push(list[i]);

						return true;
					});
				};

				await next();
			}
		},

		// 更新单条数据，根据nodeKey来匹配
		update(id, data) {
			const next = (e) => {
				let d = e[this.nodeKey] === id;

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

		// 清空列表
		clear() {
			this.list = [];
		},

		// 获取列
		getRect() {
			// #ifdef MP || H5
			return new Promise((resolve) => {
				let timer = null;

				const fn = () => {
					// #ifdef H5
					let children = this.$children[0].$children;
					// #endif

					// #ifdef MP || APP
					let children = this.$children;
					// #endif

					if (isEmpty(children)) {
						timer = setTimeout(() => {
							fn();
						}, 50);
					} else {
						clearTimeout(timer);
						resolve(children.map((e) => e.getRect()));
					}
				};

				fn();
			});
			// #endif

			// #ifdef APP
			return new Promise((resolve) => {
				uni.createSelectorQuery()
					.selectAll(`.cl-waterfall-column`)
					.boundingClientRect(resolve)
					.exec();
			});
			// #endif
		},
	},
};
</script>
