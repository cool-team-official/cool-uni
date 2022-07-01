<template>
	<cl-page>
		<view class="page-login">
			<cl-topbar
				:border="false"
				background-color="transparent"
				:show-back="false"
			></cl-topbar>

			<!-- Logo -->
			<view class="logo">
				<image src="/static/logo.png" alt="" />
				<text>{{ app.info.name }}</text>
			</view>

			<div class="container">
				<!-- 登录方式 -->
				<view class="mode" :class="[`is-${mode}`]">
					<!-- 手机号 -->
					<template v-if="mode == 'phone'">
						<text class="label">手机号登录</text>

						<view class="input">
							<text>+86</text>
							<input
								v-model="phone"
								type="number"
								placeholder="请输入手机号码"
								maxlength="11"
							/>
						</view>

						<view class="next-btn">
							<cl-button
								type="primary"
								fill
								:disabled="!phoneValid"
								:height="90"
								:loading="loading"
								@click="phoneLogin"
								>获取验证码</cl-button
							>
						</view>
					</template>

					<!-- 微信登录 -->
					<template v-else-if="mode == 'wx'">
						<cl-button type="primary" fill round :height="90" @click="wxLogin">
							通过微信登录
						</cl-button>
					</template>

					<!-- 协议 -->
					<view class="agree">
						<cl-checkbox :size="34" v-model="agree" round> </cl-checkbox>

						<view class="text">
							已阅读并同意
							<text @tap.stop="toText('用户协议')">《用户协议》</text>
							及
							<text @tap="toText('隐私政策')">《隐私政策》</text>
						</view>
					</view>
				</view>
			</div>

			<!-- 其他登录方式 -->
			<view class="other">
				<cl-divider width="400rpx">
					<cl-text color="#ccc" value="其他登录方式"></cl-text>
				</cl-divider>

				<view class="platform">
					<view
						class="platform__item"
						v-for="(item, index) in platforms"
						:key="index"
						@tap="changeMode(item.value)"
					>
						<image :src="item.icon" mode="aspectFit" />
						<text>{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useCool, useStore, useWx } from "/@/cool";

const { ui, service, router } = useCool();

// 应用缓存
const { app, user } = useStore();

// 微信
const wx = useWx();

// 是否同意
const agree = ref<boolean>(true);

// 加载状态
const loading = ref<boolean>(false);

// 手机号
const phone = ref<string>("13255022028");

// 手机号是否正确
const phoneValid = computed(() => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone.value));

// 登录平台
const platforms = ref<any[]>([
	{
		label: "通过手机登录",
		value: "phone",
		icon: "./static/icon/phone.png",
	},
	{
		label: "通过微信登录",
		value: "wx",
		icon: "./static/icon/wx.png",
		hidden: !wx.hasApp(),
	},
]);

// 登录方式
const mode = ref<string>("wx");

// 检测
function check(callback: () => void) {
	if (!agree.value) {
		return ui.showToast("请先勾选同意后再进行登录");
	}

	callback();
}

// 登录
async function nextLogin(req: Promise<any>) {
	check(() => {
		req.then((res) => {
			// 设置token
			user.setToken(res);

			// 设置用户信息
			user.set(res.userInfo);

			// 登录跳转
			router.nextLogin();
		}).catch((err) => {
			ui.showTips(err.message);
		});
	});
}

// 手机号登录
function phoneLogin() {
	check(async function () {
		loading.value = true;

		await service.user.user
			.getCode({
				phone: phone.value,
			})
			.then(() => {
				router.push({
					path: "/pages/user/captcha",
					mode: "redirectTo",
					query: {
						phone: phone.value,
					},
				});
			})
			.catch((err) => {
				ui.showTips(err.message);
			});

		loading.value = false;
	});
}

// 微信登录
function wxLogin() {
	check(() => {
		// #ifdef APP
		if (wx.hasApp()) {
			nextLogin(wx.appLogin());
		} else {
			ui.showConfirm({
				title: "温馨提示",
				message: "您还未安装微信~",
				showCancelButton: false,
				confirmButtonText: "去下载",
				callback(action) {
					if (action == "confirm") {
						wx.downloadApp();
					}
				},
			});
		}
		// #endif

		// #ifdef MP-WEIXIN
		nextLogin(wx.miniLogin());
		// #endif
	});
}

// 切换模式
function changeMode(value: string) {
	mode.value = value;
}

// 文案
function toText(name: string) {
	router.push({
		path: "/pages/comm/text",
		query: {
			name,
		},
	});
}
</script>

<style lang="scss" scoped>
.page-login {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #fff;

	.logo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 140rpx;

		image {
			display: block;
			height: 120rpx;
			width: 120rpx;
			border-radius: 20rpx;
			margin-bottom: 22rpx;
			box-shadow: 0 0 200rpx 10rpx $cl-color-primary;
		}

		text {
			font-size: 28rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;

		.mode {
			width: 100%;
			padding: 0 80rpx;
			box-sizing: border-box;

			.label {
				display: block;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 48rpx;
			}

			&.is-phone {
				.input {
					display: flex;
					align-items: center;
					background-color: #eeeeee;
					border-radius: 10rpx;
					height: 90rpx;
					margin-bottom: 26rpx;

					text {
						display: inline-block;
						padding: 0 24rpx 0 50rpx;
						border-right: 1rpx solid #d6d6d6;
						font-size: 28rpx;
						font-weight: bold;
						color: #404040;
					}

					input {
						height: 100%;
						flex: 1;
						padding: 0 30rpx;
						font-size: 28rpx;
					}
				}
			}

			.agree {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999999;
				font-size: 24rpx;
				margin-top: 38rpx;
				width: 100%;

				text {
					color: #000;
				}
			}
		}
	}

	.other {
		width: 100%;

		.platform {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 20rpx 0 60rpx 0;

			&__item {
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #000000;
				height: 30px;
				width: 130px;
				margin-bottom: 28rpx;
				border-radius: 6px;

				image {
					height: 32rpx;
					width: 32rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: #000000;
				}
			}
		}
	}
}
</style>
