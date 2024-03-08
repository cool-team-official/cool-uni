<template>
	<view
		class="cl-noticebar"
		:class="[
			{
				'is-scrollable': scrollable,
			},
		]"
		:style="{
			color,
			backgroundColor,
		}"
		v-if="visible"
	>
		<cl-icon
			name="close-border"
			:size="34"
			:margin="[0, 10, 0, 0]"
			@tap="close"
			v-if="closeable"
		/>

		<slot name="icon">
			<cl-icon :class-name="icon" :size="34" :margin="[0, 10, 0, 0]" v-if="icon" />
		</slot>

		<view class="cl-noticebar__box">
			<view
				class="cl-noticebar__scroller"
				:class="[`is-${direction}`]"
				:style="{
					height: parseRpx(height),
					top: scroll.top + 'px',
					left: scroll.left + 'px',
					transition,
					transform: `translateX(-${scroll.translateX}px)`,
				}"
			>
				<view class="cl-noticebar__item" v-for="(item, index) in list" :key="index">
					<text class="cl-noticebar__text">{{ item }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import {
	defineComponent,
	onMounted,
	onUnmounted,
	reactive,
	ref,
	computed,
	getCurrentInstance,
	type PropType,
} from "vue";
import { isArray } from "lodash-es";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-noticebar",

	props: {
		// 文本内容
		text: {
			type: [String, Array],
			default: "",
			required: true,
		},
		// 方向
		direction: {
			type: String as PropType<"horizontal" | "vertical">,
			default: "horizontal",
		},
		// 字体颜色
		color: String,
		// 背景颜色
		backgroundColor: String,
		// 能否滚动
		scrollable: Boolean,
		// 滚动时长
		duration: {
			type: Number,
			default: 10,
		},
		// 能否关闭
		closeable: Boolean,
		// 左侧图标
		icon: String,
		// 高度
		height: {
			type: [String, Number],
			default: 40,
		},
	},

	emits: ["close"],

	setup(props, { emit }) {
		const { proxy }: any = getCurrentInstance();

		// 是否可见
		const visible = ref(true);

		// 滚动配置
		const scroll = reactive({
			left: 0,
			top: 0,
			translateX: 0,
			duration: 0,
		});

		// 计时器
		let timer: any = null;

		// 文案列表
		const list = computed(() => {
			return isArray(props.text) ? props.text : [props.text];
		});

		// 动画过度
		const transition = computed(() => {
			if (props.direction == "horizontal") {
				return `transform ${scroll.duration}s linear`;
			} else {
				return `top 0.3s`;
			}
		});

		// 刷新
		function refresh() {
			if (props.scrollable) {
				// 清除定时器
				clear();

				// 获取盒子大小
				uni.createSelectorQuery()
					.in(proxy)
					.select(`.cl-noticebar__box`)
					.boundingClientRect((box: any) => {
						// 获取文本大小
						uni.createSelectorQuery()
							.in(proxy)
							.select(`.cl-noticebar__text`)
							.boundingClientRect((text: any) => {
								const duration = props.duration * 1000;

								// 水平滑动
								if (props.direction == "horizontal") {
									const fn = () => {
										scroll.duration = props.duration;
										scroll.left = box.width;
										scroll.translateX = text.width + scroll.left;

										timer = setTimeout(() => {
											scroll.translateX = 0;
											scroll.duration = 0;

											setTimeout(fn, 500);
										}, duration);
									};

									fn();
								}
								// 垂直滑动
								else {
									timer = setInterval(() => {
										if (
											Math.abs(scroll.top) >=
											box.height * (list.value.length - 1)
										) {
											scroll.top = 0;
										} else {
											scroll.top -= box.height;
										}
									}, duration);
								}
							})
							.exec();
					})
					.exec();
			}
		}

		// 关闭
		function close() {
			clear();
			visible.value = false;
			emit("close");
		}

		// 清空
		function clear() {
			clearInterval(timer);
			clearTimeout(timer);
			timer = null;
		}

		onMounted(() => {
			refresh();
		});

		onUnmounted(() => {
			clear();
		});

		return {
			visible,
			scroll,
			list,
			transition,
			refresh,
			close,
			clear,
			parseRpx,
		};
	},
});
</script>
