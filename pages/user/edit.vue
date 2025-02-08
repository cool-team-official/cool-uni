<template>
	<cl-page>
		<view class="page">
			<view class="form">
				<cl-form label-position="top">
					<cl-form-item :label="t('昵称')">
						<cl-input
							v-model="form.nickName"
							type="nickname"
							:border="false"
							:height="80"
							:border-radius="12"
							:placeholder="t('请填写昵称')"
						/>
					</cl-form-item>
				</cl-form>
			</view>

			<cl-footer>
				<cl-button custom type="primary" :loading="loading" @tap="save">
					{{ t("保存") }}
				</cl-button>
			</cl-footer>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { onReady } from "@dcloudio/uni-app";
import { useI18n } from "vue-i18n";

const { router } = useCool();
const { user } = useStore();
const ui = useUi();
const { t } = useI18n();

const loading = ref(false);

const form = reactive({
	nickName: "",
});

async function save() {
	loading.value = true;

	await user.update(form).catch((err) => {
		ui.showToast(err.message);
	});

	loading.value = false;

	ui.showTips(t("用户信息保存成功"), () => {
		router.back();
	});
}

onReady(() => {
	form.nickName = user.info?.nickName || "";
});
</script>

<style lang="scss" scoped>
.page {
	.form {
		padding: 20rpx 24rpx;
	}
}
</style>
