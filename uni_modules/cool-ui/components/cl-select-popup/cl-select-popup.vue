<template>
	<view class="cl-select-popup" @tap="open" v-if="showPicker">
		<slot :label="text" :value="checked">
			<cl-select-inner
				:height="height"
				:placeholder="placeholder"
				:disabled="disabled"
				:border="border"
				:round="round"
				:backgroundColor="backgroundColor"
				:borderRadius="borderRadius"
				:arrowIcon="arrowIcon"
				:padding="padding"
				:text="text"
			/>
		</slot>
	</view>

	<!-- 弹出框 -->
	<cl-popup
		:ref="setRefs('popup')"
		:padding="0"
		:title="title"
		direction="bottom"
		border-radius="24rpx 24rpx 0 0"
		show-close-btn
		@opened="onOpened"
		@close="onClose"
		@closed="onClosed"
	>
		<view class="cl-select-popup__wrap">
			<scroll-view
				class="cl-select-popup__container"
				:ref="setRefs('scroller')"
				scroll-y
				:scroll-into-view="scroller.view"
				:style="{
					height: parseRpx(scrollerHeight),
					maxHeight: parseRpx(scrollerHeight || scrollerMaxHeight),
				}"
			>
				<slot name="list">
					<view class="cl-select-popup__list">
						<view
							class="cl-select-popup__item"
							v-for="(item, index) in options"
							:key="index"
							:class="{
								'is-active': isActive(item.value),
							}"
							:id="`item-${item.value}`"
							@tap="check(item.value)"
						>
							<slot
								name="item"
								:item="item"
								:active="isActive(item.value)"
								:selection="selection"
							>
								{{ item.label }}

								<text class="is-check cl-icon-check"></text>
							</slot>
						</view>
					</view>

					<!-- 空态 -->
					<view class="cl-select-popup__empty" v-show="options.length == 0">
						<cl-empty :fixed="false" />
					</view>
				</slot>
			</scroll-view>

			<view class="cl-select-popup__footer" v-if="showFooter">
				<slot name="confirm">
					<cl-button
						custom
						type="primary"
						:disabled="required ? selection.length == 0 : false"
						@tap="confirm"
					>
						{{ $t("确定") }}
					</cl-button>
				</slot>
			</view>
		</view>
	</cl-popup>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, watch, computed, nextTick, reactive } from "vue";
import { isArray, isEmpty, last } from "lodash-es";
import { useRefs } from "/@/cool";
import { parseRpx } from "/@/cool/utils";
import { Props } from "../cl-select-inner/config";

interface Item {
	label: string;
	value: any;
	[key: string]: any;
}

export default defineComponent({
	name: "cl-select-popup",

	props: {
		...Props,

		// 绑定值
		modelValue: [String, Number, Array],
		// 标题
		title: String,
		// 滚动高度
		scrollerHeight: [String, Number],
		// 最大滚动高度
		scrollerMaxHeight: {
			type: [String, Number],
			default: 600,
		},
		// 选项列表
		options: {
			type: Array as PropType<Item[]>,
			default: () => [],
		},
		// 是否多选
		multiple: Boolean,
		// 是否显示选择器
		showPicker: {
			type: Boolean,
			default: true,
		},
		// 是否显示底部
		showFooter: {
			type: Boolean,
			default: true,
		},
		// 是否必填
		required: Boolean,
		// 是否禁用
		disabled: Boolean,
	},

	emits: ["update:modelValue", "change", "confirm", "opened", "close", "closed"],

	setup(props, { emit }) {
		const { refs, setRefs } = useRefs();

		// 已选
		const checked = ref<any[]>([]);

		// 选中项
		const selection = ref<any[]>([]);

		// 显示的文本内容
		const text = computed(() => {
			return checked.value
				.map((e) => props.options.find((a) => a.value == e)?.label)
				.join("、");
		});

		// 滚动条
		const scroller = reactive({
			stop: null as (() => void) | null,
			view: "",

			clear() {
				scroller.stop?.();
				scroller.view = "";
			},

			watch() {
				scroller.stop = watch(
					() => [checked.value, props.options],
					() => {
						if (!isEmpty(checked.value) && !isEmpty(props.options)) {
							nextTick(() => {
								scroller.view = `item-${last(checked.value)}`;
								scroller.stop?.();
							});
						}
					},
					{
						immediate: true,
						deep: true,
					}
				);
			},
		});

		// 打开
		function open() {
			if (props.disabled) {
				return;
			}

			// 打开弹出
			refs.popup?.open();

			// 监听是否滚动
			scroller.watch();

			// 设置选中值
			selection.value = [...checked.value];
		}

		// 打开完成事件
		function onOpened() {
			emit("opened");
		}

		// 关闭
		function close() {
			refs.popup?.close();
		}

		// 关闭事件
		function onClose() {
			scroller.clear();
			emit("close");
		}

		// 关闭完成事件
		function onClosed() {
			emit("closed");
		}

		// 选中
		function check(value: any) {
			const i = selection.value.indexOf(value);

			if (props.multiple) {
				if (i >= 0) {
					selection.value.splice(i, 1);
				} else {
					selection.value.push(value);
				}
			} else {
				if (i >= 0) {
					selection.value = [];
				} else {
					selection.value = [value];
				}
			}
		}

		// 确认
		function confirm() {
			const v = props.multiple ? selection.value : selection.value[0];

			emit("update:modelValue", v);
			emit("change", v);
			emit("confirm", v);
			close();
		}

		// 是否选中
		function isActive(value: any) {
			return selection.value.includes(value);
		}

		// 监听值
		watch(
			() => props.modelValue,
			(value) => {
				if (isArray(value)) {
					checked.value = [...value];
				} else {
					if (value === undefined) {
						checked.value = [];
					} else {
						checked.value = [value];
					}
				}

				selection.value = checked.value;
			},
			{
				deep: true,
				immediate: true,
			}
		);

		return {
			refs,
			setRefs,
			checked,
			selection,
			text,
			scroller,
			open,
			onOpened,
			close,
			onClose,
			onClosed,
			confirm,
			check,
			isActive,
			parseRpx,
		};
	},
});
</script>
