<template>
	<view class="cl-filter-item" :class="[classList]" @tap="tapItem">
		<!-- 文本内容 -->
		<text class="cl-filter-item__label">{{ name }}</text>

		<!-- 下拉菜单 -->
		<template v-if="type == 'dropdown'">
			<text class="cl-icon-arrow-bottom cl-filter-item__dropdown-icon"></text>
		</template>

		<!-- 排序 -->
		<template v-else>
			<view class="cl-filter-item__order" :class="[`is-${order}`]" v-if="order !== undefined">
				<!-- 升序，降序图标 -->
				<text class="cl-filter-item__order-asc"></text>
				<text class="cl-filter-item__order-desc"></text>
			</view>
		</template>

		<!-- 展开内容 -->
		<view class="cl-filter-item__dropdown-box" :class="[`theme-${theme}`]">
			<template v-if="list">
				<!-- 数据 -->
				<template v-if="list.length > 0">
					<!-- 列表 -->
					<scroll-view class="cl-filter-item__dropdown-box__list" scroll-y>
						<view
							class="cl-filter-item__dropdown-box__item"
							:class="[item.checked ? 'is-checked' : '']"
							v-for="(item, index) in list"
							:key="index"
							@tap.stop="checkItem(item)"
						>
							<text class="cl-filter-item__dropdown-box__label">{{
								item.label
							}}</text>
							<text class="cl-icon-check"></text>
						</view>
					</scroll-view>

					<!-- 多选下的操作按钮 -->
					<view class="cl-filter-item__dropdown-box__btn" v-if="multiple">
						<cl-row :gutter="30">
							<cl-col :span="12">
								<cl-button fill round @tap="clear">清空</cl-button>
							</cl-col>

							<cl-col :span="12">
								<cl-button fill round type="primary" @tap="confirm">确认</cl-button>
							</cl-col>
						</cl-row>
					</view>
				</template>

				<!-- 空态 -->
				<template v-else>
					<slot name="empty">
						<view class="cl-filter-item__dropdown-box__empty"> 暂无数据 </view>
					</slot>
				</template>
			</template>
		</view>
	</view>
</template>

<script>
import { getParent, cloneDeep } from "../../utils";

/**
 * filter-bar-item 过滤项
 * @description 字段升序降序, 下拉框，自定义筛选
 * @tutorial https://docs.cool-js.com/uni/components/advanced/filterbar.html
 * @property {null} value 绑定值，当时下拉多选时，必须是数组
 * @property {String} prop 唯一标识
 * @property {String} type 类型，dropdown | sort
 * @property {String} label 标题
 * @property {Boolean} multiple 下拉框是否多选
 * @property {String} theme 下拉框主题，default | grid
 * @property {Array} options 下拉数据选项
 * @event {Function} change 绑定值发生改变时触发
 * @example 见教程
 */

export default {
	name: "cl-filter-item",

	componentName: "ClFilterItem",

	props: {
		// 绑定值，当时下拉多选时，必须是数组
		value: null,
		// 唯一标识
		prop: String,
		// 类型，dropdown | sort
		type: String,
		// 标题
		label: String,
		// 下拉框是否多选
		multiple: Boolean,
		// 下拉框主题，default | grid
		theme: {
			type: String,
			default: "default",
		},
		// 下拉数据选项
		options: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			name: this.label,
			list: [],
			order: null,
			isExpand: false,
		};
	},

	computed: {
		parent() {
			return getParent.call(this, "ClFilterBar", ["setDropdown", "setExpand", "update"]);
		},

		classList() {
			let list = [];

			if (this.isExpand) {
				list.push("is-expand");
			}

			if (!this.parent) {
				list.push("is-only");
			}

			return list.join(" ");
		},
	},

	watch: {
		value: {
			immediate: true,
			handler: "parse",
		},

		options: {
			immediate: true,
			handler(arr) {
				this.list = cloneDeep(arr);
			},
		},

		label: {
			immediate: true,
			handler(text) {
				this.name = text;
			},
		},
	},

	mounted() {
		// 监听下拉框收起事件
		this.$on("filter-bar.collapse", ({ action, _uid }) => {
			switch (action) {
				case "other":
					if (this._uid !== _uid) {
						this.collapse();
					}
					break;
				case "current":
					if (this._uid == _uid) {
						this.collapse();
					}
					break;
			}
		});
	},

	methods: {
		// 解析绑定值
		parse() {
			if (this.type == "dropdown") {
				let arr = this.multiple ? this.value || [] : [this.value];

				this.list.map((e) => {
					this.$set(e, "checked", arr.includes(e.value));
				});
			} else {
				this.order = this.value;
			}
		},

		// 点击项
		tapItem() {
			// 关闭同邻组件的下拉框
			if (this.parent) {
				this.parent.setDropdown(this._uid);
			}

			if (this.type == "dropdown") {
				if (this.isExpand) {
					this.collapse();
				} else {
					this.expand();
					this.parse();
				}
			} else {
				if (!this.order) {
					this.order = "asc";
				} else if (this.order == "asc") {
					this.order = "desc";
				} else if (this.order == "desc") {
					this.order = "";
				}
				// 更新排序
				this.update(this.order);
			}
		},

		// 选择项
		checkItem(item) {
			if (this.multiple) {
				item.checked = !item.checked;
			} else {
				this.list.map((e) => {
					e.checked = e.value == item.value;
				});

				// 更新标题
				this.name = item.label;
				// 更新数据
				this.update(item.value);
				// 收起下拉框
				this.collapse();
			}
		},

		// 展开下拉框
		expand() {
			if (!this.isExpand) {
				this.isExpand = true;

				if (this.parent) {
					this.parent.setExpand(true);
				}
			}
		},

		// 收起下拉框
		collapse() {
			if (this.isExpand) {
				this.isExpand = false;

				if (this.parent) {
					this.parent.setExpand(false);
				}
			}
		},

		// 下拉框多选确认
		confirm() {
			this.update(this.list.filter((e) => e.checked).map((e) => e.value));
			this.collapse();
		},

		// 下拉框多选清空
		clear() {
			this.update();
			this.collapse();
		},

		// 更新数据
		update(val) {
			this.$emit("input", val);
			this.$emit("change", val);

			// 添加 prop，可区分是哪项数据发送变化
			if (this.parent) {
				this.parent.update({
					prop: this.prop,
					value: val,
				});
			}
		},
	},
};
</script>
