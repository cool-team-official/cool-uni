<template>
	<view class="cl-footer__wrap">
		<view
			class="cl-footer__placeholder"
			:style="{ height, padding: parseRpx(padding) }"
			v-if="fixed && visible"
		></view>

		<view
			class="cl-footer"
			:class="{
				'is-border': border,
				'is-fixed': fixed,
			}"
			:style="{
				backgroundColor,
				visibility: visible ? 'visible' : 'hidden',
				bottom: parseRpx(bottom),
				zIndex,
			}"
		>
			<view
				class="cl-footer__wrap"
				:class="{
					'is-flex': flex,
				}"
				:style="{
					padding: parseRpx(padding),
				}"
			>
				<view class="cl-footer__inner">
					<slot> </slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	nextTick,
	onMounted,
	ref,
	watch,
} from "vue";
import { parseRpx, sleep } from "/@/cool/utils";

export default defineComponent({
	name: "cl-footer",

	props: {
		// 背景色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		// 內间距
		padding: {
			type: [String, Number],
			default: "24rpx 36rpx",
		},
		// 高
		height: [String, Number],
		// 层级
		zIndex: {
			type: Number,
			default: 99,
		},
		// 距离底部多少
		bottom: {
			type: [String, Number],
			default: 0,
		},
		// 是否带上边框
		border: Boolean,
		// 是否固定底部定位
		fixed: {
			type: Boolean,
			default: true,
		},
		// 是否 flex 布局
		flex: {
			type: Boolean,
			default: true,
		},
		// 延迟获取
		delay: {
			type: Number,
			default: 0,
		},
		// 监听对象
		vt: null,
	},

	setup(props) {
		const instance = getCurrentInstance();

		// 底部高度
		const height = ref();

		// 是否可见
		const visible = computed(() => {
			return parseInt(height.value) != 0;
		});

		// 重新计算
		async function update() {
			if (props.height) {
				height.value = parseRpx(props.height);
				return false;
			}

			await sleep(props.delay);
			await nextTick();

			uni.createSelectorQuery()
				.in(instance?.proxy)
				.select(".cl-footer__inner")
				.boundingClientRect((rect) => {
					if (rect) {
						height.value = Math.floor(rect.height || 0) + "px";
					}
				})
				.exec();
		}

		watch(
			() => props.vt,
			() => {
				update();
			},
			{
				deep: true,
			},
		);

		onMounted(() => {
			update();
		});

		return {
			height,
			visible,
			update,
			parseRpx,
		};
	},
});
</script>
