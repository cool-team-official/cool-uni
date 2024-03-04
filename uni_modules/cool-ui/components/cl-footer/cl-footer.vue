<template>
	<view class="cl-footer__wrap">
		<view class="cl-footer__placeholder" :style="{ height }"></view>

		<view
			class="cl-footer"
			:class="{
				'is-border': border,
			}"
			:style="{
				backgroundColor,
				visibility: height != '0px' ? 'visible' : 'hidden',
			}"
		>
			<view
				class="cl-footer__inner"
				:class="{
					'is-flex': flex,
				}"
				:style="{
					padding: parseRpx(padding),
				}"
			>
				<slot> </slot>
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
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		padding: {
			type: [String, Number],
			default: "24rpx 36rpx",
		},
		border: Boolean,
		flex: {
			type: Boolean,
			default: true,
		},
		delay: {
			type: Number,
			default: 0,
		},
		vt: null,
		vh: Number,
	},

	setup(props) {
		const instance = getCurrentInstance();

		const height = ref();

		watch(
			() => props.vt,
			() => {
				update();
			},
			{
				deep: true,
			}
		);

		const vh = computed(() => {
			let v = 0;

			if (props.vh) {
				v = props.vh;
			} else {
				const [top, right, bottom, left] = parseRpx(props.padding).split(" ");

				if (top && bottom) {
					v = parseInt(top) + parseInt(bottom);
				} else if (top) {
					v = parseInt(top) * 2;
				}
			}

			return uni.upx2px(v);
		});

		async function update() {
			await sleep(props.delay);
			await nextTick();

			uni.createSelectorQuery()
				.in(instance?.proxy)
				.select(".cl-footer")
				.boundingClientRect((rect) => {
					if (rect) {
						const a = Math.floor(rect.height || 0);
						const b = Math.floor(vh.value);

						height.value = a > b ? `${rect.height}px` : "0px";
					}
				})
				.exec();
		}

		onMounted(() => {
			update();
		});

		return {
			height,
			update,
			parseRpx,
		};
	},
});
</script>
