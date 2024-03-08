<template>
	<cl-page background-color="#fff">
		<cl-topbar :border="false" background-color="transparent" />

		<view class="page-login">
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

						<view class="phone">
							<text>+86</text>
							<cl-input
								v-model="phone"
								type="number"
								placeholder="请输入手机号码"
								:border="false"
								:maxlength="11"
								:font-size="30"
								background-color="transparent"
							/>
						</view>

						<view class="next-btn">
							<sms-btn
								:ref="setRefs('smsBtn')"
								:phone="phone"
								@success="phoneLogin(false)"
							>
								<template #default="{ disabled, btnText }">
									<cl-button
										fill
										type="primary"
										:height="90"
										:font-size="30"
										:disabled="disabled"
										@tap="phoneLogin"
									>
										{{ btnText }}
									</cl-button>
								</template>
							</sms-btn>
						</view>
					</template>

					<!-- 微信登录 -->
					<template v-else-if="mode == 'wx'">
						<cl-button
							type="primary"
							fill
							:height="90"
							:font-size="30"
							:loading="loading"
							@tap="wxLogin"
						>
							微信一键登录
						</cl-button>
					</template>

					<!-- 协议 -->
					<view class="agree">
						<agree-btn :ref="setRefs('agreeBtn')" />
					</view>
				</view>
			</div>

			<!-- 其他登录方式 -->
			<view class="other" v-if="platforms.length > 0">
				<cl-divider width="400rpx" background-color="#ffffff">
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
import { onReady } from "@dcloudio/uni-app";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/$/cool-ui";
import SmsBtn from "/@/components/sms-btn.vue";
import AgreeBtn from "/@/components/agree-btn.vue";

const { service, router, refs, setRefs, storage } = useCool();
const { user } = useStore();
const app = useApp();
const ui = useUi();
const wx = useWx();

// 加载状态
const loading = ref(false);

// 手机号
const phone = ref(storage.get("phone") || "");

// 登录方式
const mode = ref();

// 登录平台
const platforms = getPlatforms();

// 获取登录平台
function getPlatforms() {
	let arr = [
		{
			label: "通过手机登录",
			value: "phone",
			icon: "/pages/user/static/icon/phone.png",
			hidden: false,
		},
		{
			label: "通过微信登录",
			value: "wx",
			icon: "/pages/user/static/icon/wx.png",
			hidden: true,
		},
	];

	// #ifdef H5
	if (wx.isWxBrowser()) {
		// 显示微信登录
		arr[1].hidden = false;
	}
	// #endif

	// #ifdef MP-WEIXIN
	arr[1].hidden = false;
	// #endif

	// 过滤
	arr = arr.filter((e) => !e.hidden);

	// 默认第一个登录方式
	mode.value = arr[0]?.value;

	return computed(() => arr.filter((e) => e.value != mode.value));
}

// 登录请求
async function nextLogin(key: "mini" | "mp", data: any) {
	return service.user.login[key](data)
		.then(async (res) => {
			// 设置token
			user.setToken(res);

			// 获取用户信息
			await user.get();

			// 登录跳转
			router.nextLogin();
		})
		.catch((err) => {
			ui.showTips(err.message);
		});
}

// 手机号登录
function phoneLogin(sms?: boolean) {
	if (sms) {
		check(() => {
			refs.smsBtn.open();
		});
	} else {
		storage.set("phone", phone.value);

		router.push({
			path: "/pages/user/captcha",
			query: {
				phone: phone.value,
			},
		});
	}
}

// 微信登录
function wxLogin() {
	check(async () => {
		// #ifdef APP
		if (wx.hasApp()) {
			wx.appLogin().then((code) => {
				//
			});
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
		loading.value = true;

		await wx
			.miniLogin()
			.then(async (res) => {
				await nextLogin("mini", res);
			})
			.catch((err) => {
				ui.showToast(err.message);
			});

		loading.value = false;
		// #endif

		// #ifdef H5
		wx.mpAuth();
		// #endif
	});
}

// 公众号登录
function mpLogin() {
	// #ifdef H5
	wx.mpLogin().then(async (code) => {
		if (code) {
			ui.showLoading();
			await nextLogin("mp", { code });
			ui.hideLoading();
		}
	});
	// #endif
}

// 切换模式
function changeMode(value: string) {
	mode.value = value;
}

// 检测
function check(cb: () => void) {
	if (refs.agreeBtn.check()) {
		cb();
	}
}

onReady(() => {
	mpLogin();
});
</script>

<style lang="scss" scoped>
.page-login {
	.logo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20%;

		image {
			display: block;
			height: 150rpx;
			width: 150rpx;
			border-radius: 100%;
			margin-bottom: 30rpx;
		}

		text {
			font-size: 36rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			color: #333;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 80rpx;

		.mode {
			width: 100%;
			padding: 0 80rpx;
			box-sizing: border-box;

			.label {
				display: block;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 30rpx;
			}

			&.is-phone {
				.phone {
					display: flex;
					align-items: center;
					background-color: #eeeeee;
					border-radius: 10rpx;
					height: 90rpx;
					margin-bottom: 30rpx;
					font-size: 30rpx;

					text {
						display: inline-block;
						padding: 0 40rpx;
						border-right: $cl-border-width solid $cl-border-color;
						font-weight: bold;
						color: #404040;
					}

					input {
						height: 100%;
						flex: 1;
						padding: 0 30rpx;
					}
				}
			}
		}

		.agree {
			text-align: center;
			margin: 50rpx -60rpx 0 0;
		}
	}

	.other {
		margin-top: 100rpx;

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
				background-color: #ffffff;

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
