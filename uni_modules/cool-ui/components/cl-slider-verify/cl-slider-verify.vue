<template>
	<cl-popup
		v-model="visible"
		show-close-btn
		:border-radius="32"
		@opened="onOpened"
		@closed="onClosed"
	>
		<div class="cl-slider-verify">
			<text class="cl-slider-verify__title">{{ title || $t("拖动验证") }}</text>

			<!-- 填充 -->
			<view class="cl-slider-verify__fill" v-if="type == 'fill'">
				<view class="cl-slider-verify__fill-icon cl-icon-refresh" @tap="refresh"></view>

				<image class="cl-slider-verify__fill-cover" :src="image" mode="aspectFill" />

				<view
					class="cl-slider-verify__fill-source"
					:style="{
						left: `${source.x}px`,
					}"
				>
					<image
						:src="image"
						:style="{
							left: `-${target.x}rpx`,
						}"
						mode="aspectFill"
					/>
				</view>

				<view
					class="cl-slider-verify__fill-target"
					:style="{
						left: `${target.x}rpx`,
					}"
				></view>
			</view>

			<!-- 旋转 -->
			<view class="cl-slider-verify__rotate" v-else-if="type == 'rotate'">
				<image
					class="cl-slider-verify__rotate-cover"
					:src="image"
					:style="{
						transform: `rotate(${source.x + target.x}deg)`,
					}"
					mode="aspectFill"
				/>
			</view>

			<!-- 拖动 -->
			<view
				class="cl-slider-verify__drag"
				:class="[`is-${status}`]"
				@touchend="onTouchend"
				@mouseup="onTouchend"
			>
				<view
					class="cl-slider-verify__drag-active"
					:class="{
						active: source.x > 0,
					}"
					:style="{
						width: `${source.x}px`,
					}"
				></view>

				<view class="cl-slider-verify__drag-placeholder">{{ placeholder }}</view>

				<movable-area class="cl-slider-verify__drag-inner" v-if="show">
					<movable-view
						class="cl-slider-verify__drag-block"
						:x="source.x"
						:disabled="lock"
						:animation="false"
						direction="horizontal"
						@change="onChange"
					>
						<text class="cl-icon-check" v-if="status == 'success'"></text>
						<text class="cl-icon-close" v-else-if="status == 'fail'"></text>
						<text class="cl-icon-arrow-right" v-else></text>
					</movable-view>
				</movable-area>
			</view>
		</div>
	</cl-popup>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { ref, defineComponent, computed, reactive, nextTick } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "cl- slider-verify",

	props: {
		type: {
			type: String as PropType<"fill" | "rotate">,
			default: "fill",
		},
		image: {
			type: String,
			default: "",
		},
		// rotate 2倍
		offset: {
			type: Number,
			default: 5,
		},
		title: String,
		placeholder: String,
	},

	emits: ["success", "fail"],

	setup(props, { emit }) {
		const { t } = useI18n();

		const visible = ref(false);
		const show = ref(false);
		const lock = ref(true);

		const placeholder = computed(() => {
			if (props.placeholder) {
				return props.placeholder;
			} else {
				return props.type == "fill"
					? t("请向右拖动滑块完成拼图")
					: t("请拖动滑块旋转至正确位置");
			}
		});

		// 状态 success 成功 fail 失败
		const status = ref("wait");

		// 拖动
		const source = reactive({
			x: 0,
		});

		// 目标
		const target = reactive({
			x: 0,
		});

		function refresh() {
			clear();

			if (props.type == "fill") {
				target.x = Math.ceil(Math.random() * 250) + 200;
			}

			if (props.type == "rotate") {
				target.x = Math.ceil(Math.random() * 180) + 150;
			}
		}

		function clear() {
			source.x = 0;
			status.value = "wait";
			lock.value = false;
		}

		function open() {
			visible.value = true;

			nextTick(() => {
				refresh();
			});
		}

		function onOpened() {
			show.value = true;
			lock.value = false;
		}

		function close() {
			visible.value = false;
		}

		function onClosed() {
			show.value = false;
		}

		function onChange(e: any) {
			if (!lock.value) {
				switch (props.type) {
					case "fill":
						source.x = e.detail.x;
						break;
					case "rotate":
						source.x = e.detail.x;
						break;
				}
			}
		}

		function toFail() {
			status.value = "fail";
			emit("fail");

			setTimeout(() => {
				clear();
			}, 500);
		}

		function toSuccess() {
			status.value = "success";
			emit("success");
			close();
		}

		function onTouchend() {
			if (lock.value) {
				return;
			}

			lock.value = true;

			if (props.type == "fill") {
				if (Math.abs(source.x - uni.upx2px(target.x)) <= props.offset) {
					toSuccess();
				} else {
					toFail();
				}
			} else if (props.type == "rotate") {
				const r = (source.x + target.x) % 360;
				const v = props.offset * 2;

				if (r <= v) {
					toSuccess();
				} else if (Math.abs(r - 360) <= v) {
					toSuccess();
				} else {
					toFail();
				}
			}
		}

		return {
			show,
			visible,
			lock,
			status,
			source,
			target,
			placeholder,
			open,
			onOpened,
			close,
			onClosed,
			onChange,
			onTouchend,
			refresh,
		};
	},
});
</script>
