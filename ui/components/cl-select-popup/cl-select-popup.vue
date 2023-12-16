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
		direction="bottom"
		border-radius="16rpx 16rpx 0 0"
		@close="onClose"
	>
		<view class="cl-select-popup__wrap">
			<!-- 标题 -->
			<view class="cl-select-popup__header">
				{{ title }}
				<text class="cl-icon-close" @tap="close"></text>
			</view>

			<!-- 滚动区域 -->
			<scroll-view
				:ref="setRefs('scroller')"
				scroll-y
				:scroll-into-view="scroller.view"
				class="cl-select-popup__container"
				:style="{
					height: parseRpx(scrollerHeight),
					maxHeight: parseRpx(scrollerMaxHeight),
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

			<view class="cl-select-popup__footer">
				<slot name="confirm">
					<cl-button
						round
						fill
						type="primary"
						size="large"
						:disabled="required ? selection.length == 0 : false"
						@tap="confirm"
						>确定</cl-button
					>
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
		modelValue: [String, Number, Array],
		title: String,
		scrollerHeight: [String, Number],
		scrollerMaxHeight: {
			type: [String, Number],
			default: 600,
		},
		options: {
			type: Array as PropType<Item[]>,
			default: () => [],
		},
		multiple: Boolean,
		showPicker: {
			type: Boolean,
			default: true,
		},
		required: Boolean,
		...Props,
	},

	emits: ["update:modelValue", "change", "confirm", "close"],

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
					},
				);
			},
		});

		// 打开
		function open() {
			// 打开弹出
			refs.popup?.open();

			// 监听是否滚动
			scroller.watch();

			// 设置选中值
			selection.value = [...checked.value];
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
					checked.value = [...value] || [];
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
			},
		);

		return {
			refs,
			setRefs,
			checked,
			selection,
			text,
			scroller,
			open,
			close,
			onClose,
			confirm,
			check,
			isActive,
			parseRpx,
		};
	},
});
</script>
