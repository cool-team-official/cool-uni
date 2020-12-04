<template>
	<view
		class="cl-filter-bar"
		:class="[
			{
				'is-sticky': isSticky,
			},
		]"
	>
		<view class="cl-filter-bar-sort">
			<view
				class="cl-filter-bar-sort__field"
				v-for="(item, index) in list2"
				:key="index"
				:class="{
					'is-active': item.value == prop,
				}"
				@tap="changeOrder(item)"
			>
				<text class="cl-filter-bar-sort__label">{{ item.label }}</text>

				<view
					class="cl-filter-bar-sort__order"
					:class="[`is-${item.order}`]"
					v-if="item.order !== undefined"
				>
					<text class="cl-filter-bar-sort__asc"></text>
					<text class="cl-filter-bar-sort__desc"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * filter-bar 过滤栏
 * @description 字段升序降序,综合评分
 * @tutorial https://docs.cool-js.com/uni/components/advanced/filterbar.html
 * @property {String} value 绑定值
 * @property {Array} list 列表数据
 * @property {Boolean} isSticky 是否吸顶
 * @event {Function} change 绑定值发生改变时触发
 * @example 见教程
 */

export default {
	name: "cl-filter-bar",

	props: {
		// 绑定值
		value: String,
		// 列表数据
		list: Array,
		// 是否吸顶
		isSticky: Boolean,
	},

	data() {
		return {
			prop: this.value,
			list2: this.list,
		};
	},

	methods: {
		changeOrder(item) {
			if (item.order !== undefined) {
				this.prop = item.value;

				if (!item.order) {
					item.order = "asc";
				} else if (item.order == "asc") {
					item.order = "desc";
				} else if (item.order == "desc") {
					item.order = "";
					this.prop = undefined;
				}
			} else {
				this.prop = this.prop == item.value ? undefined : item.value;
			}

			this.list2.map((e) => {
				if (e.order !== undefined) {
					e.order = e.value == item.value ? e.order : "";
				}
			});

			let params = {
				order: "",
				prop: "",
			};

			// 根据 prop(字段名) 和 order(排序方式) 的格式返回
			if (this.prop) {
				params = {
					order: item.order,
					prop: item.value,
				};

				if (params.prop && params.order) {
				} else if (params.prop && params.order === undefined) {
					params.order = "desc";
				}
			}

			this.$emit("input", params.prop);
			this.$emit("change", params);
		},
	},
};
</script>
