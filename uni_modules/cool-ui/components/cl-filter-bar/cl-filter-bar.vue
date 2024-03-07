<template>
	<view
		class="cl-filter-bar__wrap"
		:class="[
			{
				'is-expand': isExpand,
			},
		]"
	>
		<!-- 过滤栏 -->
		<view class="cl-filter-bar" :style="{ zIndex }">
			<slot></slot>
		</view>

		<!-- 遮罩层 -->
		<view class="cl-filter-bar__mask" @tap="close" @touchmove.stop.prevent></view>
	</view>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from "vue";

export default defineComponent({
	name: "cl-filter-bar",

	props: {
		// 绑定值
		modelValue: {
			type: Object,
			default: () => {
				return {};
			},
		},
		// 兼容参数
		num: Number,
	},

	setup(props, { emit }) {
		const { proxy }: any = getCurrentInstance();

		// 表单值
		const form = ref<any>(props.modelValue);

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

		// 计时器
		let timer: any = null;

		// 是否展开
		const isExpand = ref(false);

		// 层级
		const zIndex = ref(1);

		// 设置是否展开。收起延迟300，避免动画未结束导致层级低了问题
		function setExpand(f: boolean) {
			clearTimeout(timer);

			if (f) {
				zIndex.value = 999;
			} else {
				timer = setTimeout(() => {
					zIndex.value = 1;
				}, 300);
			}

			isExpand.value = f;
		}

		// 收起下拉框
		function collapse(prop?: string) {
			proxy.__children.forEach((e: any) => {
				e.collapse(prop);
			});
		}

		// 关闭当前遮罩层及收起下拉框
		function close() {
			setExpand(false);
			collapse();
		}

		// cl-filter-item 数据发生改变时触发
		function update(data: { prop: string; value: any; action?: "clear" }) {
			form.value[data.prop] = data.value;

			if (data.action != "clear") {
				emit("update:modelValue", form.value);
				emit("change", data);
			}
		}

		// 清空
		function clear() {
			proxy.__children.forEach((e: any) => {
				e.clear();
			});

			emit("update:modelValue", form.value);
			emit("clear");
		}

		return {
			form,
			zIndex,
			isExpand,
			setExpand,
			collapse,
			close,
			clear,
			update,
		};
	},
});
</script>
