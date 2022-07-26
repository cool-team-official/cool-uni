<template>
	<view class="cl-form-item" :class="[classList]">
		<view class="cl-form-item__label" :style="{ width: labelWidth2 }" v-if="label">{{
			label
		}}</view>

		<view class="cl-form-item__container">
			<view class="cl-form-item__content" :class="[justify2]">
				<slot></slot>
			</view>
			<view class="cl-form-item__suffix">
				<slot name="suffix"></slot>
			</view>
		</view>

		<slot name="error" :message="message" :error="!!message">
			<text class="cl-form-item__message" v-if="showMessage">{{ message }}</text>
		</slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, PropType, ref, watch } from "vue";
import { useEl } from "../../hook";
import { isArray, isBoolean } from "lodash";
import { parseRpx } from "/@/cool/utils";
import AsyncValidator from "../../utils/async-validator";

/**
 * @description 表单项，基于 async-validator 的验证
 * @property {Boolean} border 是否带有边框
 * @property {String} labelWidth 表单域标题的宽度，默认150rpx
 * @property {String} labelPosition 表单域标题的位置，默认right
 * @property {String} justify 水平布局，默认start
 * @property {String} validateOnRuleChange 是否在 rules 属性改变后立即触发一次验证，默认true
 * @example <cl-form-item prop="name"></cl-form-item>
 */

export default defineComponent({
	name: "cl-form-item",

	props: {
		prop: String,
		label: String,
		labelWidth: [String, Number],
		labelPosition: String as PropType<"left" | "right" | "top">,
		justify: String as PropType<"start" | "center" | "end">,
		rules: {
			type: Object,
			default: null,
		},
		validateOnRuleChange: {
			type: Boolean,
			default: null,
		},
	},

	setup(props) {
		const { getParent } = useEl();

		// cl-form
		const parent = getParent(
			"cl-form",
			[
				"form",
				"rules",
				"tips",
				"labelWidth",
				"labelPosition",
				"addField",
				"removeField",
				"validateOnRuleChange",
			],
			["clearValidate", "onError"]
		);

		// 绑定值
		const value = ref<any>();

		// 消息提示
		const message = ref<string>("");

		// 是否必填
		const isRequired = ref<boolean>(false);

		// 标题位置
		const labelPosition2 = computed(() => {
			return props.labelPosition || parent.value?.labelPosition;
		});

		// 标题宽度
		const labelWidth2 = computed(() => {
			return labelPosition2.value == "top"
				? "auto"
				: parseRpx(props.labelWidth || parent.value?.labelWidth);
		});

		// 是否显示消息
		const showMessage = computed(() => {
			return parent.value?.tips == "inner" && message.value;
		});

		// 内容布局
		const justify2 = computed(() => {
			return `is-justify--${props.justify || parent.value?.justify}`;
		});

		// 样式
		const classList = computed(() => {
			let list: string[] = [];

			if (isRequired.value) {
				list.push("is-required");
			}

			if (message.value) {
				list.push("is-error");
			}

			// 标题位置
			list.push(`is-${labelPosition2.value}`);

			return list.join(" ");
		});

		// 校验器
		let validator: any = null;

		// 监听规则校验
		watch(() => parent.value?.rules, onRules, {
			immediate: true,
			deep: true,
		});

		// 监听规则
		function onRules(rules: any[]) {
			const rule = props.rules || rules[props.prop];

			if (rule) {
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

				// 检验器
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

		// 监听值变化
		watch(
			() => {
				let d: any = parent.value?.form;

				if (props.prop?.includes(".")) {
					props.prop.split(".").forEach((e) => {
						if (d[e] !== undefined) {
							d = d[e];
						}
					});

					return d;
				} else {
					return d[props.prop];
				}
			},
			(val: any) => {
				value.value = val;
				validate();
			},
			{
				deep: true,
			}
		);

		// 检验
		function validate() {
			if (isRequired.value) {
				validator.validate({ [props.prop]: value.value }, (errors: any) => {
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

		// 错误提示
		function onError(errors: any[]) {
			const item = errors.find((e) => e.field == props.prop);

			if (item) {
				message.value = item.message;
			}
		}

		onMounted(() => {
			// 添加字段
			parent.value?.addField(props.prop, props.rules);
		});

		onUnmounted(() => {
			// 移除字段
			parent.value.removeField(props.prop);
		});

		return {
			message,
			classList,
			labelWidth2,
			showMessage,
			justify2,
			parseRpx,
			validate,
			clearValidate,
			onError,
		};
	},
});
</script>
