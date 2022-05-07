<template>
	<cl-page>
		<view class="page-captcha">
			<cl-topbar :border="false"> </cl-topbar>

			<view class="container">
				<text class="label">输入验证码</text>
				<text class="tips">已发送至 +86 {{ form.phone }}</text>

				<view class="code">
					<cl-captcha
						v-model="form.code"
						:length="len"
						:gutter="26"
						@done="next"
					></cl-captcha>
				</view>

				<cl-button
					type="primary"
					:disabled="form.code.length !== len"
					:loading="saving"
					fill
					:height="92"
					@tap="next"
					>确定</cl-button
				>

				<view class="send">
					<cl-text
						color="#333"
						:size="26"
						:value="`重新获取（${countdown}s）`"
						v-if="countdown > 0"
					></cl-text>

					<cl-button size="mini" type="text" @tap="reSend" v-else>
						重新获取验证码
					</cl-button>
				</view>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import { useCool, useStore } from "/@/cool";

const { service, ui, router } = useCool();
const { user } = useStore();

// 倒计时
const countdown = ref<number>(60);

// 验证码长度
const len = 4;

// 保存状态
const saving = ref<boolean>(false);

// 表单
const form = reactive<any>({
	code: "",
	phone: router.query.phone || "",
});

// 开始倒计时
function startCountdown() {
	countdown.value = 60;

	const timer = setInterval(() => {
		countdown.value--;

		if (countdown.value < 1) {
			clearInterval(timer);
		}
	}, 1000);
}

// 重新发送短信
function reSend() {
	service.user.user
		.getCode({
			phone: form.phone,
		})
		.then(() => {
			startCountdown();
			ui.showToast("短信已发送，请查收");
		})
		.catch((err) => {
			ui.showToast(err.message);
		});
}

// 下一步
function next() {
	saving.value = true;

	service.user.user
		.loginByCode(form)
		.then(async (res) => {
			// 设置token
			user.setToken(res);

			// 设置用户信息
			await user.get();

			// 登录跳转
			router.nextLogin();
		})
		.catch((err) => {
			ui.showTips(err.message || "登录失效，请重试~");
			saving.value = false;
			form.code = "";
		});
}

onReady(() => {
	startCountdown();
});
</script>

<style lang="scss" scoped>
.page-captcha {
	background-color: #fff;
	height: 100%;

	.container {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: 0 auto;
		padding-top: 140rpx;
	}

	.label {
		font-size: 52rpx;
		font-weight: 500;
		margin-bottom: 44rpx;
		font-weight: bold;
		color: #151515;
	}

	.tips {
		font-size: 28rpx;
		color: #151515;
		font-weight: 500;
	}

	.code {
		margin: 34rpx -26rpx 62rpx -26rpx;
	}

	.send {
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		margin-top: 30rpx;
	}
}
</style>
