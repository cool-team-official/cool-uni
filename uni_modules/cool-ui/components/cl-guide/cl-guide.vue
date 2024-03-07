<template>
	<view class="cl-guide">
		<slot></slot>

		<!-- 遮罩层 -->
		<view
			class="cl-guide__mask"
			:style="{
				'mix-blend-mode': mode,
			}"
			v-if="visible"
		>
			<!-- 显示区域 -->
			<!-- @ts-ignore -->
			<view
				class="cl-guide__display"
				:style="[display.style, step.style] as any"
				@tap="onTap"
			></view>

			<!-- 工具 -->
			<view class="cl-guide__tools" :class="[step.justify]" :style="tools.style" v-if="step">
				<slot name="tools" :step="step" :current="current">
					<!-- 图片 -->
					<image
						class="cl-guide__image"
						:src="step.image.url"
						:style="[step.image.style] as any"
						v-if="step.image"
					/>

					<!-- 内容 -->
					<view class="cl-guide__content" v-if="step.content">
						{{ step.content }}
					</view>

					<!-- 按钮组 -->
					<view class="cl-guide__op is-left">
						<!-- 上一步按钮 -->
						<button @tap="toPrev" v-if="isPrev && step.showPrev">
							{{ step.prevText || "上一步" }}
						</button>
						<!-- 下一步按钮 -->
						<button @tap="toNext" v-if="isNext && step.showNext">
							{{ step.nextText || "下一步" }}
						</button>
						<!-- 跳过按钮 -->
						<button @tap="toSkip" v-if="step.showSkip">
							{{ step.skipText || "跳过" }}
						</button>
						<!-- 完成按钮 -->
						<button @tap="toDone" v-if="!isNext">
							{{ step.doneText || "完成" }}
						</button>
					</view>
				</slot>
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
	reactive,
	ref,
	watch,
	type PropType,
} from "vue";

export default defineComponent({
	name: "cl-guide",

	props: {
		// 当前步骤序号
		modelValue: {
			type: Number,
			default: 0,
		},
		// 选项
		mode: {
			type: String as PropType<"hard-light" | "darken">,
			default: "hard-light",
		},
	},

	setup(props, { emit }) {
		const { windowHeight } = uni.getSystemInfoSync();
		const { proxy }: any = getCurrentInstance();

		// 序号
		const current = ref(0);

		watch(
			() => props.modelValue,
			(val: number) => {
				current.value = val;
			},
			{
				immediate: true,
			},
		);

		// 是否可见
		const visible = ref(false);

		// 步骤列表
		const steps = ref<any[]>([]);

		// 显示样式
		const display = reactive({
			style: {},
		});

		// 工具按钮
		const tools = reactive({
			style: {},
		});

		// 当前步骤信息
		const step = computed(() => {
			const d = steps.value[current.value];

			if (d) {
				if (d.showPrev === undefined) {
					d.showPrev = true;
				}

				if (d.showNext === undefined) {
					d.showNext = true;
				}
			}

			return d;
		});

		// 是否有上一个
		const isPrev = computed(() => current.value > 0);

		// 是否有下一个
		const isNext = computed(() => current.value < steps.value.length - 1);

		// 设置数据
		function defineSteps(arr: any[]) {
			steps.value = arr;
		}

		// 开始
		function start(index: number) {
			visible.value = true;

			nextTick(() => {
				current.value = index || 0;
				init();
			});
		}

		// 关闭
		function close() {
			visible.value = false;
		}

		// 重置
		function reset() {
			current.value = 0;
		}

		// 初始化
		function init() {
			return Promise.all(
				steps.value.map((e) => {
					return new Promise((resolve) => {
						uni.createSelectorQuery()
							.select(e.selector)
							.boundingClientRect((res) => {
								e.rect = res;
								resolve(e);
							})
							.exec();
					});
				}),
			).then(() => {
				updateStyle();
			});
		}

		// 更新显示区域样式,工具栏样式
		function updateStyle() {
			let { height, width, left, top } = step.value.rect || {};

			display.style = {
				height: height + "px",
				width: width + "px",
				marginLeft: left + "px",
				marginTop: top + "px",
				"background-color": props.mode == "hard-light" ? "gray" : "#fff",
			};

			nextTick(() => {
				uni.createSelectorQuery()
					.in(proxy)
					.select(".cl-guide__tools")
					.boundingClientRect((res: any) => {
						let _top = top + height;

						if (top + height + res.height > windowHeight) {
							_top = top - res.height - 10;
						}

						tools.style = {
							top: _top + "px",
						};
					})
					.exec();
			});
		}

		// 上一步
		async function toPrev() {
			let prev = () => {
				if (isPrev.value) {
					current.value -= 1;
					onChange();
				}
			};

			if (step.value.onPrev) {
				await step.value.onPrev({
					prev,
					next: toNext,
					skip: toSkip,
					done: toDone,
					current: current.value,
					step: step.value,
				});
			} else {
				prev();
			}
		}

		// 下一步
		async function toNext() {
			let next = () => {
				if (isNext.value) {
					current.value += 1;
					onChange();
				}
			};

			if (step.value.onNext) {
				await step.value.onNext({
					next,
					prev: toPrev,
					skip: toSkip,
					done: toDone,
					current: current.value,
					step: step.value,
				});
			} else {
				next();
			}
		}

		// 跳过
		function toSkip() {
			close();
			emit("skip", current.value);
		}

		// 完成
		function toDone() {
			close();
			emit("done", step.value);
		}

		// 点击
		function onTap() {
			if (step.value.onClick) {
				step.value.onClick({
					next: toNext,
					prev: toPrev,
					skip: toSkip,
					done: toDone,
					current: current.value,
					step: step.value,
				});
			}
		}

		// 切换
		function onChange() {
			updateStyle();
			emit("change", current.value);
		}

		return {
			current,
			visible,
			steps,
			step,
			display,
			tools,
			isPrev,
			isNext,
			defineSteps,
			start,
			close,
			reset,
			toPrev,
			toNext,
			toSkip,
			toDone,
			onTap,
			onChange,
		};
	},
});
</script>
