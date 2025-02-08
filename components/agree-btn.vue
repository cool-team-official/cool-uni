<template>
	<cl-checkbox :size="34" v-model="agree" round>
		<view class="agree-btn">
			{{ $t("已阅读并同意") }}
			<text @tap.stop="toDoc('用户协议', 'userAgreement')">{{ $t("用户协议") }}</text>
			{{ $t("和") }}
			<text @tap.stop="toDoc('隐私政策', 'privacyPolicy')">{{ $t("隐私政策") }}</text>
		</view>
	</cl-checkbox>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCool } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { useI18n } from "vue-i18n";

const { router } = useCool();
const ui = useUi();
const { t } = useI18n();

const agree = ref(false);

function toDoc(title: string, key: string) {
	router.push({
		path: "/pages/user/doc",
		query: {
			title,
			key,
		},
	});
}

function check() {
	if (!agree.value) {
		ui.showToast(t("请先勾选同意后再进行登录"));
	}

	return agree.value;
}

defineExpose({
	check,
});
</script>

<style lang="scss" scoped>
.agree-btn {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	color: #999999;
	letter-spacing: 1rpx;

	text {
		color: $cl-color-primary;
		padding: 0 10rpx;
	}
}
</style>
