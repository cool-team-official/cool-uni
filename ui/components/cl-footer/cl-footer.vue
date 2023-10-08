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
import { parseRpx } from "/@/cool/utils";

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
			await nextTick();

			uni.createSelectorQuery()
				.in(instance?.proxy)
				.select(".cl-footer")
				.boundingClientRect((rect) => {
					if (rect) {
						height.value = (rect.height || 0) > vh.value ? `${rect.height}px` : "0px";
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
