<template>
	<view
		class="cl-loading"
		:class="[`cl-loading--${theme}`]"
		:style="{ height: size + 'px', width: size + 'px' }"
	>
		<!-- 菊花 -->
		<template v-if="theme == 'spin'">
			<view
				class="cl-loading__spin"
				v-for="(a, i) in 5"
				:key="a"
				:style="{
					transform: `rotate(${i * 45}deg)`,
				}"
			>
				<text class="cl-loading__spin-item" :style="spin" v-for="i in 2" :key="i"></text>
			</view>
		</template>

		<!-- 默认 -->
		<view
			class="cl-loading__inner"
			:style="{
				color,
				borderColor,
				borderWidth: spin.width,
				'border-bottom-color': 'currentColor',
			}"
			v-else
		>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-loading",

	props: {
		// 图标颜色
		color: String,
		// 边框颜色
		borderColor: {
			type: String,
			default: "rgba(0, 0, 0, 0.1)",
		},
		// 边框大小
		borderWidth: {
			type: [String, Number],
			default: 4,
		},
		// 主题
		theme: {
			type: String as PropType<"default" | "spin">,
			default: "default",
		},
		// 图标大小
		size: {
			type: Number,
			default: 25,
		},
	},

	setup(props) {
		const rh = computed(() => props.size / 8);
		const rw = computed(() => props.size / 20);

		const spin = computed(() => {
			return {
				backgroundColor: props.color,
				width: parseRpx(props.borderWidth),
				height: "20%",
			};
		});

		return {
			rh,
			rw,
			spin,
		};
	},
});
</script>
