<template>
	<view
		class="cl-form-item"
		:class="[
			`is-${labelPosition}`,
			{
				'is-error': !!message,
				'is-required': isRequired,
			},
		]"
		:style="[baseStyle]"
		:id="`cl-form-item--${id}`"
		ref="cl-form-item"
	>
		<view
			class="cl-form-item__label"
			:style="{
				width: parseRpx(labelWidth),
			}"
			v-if="label || $slots.label"
		>
			<slot name="label">
				{{ label }}
			</slot>
		</view>

		<view class="cl-form-item__container">
			<view class="cl-form-item__content" :class="[justify]">
				<slot></slot>
			</view>

			<view class="cl-form-item__append" v-if="$slots.append">
				<slot name="append"></slot>
			</view>
		</view>

		<slot name="error" :message="message" :error="!!message">
			<text class="cl-form-item__message" v-if="showMessage">{{ message }}</text>
		</slot>
	</view>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onUnmounted,
	ref,
	watch,
	getCurrentInstance,
	type PropType,
} from "vue";
import { isArray, isBoolean } from "lodash-es";
import { getParent, parseRpx } from "/@/cool/utils";
import AsyncValidator from "../../utils/async-validator";
import { useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-form-item",

	props: {
		// 字段
		prop: String,
		// 标签内容
		label: String,
		// 标签的宽度
		labelWidth: [String, Number],
		// 标签的位置
		labelPosition: String as PropType<"left" | "right" | "top">,
		// 水平布局
		justify: String as PropType<"start" | "center" | "end">,
		// 规则
		rules: {
			type: Object,
			default: null,
		},
		// 是否在 rules 属性改变后立即触发一次验证
		validateOnRuleChange: {
			type: Boolean,
			default: null,
		},
		// 是否必填
		required: Boolean,
	},

	setup(props) {
		const { proxy }: any = getCurrentInstance();

		// cl-form
		const parent = getParent(
			"cl-form",
			[
				"form",
				"rules",
				"tips",
				"labelWidth",
				"labelPosition",
				"justify",
				"addField",
				"removeField",
				"validateOnRuleChange",
			],
			["clearValidate", "onError", "scrollTo"],
		);

		// 避免多层级带 . 符号无法识别问题
		const id = props.prop?.replace(/\./g, "-");

		// 绑定值
		const value = ref<any>();

		// 消息提示
		const message = ref("");

		// 是否必填
		const isRequired = ref(props.required || false);

		// 标题位置
		const labelPosition = computed(() => {
			return props.labelPosition || parent.value?.labelPosition;
		});

		// 标题宽度
		const labelWidth = computed(() => {
			return labelPosition.value == "top"
				? "auto"
				: parseRpx(props.labelWidth || parent.value?.labelWidth);
		});

		// 内容布局
		const justify = computed(() => {
			return `is-justify--${props.justify || parent.value?.justify}`;
		});

		// 是否显示消息
		const showMessage = computed(() => {
			return parent.value?.tips == "inner" && message.value;
		});

		// 校验器
		let validator: any = null;

		// 监听规则校验
		watch(() => [parent.value?.rules, props.rules], onRules, {
			immediate: true,
			deep: true,
		});

		// 监听规则
		function onRules(rules: any) {
			if (!props.prop) return;
			const rule = props.rules || rules?.[props.prop];

			if (rule) {
				if (!isRequired.value) {
					isRequired.value = false;

					if (isArray(rule)) {
						rule.forEach((e: any) => {
							if (e.required) {
								isRequired.value = e.required;
							}
						});
					} else {
						isRequired.value = rule.required;
					}
				}

				// 检验器
				//@ts-ignore
				validator = new AsyncValidator({
					[props.prop]: rule,
				});

				// 是否在 rules 属性改变后立即触发一次验证
				if (
					isBoolean(props.validateOnRuleChange)
						? props.validateOnRuleChange
						: parent.value?.validateOnRuleChange
				) {
					validate();
				}
			}
		}

		// 检验
		function validate() {
			if (isRequired.value) {
				validator?.validate({ [props.prop as any]: value.value }, (errors: any) => {
					message.value = errors ? errors[0].message : "";
				});
			} else {
				clearValidate();
			}
		}

		// 清空验证
		function clearValidate() {
			message.value = "";
		}

		// 滚动到此
		function scrollTo(prop: string) {
			if (prop == props.prop) {
				uni.createSelectorQuery()
					.in(proxy)
					.select(`#cl-form-item--${id}`)
					.boundingClientRect((res) => {
						if (res) {
							proxy.$root.scrollTo(res.top);
						}
					})
					.exec();
			}
		}

		// 错误提示
		function onError(errors: any[]) {
			const item = errors.find((e) => e.field == props.prop);

			if (item) {
				message.value = item.message;
			}
		}

		// 监听值变化
		watch(
			() => {
				if (parent.value) {
					let d: any = parent.value?.form;

					if (props.prop?.includes(".")) {
						props.prop.split(".").forEach((e) => {
							if (d[e] !== undefined) {
								d = d[e];
							}
						});

						return d;
					} else {
						return d[props.prop as any];
					}
				}
			},
			(val: any) => {
				value.value = val;
				validate();
			},
			{
				deep: true,
			},
		);

		// 监听cl-form加载完
		watch(
			parent,
			(val) => {
				if (val) {
					parent.value?.addField(props.prop, props.rules);
				}
			},
			{ immediate: true },
		);

		onUnmounted(() => {
			// 移除字段
			parent.value?.removeField(props.prop);
		});

		return {
			id,
			message,
			isRequired,
			labelWidth,
			labelPosition,
			justify,
			showMessage,
			validate,
			clearValidate,
			scrollTo,
			onError,
			...useStyle(),
		};
	},
});
</script>
