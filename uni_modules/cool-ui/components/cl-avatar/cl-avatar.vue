<template>
	<view
		:class="['cl-avatar', `cl-avatar--${shape}`]"
		:style="[{ height: parseRpx(size), width: parseRpx(size) }, baseStyle]"
		@click="tap"
	>
		<slot v-if="$slots.default || $slots.$default"> </slot>

		<template v-else>
			<slot name="placeholder" v-if="!src">
				<view class="cl-avatar__placeholder">
					<text
						:class="{
							'cl-icon-my': !name,
						}"
						:style="{ fontSize: parseRpx(size / 2) }"
						>{{ name[0] }}</text
					>
				</view>
			</slot>

			<slot name="error" v-else-if="isError">
				<view class="cl-avatar__error"> Error </view>
			</slot>

			<image
				class="cl-avatar__target"
				:src="src"
				:mode="mode"
				:lazy-load="lazyLoad"
				@error="handleError"
				@load="handleLoad"
				v-else
			/>
		</template>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { type PropType } from "vue";
import { useStyle, useTap } from "../../hooks";

export default defineComponent({
	name: "cl-avatar",

	props: {
		// 图片地址
		src: String,
		// 名称
		name: {
			type: String,
			default: "",
		},
		// 懒加载
		lazyLoad: Boolean,
		// 头像大小
		size: {
			type: Number,
			default: 80,
		},
		// 形状
		shape: {
			type: String as PropType<"circle" | "square">,
			default: "circle",
		},
		// 裁剪模式
		mode: {
			type: String,
			default: "scaleToFill",
		},
	},

	emits: ["error", "load"],

	setup(_, { emit }) {
		// 是否加载失败
		const isError = ref(false);

		// 处理加载
		function handleLoad(e: Event) {
			isError.value = false;
			emit("load", e);
		}

		// 处理错误
		function handleError(e: Event) {
			isError.value = true;
			emit("error", e);
		}

		return {
			isError,
			handleLoad,
			handleError,
			...useTap(emit),
			...useStyle(),
		};
	},
});
</script>
