<template>
	<view
		:class="[
			'cl-form',
			{
				'is-border': border,
			},
		]"
	>
		<slot></slot>

		<!-- 提示 -->
		<cl-toast :ref="setRefs('toast')"></cl-toast>
	</view>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch, type PropType } from "vue";
import { cloneDeep, isArray, isEmpty } from "lodash-es";
import { useCool } from "/@/cool";
import AsyncValidator from "../../utils/async-validator";

export default defineComponent({
	name: "cl-form",

	props: {
		// 表单数据对象
		modelValue: {
			type: Object,
			default: () => {
				return {};
			},
		},
		// 表单验证规则
		rules: Object,
		// 是否带有边框
		border: Boolean,
		// 是否禁用
		disabled: Boolean,
		// 水平布局
		justify: String as PropType<"start" | "center" | "end">,
		// 消息提示方式
		tips: {
			type: String as PropType<"toast" | "inner" | "none">,
			default: "toast",
		},
		// 标签的宽度
		labelWidth: {
			type: [String, Number],
			default: 150,
		},
		// 标签的位置
		labelPosition: {
			type: String,
			default: "left",
		},
		// 是否在 rules 属性改变后立即触发一次验证
		validateOnRuleChange: {
			type: Boolean,
			default: false,
		},
		// 是否滚动到错误项
		scrollToError: {
			type: Boolean,
			default: true,
		},
	},

	emits: ["update:modelValue", "change", "reset", "clear"],

	setup(props, { emit }) {
		const { proxy }: any = getCurrentInstance();
		const { refs, setRefs } = useCool();

		// 校验关键字
		const fields = ref<string[]>([]);

		// 表单值
		const form = ref<any>({});

		// 旧值
		const _form = cloneDeep(props.modelValue);

		watch(
			() => props.modelValue,
			(val: any) => {
				form.value = val;
			},
			{
				immediate: true,
				deep: true,
			},
		);

		// 规则
		const rules = ref<any>({});

		// 设置规则
		function setRules(value: any) {
			rules.value = value || {};
		}

		// 监听规则变化
		watch(() => props.rules, setRules, {
			immediate: true,
			deep: true,
		});

		// 添加校验关键字
		function addField(value: string, rule?: any) {
			const item: string | unknown = fields.value.find((e: string) => e == value);

			if (!item && value) {
				fields.value.push(value);

				// 添加规则
				if (rule) {
					rules.value[value] = rule;
				}
			}
		}

		// 移除校验关键字
		function removeField(value: string) {
			fields.value.splice(fields.value.indexOf(value), 1);
		}

		// 校验表单
		function validate(callback: Function) {
			if (!props.disabled) {
				validateField(fields.value, (valid: boolean, errors: any[], fields: any) => {
					if (callback) {
						callback(valid, errors);
					}

					if (!valid) {
						const { field, message } = errors[0];

						if (props.scrollToError) {
							proxy.__children.forEach((e: any) => {
								e.scrollTo(field);
							});
						}

						switch (props.tips) {
							case "toast":
								refs.toast.open({
									message,
									icon: "cl-icon-toast-warning",
								});
								break;
							case "inner":
								proxy.__children.forEach((e: any) => {
									e.onError(errors);
								});
								break;
						}
					}
				});
			}
		}

		// 根据字段校验表单
		function validateField(value: string[] | string, callback: Function) {
			if (!isEmpty(value)) {
				const r: any = {};

				fields.value.forEach((e) => {
					if (rules.value[e]) {
						r[e] = rules.value[e];
					}
				});

				//@ts-ignore
				const validator = new AsyncValidator(r);
				const values: any = isArray(value) ? value : [value];
				const data: any = {};

				values.forEach((e: string) => {
					let d = form.value;

					if (e) {
						if (e.includes(".")) {
							e.split(".").forEach((e) => {
								d = d[e];
							});
						} else {
							d = d[e];
						}

						data[e] = d;
					}
				});

				validator.validate(data, (errors: any[]) => {
					if (callback) {
						callback(!errors, errors);
					}
				});
			} else {
				callback(true, []);
			}
		}

		// 重置表单
		function reset() {
			form.value = cloneDeep(_form);
			emit("update:modelValue", form.value);
			emit("reset");
			clearValidate();
		}

		// 清空表单
		function clear() {
			form.value = {};
			emit("update:modelValue", form.value);
			emit("clear");
			clearValidate();
		}

		// 移除表单校验结果
		function clearValidate() {
			(proxy.__children || []).forEach((e: any) => {
				e.clearValidate();
			});
		}

		return {
			refs,
			setRefs,
			form,
			rules,
			setRules,
			validate,
			validateField,
			reset,
			clear,
			clearValidate,
			addField,
			removeField,
		};
	},
});
</script>
