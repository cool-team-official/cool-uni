<template>
	<view class="cl-filter-bar__wrap" :class="[isExpand ? 'is-expand' : '']">
		<view class="cl-filter-bar" :class="[classList]" :style="{ zIndex }">
			<slot></slot>
		</view>

		<!-- 遮罩层 -->
		<view class="cl-filter-bar__mask" @tap="close"></view>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";

/**
 * filter-bar 过滤栏
 * @description 字段升序降序, 下拉框，自定义筛选
 * @tutorial https://docs.cool-js.com/uni/components/advanced/filterbar.html
 * @property {Boolean} isSticky 是否吸顶
 * @property {Boolean} orderType 排序类型 multiple（默认） | single
 * @event {Function} change cl-filter-item 数据发生改变时触发
 * @example 见教程
 */

export default {
	name: "cl-filter-bar",

	componentName: "ClFilterBar",

	props: {
		// 是否吸顶
		isSticky: Boolean,
		// 排序类型 multiple | single
		orderType: {
			type: String,
			default: "multiple",
		},
	},

	mixins: [Emitter],

	data() {
		return {
			_uid: null,
			zIndex: 1,
			isExpand: false,
			timer: null,
		};
	},

	computed: {
		classList() {
			let list = [];

			if (this.isSticky) {
				list.push("is-sticky");
			}

			return list.join(" ");
		},
	},

	methods: {
		// 设置当前下拉框
		setDropdown(_uid) {
			this._uid = _uid;

			// 收起其他下拉框
			this.setCollapse("other", _uid);
		},

		// 设置是否展开。收起延迟300，避免动画未结束导致层级低了问题
		setExpand(f) {
			clearTimeout(this.timer);

			if (f) {
				this.zIndex = 999;
			} else {
				this.timer = setTimeout(() => {
					this.zIndex = 1;
				}, 300);
			}

			this.isExpand = f;
		},

		// 设置收起方式 current, other
		setCollapse(action, _uid) {
			this.broadcast("ClFilterItem", "filter-bar.collapse", {
				action,
				_uid,
			});
		},

		// 设置排序
		setOrder() {
			if (this.orderType == "single") {
				this.clearOrder();
			}
		},

		// 清空字段的排序
		clearOrder() {
			this.broadcast("ClFilterItem", "filter-bar.clearOrder");
		},

		// 关闭当前遮罩层及收起下拉框
		close() {
			this.setCollapse("current", this._uid);
			this.setExpand(false);
		},

		// cl-filter-item 数据发生改变时触发
		update(data) {
			this.$emit("change", data);
		},
	},
};
</script>
