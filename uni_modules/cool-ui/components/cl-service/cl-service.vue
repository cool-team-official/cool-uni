<template>
	<cl-loading-mask
		:loading="mask.loading && loading"
		:modal="mask.modal"
		:color="mask.color"
		:text="mask.text"
		:fullscreen="mask.fullscreen"
		:background="mask.background"
		:loading-theme="mask.loadingTheme"
	>
		<slot :data="data" :loading="loading"></slot>
	</cl-loading-mask>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";

export default defineComponent({
	name: "cl-service",

	props: {
		service: null,
		mask: {
			type: Object,
			default() {
				return {};
			},
		},
		immediate: {
			type: Boolean,
			default: true,
		},
	},

	setup(props) {
		// 数据
		const data = ref();

		// 加载中
		const loading = ref(false);

		// 遮罩层
		const mask = computed(() => {
			return Object.assign(
				{
					loading: true,
					modal: true,
					fullscreen: false,
				},
				props.mask || {}
			);
		});

		// 请求
		async function get() {
			loading.value = true;
			const res = await props.service;
			loading.value = false;

			return (data.value = res);
		}

		onMounted(() => {
			if (props.immediate) {
				get();
			}
		});

		return {
			mask,
			loading,
			data,
			get,
		};
	},
});
</script>
