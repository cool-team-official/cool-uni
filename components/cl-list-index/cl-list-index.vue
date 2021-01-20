<template>
	<view class="cl-li">
		<!-- 搜索栏 -->
		<view class="cl-li__search" v-if="filterable">
			<cl-input
				v-model="keyWord"
				:border="false"
				prefix-icon="cl-icon-search"
				round
				placeholder="搜索关键字"
				clearable
				@search="onSearch"
			></cl-input>
		</view>

		<!-- 滚动视图 -->
		<scroll-view
			class="cl-li__scroller"
			scroll-y
			enable-back-to-top
			scroll-with-animation
			:scroll-into-view="`index-${label}`"
			@scroll="onScroll"
		>
			<template v-for="(item, index) in flist">
				<view class="cl-li__group" :key="index" :id="`index-${item.label}`">
					<!-- 关键字 -->
					<view :class="['cl-li__header', curr.label == item.label ? 'is-active' : '']">
						<!-- 头部插槽 -->
						<slot name="header" :item="item" :isActive="curr.label == item.label">
							<text>{{ item.label }}</text>
						</slot>
					</view>
					<!-- 数据列表 -->
					<view class="cl-li__container">
						<template v-for="(item2, index2) in item.children">
							<view class="cl-li__item" :key="index2" @tap="selectRow(item2)">
								<!-- 内容插槽 -->
								<slot :item="item2" :parent="item">
									<cl-avatar :src="item2.avatarUrl"></cl-avatar>
									<cl-text :margin="[0, 0, 0, 20]" :value="item2.name"></cl-text>
								</slot>
							</view>
						</template>
					</view>
				</view>
			</template>
		</scroll-view>

		<!-- 索引栏 -->
		<view class="cl-li__bar" @touchmove.stop="barMove" @touchend="barEnd">
			<view class="cl-li__bar-list" @touchmove.stop="barMove" @touchend="barEnd">
				<template v-for="(item, index) in flist">
					<view
						:class="['cl-li__bar-block', curr.label == item.label ? 'is-active' : '']"
						:key="index"
						:id="index"
						@touchstart="toRow(item)"
					>
						<text>{{ item.label }}</text>
					</view>
				</template>
			</view>
		</view>

		<!-- 索引关键字 -->
		<view class="cl-li__alert" v-show="alert">{{ curr.label }}</view>
	</view>
</template>

<script>
import { last } from "../../utils";

/**
 * list-index 索引列表
 * @description 索引列表, 支持自定义内容
 * @tutorial https://docs.cool-js.com/uni/components/advanced/list-index.html
 * @property {Number} index 序号
 * @property {Array} list 列表数据
 * @property {Boolean} filterable 是否带有过滤栏，默认true
 * @event {Function} change 发生改变时触发
 * @event {Function} search 搜索时触发，function(keyword)
 * @event {Function} select 选择行时触发，function(item)
 * @example 见教程
 */

export default {
	name: "cl-list-index",

	props: {
		// 序号
		index: {
			type: Number,
			default: 0,
		},
		// 列表数据
		list: Array,
		// 是否带有过滤栏
		filterable: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			keyWord: "",
			label: "",
			alert: false,
			curr: {},
			bar: {
				top: 0,
				itemH: 0,
			},
			tops: [],
		};
	},

	watch: {
		index: {
			immediate: true,
			handler: "setData",
		},

		curr: {
			handler(val) {
				this.$emit("change", val);
			},
		},
	},

	computed: {
		flist() {
			const match = (d) => (d ? d.name.includes(this.keyWord) : false);

			return this.list
				.filter((e) => e.children && e.children.find(match))
				.map((e) => {
					e.children = e.children.filter(match);
					return e;
				});
		},
	},

	mounted() {
		this.doLayout();
	},

	methods: {
		onSearch(val) {
			this.$emit("search", val);
		},

		onScroll(e) {
			let top = e.detail.scrollTop;
			let num = this.tops.filter((e) => top >= e - 60).length - 1;

			if (num < 0) {
				num = 0;
			}

			this.curr = this.list[num];
		},

		// 选择行
		selectRow(item) {
			this.$emit("select", item);
		},

		// 根据序号设置选择数据
		setData(index) {
			this.curr = this.list[index] || {};
			this.label = this.curr.label;
		},

		toRow(e) {
			this.alert = true;
			this.curr = e;
		},

		barMove(e) {
			const max = this.list.length;
			let index = parseInt((e.touches[0].clientY - this.bar.top) / this.bar.itemH);

			if (index >= max) {
				index = max - 1;
			}

			if (index < 0) {
				index = 0;
			}

			this.curr = this.list[index];
		},

		barEnd() {
			this.label = this.curr.label;
			this.alert = false;
		},

		doLayout() {
			this.$nextTick(() => {
				// 获取索引栏大小
				uni.createSelectorQuery()
					.in(this)
					.select(`.cl-li__bar-list`)
					.boundingClientRect((res) => {
						this.bar.top = res.top;
						this.bar.itemH = parseInt(res.height / this.list.length);
					})
					.exec();

				// 获取当前距离顶部的高度
				uni.createSelectorQuery()
					.in(this)
					.select(".cl-li")
					.boundingClientRect((res) => {
						// 获取每项距离顶部的高度
						uni.createSelectorQuery()
							.in(this)
							.selectAll(".cl-li__header")
							.fields({ rect: true })
							.exec((d) => {
								this.tops = d[0].map((e) => e.top - res.top);
							});
					})
					.exec();
			});
		},
	},
};
</script>
