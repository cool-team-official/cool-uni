<template>
	<cl-page background-color="#fff">
		<cl-topbar :border="false" background-color="transparent" />

		<view class="page-login">
			<!-- Logo -->
			<view class="logo">
				<image src="/static/logo.png" mode="aspectFill" />
				<text>{{ app.info.name }}</text>
			</view>

			<div class="container">
				<!-- 登录方式 -->
				<view class="mode" :class="[`is-${mode}`]">
					<!-- 手机号 -->
					<template v-if="mode == 'phone'">
						<text class="label">{{ t("手机号登录") }}</text>

						<view class="phone">
							<text>+86</text>
							<cl-input
								v-model="phone"
								type="number"
								:placeholder="t('请填写手机号码')"
								:border="false"
								:maxlength="11"
								:font-size="30"
								background-color="transparent"
							/>
						</view>

						<sms-btn
							:ref="setRefs('smsBtn')"
							:phone="phone"
							@success="phoneLogin(false)"
						>
							<template #default="{ disabled, btnText }">
								<cl-button
									custom
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
					</template>

					<!-- 微信登录 -->
					<template v-else-if="mode == 'wx'">
						<cl-button
							custom
							type="primary"
							:height="90"
							:font-size="30"
							:loading="loading"
							@tap="wxLogin"
						>
							{{ t("微信一键登录") }}
						</cl-button>
					</template>

					<!-- 协议 -->
					<view class="agree">
						<agree-btn :ref="setRefs('agreeBtn')" />
					</view>
				</view>
			</div>

			<!-- 其他登录方式 -->
			<view class="other" v-if="!isEmpty(platformsEnv)">
				<cl-divider width="400rpx" background-color="#ffffff">
					<cl-text color="#ccc" :value="t('其他登录方式')" />
				</cl-divider>

				<view class="platform">
					<view
						class="platform__item"
						v-for="(item, index) in platformsEnv"
						:key="index"
						@tap="changeMode(item)"
					>
						<image :src="item.icon" mode="aspectFit" v-if="item.icon" />
						<text>{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 用户信息完善 -->
		<cl-popup
			v-model="edit.visible"
			direction="bottom"
			:border-radius="[32, 32, 0, 0]"
			show-close-btn
			@close="edit.onClose"
		>
			<div class="edit-popup">
				<cl-text block bold :size="32">{{ t("获取你的头像、昵称") }}</cl-text>
				<cl-text block :margin="[24, 0, 50, 0]" color="info">
					{{ t("用于向用户提供有辨识度的界面") }}
				</cl-text>

				<cl-list :margin="[0, -12, 60, -12]" :border="false">
					<cl-list-item :label="t('头像')" :arrow-icon="false">
						<button
							class="avatar"
							open-type="chooseAvatar"
							@chooseavatar="edit.uploadAvatar"
						>
							<cl-avatar
								round
								:size="80"
								:src="edit.form.avatarUrl"
								:margin="[0, 1, 0, 0]"
							/>
						</button>
					</cl-list-item>

					<cl-list-item :label="t('昵称')" :arrow-icon="false">
						<input
							class="name"
							v-model="edit.form.nickName"
							type="nickname"
							:placeholder="t('请填写昵称、限16个字符或汉字')"
							maxlength="16"
						/>
					</cl-list-item>
				</cl-list>

				<cl-button fill type="primary" :height="90" :font-size="30" @tap="edit.save">
					{{ t("保存") }}
				</cl-button>
			</div>
		</cl-popup>
	</cl-page>
</template>

<script lang="ts" setup>
import { ctx } from "virtual:ctx";
import { computed, reactive, ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { config } from "/@/config";
import { cloneDeep, isEmpty } from "lodash-es";
import { useI18n } from "vue-i18n";
import SmsBtn from "/@/components/sms-btn.vue";
import AgreeBtn from "/@/components/agree-btn.vue";

interface Platform {
	label: string;
	value: any;
	icon?: string;
	hidden?: boolean;
	onClick?: () => void;
}

type LoginType = "mini" | "mp" | "uniPhone" | "";

const { service, router, refs, setRefs, storage, upload } = useCool();
const { user } = useStore();
const app = useApp();
const ui = useUi();
const wx = useWx();
const { t } = useI18n();
// 登录中
const loading = ref(false);

// 手机号
const phone = ref(storage.get("phone") || "");

// 登录类型
const type = ref<LoginType>("");

// 登录方式
const mode = ref();

// 登录平台
const platforms = ref<Platform[]>([
	{
		label: t("通过手机登录"),
		value: "phone",
		icon: "/pages/user/static/icon/phone.png",
		hidden: false,
	},

	{
		label: t("通过微信登录"),
		value: "wx",
		icon: "/pages/user/static/icon/wx.png",
		hidden: true,
	},
]);

// 环境校验
const platformsEnv = computed(() => {
	let arr = cloneDeep(platforms.value);

	// #ifdef H5
	if (wx.isWxBrowser()) {
		arr[1].hidden = false;
	}
	// #endif

	// #ifdef MP-WEIXIN
	arr[1].hidden = false;
	// #endif

	// 过滤隐藏的
	arr = arr.filter((e) => !e.hidden);

	// 默认第一个登录方式
	if (!mode.value) {
		mode.value = arr[0]?.value;
	}

	// 过滤不是当前登录方式
	return arr.filter((e) => e.value != mode.value);
});

// 切换方式
function changeMode(item: Platform) {
	if (item.onClick) {
		item.onClick();
	} else {
		mode.value = item.value;
	}
}

// 登录请求
async function reqLogin(key: LoginType, data: any) {
	type.value = key;

	service.user.login[key](data)
		.then(async (res) => {
			// 设置token
			user.setToken(res);

			// 获取用户信息
			await user.get();

			// 检测是否需要编辑
			edit.check();
		})
		.catch((err) => {
			ui.showTips(err.message);
			wx.getCode();
		});
}

// 登录跳转
function nextLogin() {
	router.nextLogin(type.value);
}

// 短信登录
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
				title: t("温馨提示"),
				message: t("您还未安装微信~"),
				showCancelButton: false,
				confirmButtonText: t("去下载"),
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
				await reqLogin("mini", res);
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
			await reqLogin("mp", { code });
			ui.hideLoading();
		}
	});
	// #endif
}

// 协议检测
function check(cb: () => void) {
	if (refs.agreeBtn.check()) {
		cb();
	}
}

// 手机号一键登录
const univerify = reactive({
	error: "",

	check() {
		// #ifdef APP
		uni.preLogin({
			provider: "univerify",
			success() {
				platforms.value.push({
					label: t("手机号一键登录"),
					value: "univerify",
					onClick() {
						univerify.login();
					},
				});
			},
			fail(err) {
				univerify.error =
					err.metadata?.msg || t("当前环境不支持一键登录，请切换至验证码登录");
			},
		});
		// #endif
	},

	login() {
		uni.login({
			provider: "univerify",
			univerifyStyle: {
				authButton: {
					normalColor: "#6b69f8",
					highlightColor: "#6b69f8",
					disabledColor: "#73aaf5",
					textColor: "#ffffff",
					title: t("一键登录"),
					borderRadius: "12px",
				},
				privacyTerms: {
					defaultCheckBoxState: true, // 条款勾选框初始状态
					textColor: "#BBBBBB",
					termsColor: "#5496E3",
					prefix: t("我已阅读并同意"),
					suffix: t("并使用本机号码登录"),

					privacyItems: [
						// 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
						{
							url: `${config.baseUrl}/app/base/comm/html?key=userAgreement`,
							title: t("用户协议"),
						},

						{
							url: `${config.baseUrl}/app/base/comm/html?key=privacyPolicy`,
							title: t("隐私政策"),
						},
					],
				},
			},
			async success(res: { authResult: any }) {
				await reqLogin("uniPhone", {
					appId: ctx.appid,
					...res.authResult,
				});

				uni.closeAuthView();
			},
			fail() {
				if (univerify.error) {
					ui.showToast(univerify.error);
				}
			},
		});
	},
});

// 手机号一键登录环境检测
univerify.check();

// 信息完善
// - 微信小程序登录后
const edit = reactive({
	visible: false,

	form: {
		avatarUrl: "",
		nickName: "",
	},

	check() {
		if (type.value == "mini" && user.info?.nickName == "微信用户") {
			edit.open();
		} else {
			nextLogin();
		}
	},

	open() {
		edit.visible = true;
	},

	close() {
		edit.visible = false;
	},

	onClose() {
		nextLogin();
	},

	uploadAvatar(e: { detail: { avatarUrl: string } }) {
		upload({ path: e.detail.avatarUrl })
			.then((url) => {
				edit.form.avatarUrl = url;
			})
			.catch((err) => {
				ui.showToast(err.message);
			});
	},

	save() {
		if (!edit.form.avatarUrl) {
			return ui.showToast(t("请上传头像"));
		}

		if (!edit.form.nickName) {
			return ui.showToast(t("请输入昵称"));
		}

		user.update(edit.form);
		edit.close();
	},
});

onReady(() => {
	// 公众号登录授权回调
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
			border-radius: 24rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 25rpx 30rpx -25rpx #666666;
			background-color: #2c3142;
			padding: 20rpx;
			box-sizing: border-box;
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
					border-radius: $cl-border-radius;
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

.edit-popup {
	padding: 12rpx 0;

	.avatar {
		background-color: #fff;
		padding: 0;
		margin: 0;

		&::after {
			border: 0;
		}
	}

	.name {
		font-size: 28rpx;
		text-align: right;
		width: 100%;
	}
}
</style>
