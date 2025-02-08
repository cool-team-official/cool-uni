<template>
	<cl-popup v-model="visible" direction="bottom" :padding="0">
		<view class="cl-pay">
			<view class="cl-pay__title">{{ t("选择支付方式") }}</view>

			<!-- 选择方式 -->
			<view class="cl-pay__container">
				<template v-for="(item, index) in methods">
					<view class="cl-pay__item" :key="index" v-if="!item.hidden" @tap="choose(item)">
						<image class="cl-pay__icon" :src="item.icon" mode="aspectFit" />
						<text class="cl-pay__label">{{ item.label }}</text>
					</view>
				</template>
			</view>

			<view class="cl-pay__footer" @tap="close">{{ t("取消支付") }}</view>
		</view>
	</cl-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IconWx from "./wx.png";
import IconAli from "./ali.png";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "cl-pay",

	setup(_, { emit }) {
		const { t } = useI18n();

		// 是否可见
		const visible = ref(false);

		// 回掉
		let cb: any = null;

		// 支付方式
		const methods = ref<ClPay.Item[]>([
			{
				label: t("微信支付"),
				value: "wxpay",
				icon: IconWx,
			},

			{
				label: t("支付宝支付"),
				value: "alipay",
				icon: IconAli,
			},
		]);

		// 打开
		function open(options?: ClPay.Options) {
			const { list, callback } = options || {};

			if (list) {
				methods.value = list;
			}

			cb = callback;
			visible.value = true;
		}

		// 关闭
		function close() {
			visible.value = false;
		}

		// 选择
		function choose(item: ClPay.Item) {
			close();
			emit("choose", item);

			if (cb) {
				cb(item);
			}
		}

		return {
			visible,
			methods,
			open,
			close,
			choose,
		};
	},
});
</script>
