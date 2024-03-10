<template>
	<view class="cl-filter-item" :class="classList" @tap="tapItem">
		<!-- 文本内容 -->
		<text class="cl-filter-item__label">{{ dropdown.name || label }}</text>

		<!-- 下拉菜单 -->
		<template v-if="type == 'dropdown'">
			<text class="cl-icon-caret-bottom cl-filter-item__dropdown-icon"></text>
		</template>

		<!-- 开关 -->
		<template v-else-if="type == 'switch'"> </template>

		<!-- 排序 -->
		<template v-else-if="type == 'order'">
			<view class="cl-filter-item__order" :class="[`is-${value}`]">
				<!-- 升序，降序图标 -->
				<text class="cl-filter-item__order-asc"></text>
				<text class="cl-filter-item__order-desc"></text>
			</view>
		</template>

		<!-- 展开内容 -->
		<view class="cl-filter-item__dropdown-box" :class="[`theme-${theme}`]">
			<slot name="dropdown">
				<template v-if="dropdown.list">
					<!-- 数据 -->
					<template v-if="dropdown.list.length > 0">
						<!-- 列表 -->
						<scroll-view class="cl-filter-item__dropdown-box__list" scroll-y>
							<view
								class="cl-filter-item__dropdown-box__item"
								:class="[
									item.checked ? 'is-checked' : '',
									item.disabled ? 'is-disabled' : '',
								]"
								:style="{
									width: itemWidth,
								}"
								v-for="(item, index) in dropdown.list"
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
									<cl-button fill round type="primary" @tap="confirm"
										>确认</cl-button
									>
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
			</slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, reactive, watch } from "vue";
import { getParent } from "/@/cool/utils";

declare interface Item {
	label: string;
	value: any;
	checked?: boolean;
	[key: string]: any;
}

export default defineComponent({
	name: "cl-filter-item",

	props: {
		// 唯一标识
		prop: {
			type: String,
			required: true,
		},
		// 类型
		type: {
			type: String as PropType<"dropdown" | "order" | "switch">,
			default: "switch",
		},
		// 标题
		label: String,
		// 是否禁用
		disabled: Boolean,
		// 下拉框是否多选
		multiple: Boolean,
		// 下拉框主题
		theme: {
			type: String as PropType<"default" | "grid">,
			default: "default",
		},
		// 格布局下的列数
		gridCols: {
			type: Number,
			default: 4,
		},
		// 下拉数据选项
		options: {
			type: Array as PropType<Item[]>,
			default: () => [],
		},
	},

	emits: ["change"],

	setup(props, { emit }) {
		// <cl-filter-bar />
		const parent = getParent(
			"cl-filter-bar",
			["form", "setExpand", "update", "close", "collapse"],
			["collapse", "clear"],
		);

		// 下拉框
		const dropdown = reactive({
			name: "",
			list: [] as Item[],
			isExpand: false,
		});

		watch(
			() => props.options,
			(val) => {
				dropdown.list = val;
			},
			{
				immediate: true,
			},
		);

		// 绑定值
		const value = computed(() => {
			const v = parent.value?.form[props.prop];

			switch (props.type) {
				case "dropdown":
					if (!props.multiple) {
						const d = dropdown.list.find((e) => e.value == v);
						if (d) {
							dropdown.name = d.label;
						}
					}
					break;
			}

			return v;
		});

		// 样式
		const classList = computed(() => {
			return [
				{
					"is-switch": value.value && props.type == "switch",
					"is-expand": dropdown.isExpand,
					"is-only": !parent.value,
					"is-disabled": props.disabled,
				},
			];
		});

		// 每项宽度
		const itemWidth = computed(() => {
			return props.theme == "grid" ? `calc(${100 / props.gridCols}% - 20rpx)` : "auto";
		});

		// 点击项
		function tapItem() {
			// 已禁用
			if (props.disabled) {
				return false;
			}

			// 关闭其他遮罩层
			if (parent.value) {
				parent.value.collapse(props.prop);
			}

			switch (props.type) {
				case "dropdown":
					if (dropdown.isExpand) {
						collapse();
					} else {
						let arr = props.multiple ? value.value || [] : [value.value];

						dropdown.list.map((e) => {
							e.checked = arr.includes(e.value);

							// 设置单选的选中标题
							if (e.checked) {
								if (!props.multiple) {
									dropdown.name = e.label;
								}
							}
						});

						expand();
					}
					break;

				case "switch":
					update(!value.value);
					break;

				case "order":
					// 修改排序
					if (!value.value) {
						update("asc");
					} else if (value.value == "asc") {
						update("desc");
					} else if (value.value == "desc") {
						update("");
					}
					break;
			}
		}

		// 选择项
		function checkItem(item: Item) {
			// 已禁用
			if (item.disabled) {
				return false;
			}

			if (props.multiple) {
				item.checked = !item.checked;
			} else {
				if (item.checked) {
					item.checked = false;

					dropdown.name = props.label || "";
					update(undefined);
				} else {
					dropdown.list.forEach((e) => {
						e.checked = e.value == item.value;
					});

					// 更新标题
					dropdown.name = item.label;
					// 更新数据
					update(item.value);
				}

				// 收起下拉框
				collapse();
			}
		}

		// 展开下拉框
		function expand() {
			if (!dropdown.isExpand) {
				dropdown.isExpand = true;

				if (parent.value) {
					parent.value.setExpand(true);
				}
			}
		}

		// 收起下拉框：prop 为空收起当前，否则收起除 prop 外的所有
		function collapse(prop?: string) {
			if (prop == props.prop) {
				return false;
			}

			if (dropdown.isExpand) {
				dropdown.isExpand = false;

				if (parent.value) {
					parent.value.setExpand(false);
				}
			}
		}

		// 下拉框多选确认
		function confirm() {
			update(dropdown.list.filter((e) => e.checked).map((e) => e.value));
			collapse();
		}

		// 清空
		function clear() {
			if (props.multiple) {
				update([], "clear");
			} else {
				update(undefined, "clear");
			}

			dropdown.name = props.label || "";

			collapse();
		}

		// 更新数据
		function update(value?: string | number | boolean | any[], action?: string) {
			emit("change", value);

			// 更新 cl-filter-bar
			if (parent.value) {
				parent.value.update({
					prop: props.prop,
					value,
					action,
				});
			}
		}

		return {
			value,
			classList,
			dropdown,
			itemWidth,
			checkItem,
			tapItem,
			confirm,
			clear,
			collapse,
		};
	},
});
</script>
