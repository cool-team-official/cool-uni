<template>
	<cl-page>
		<view class="page-set">
			<template v-if="user.info">
				<cl-text value="账号" :margin="[0, 0, 20, 20]" block />

				<cl-list :radius="16">
					<cl-list-item label="头像" :arrow-icon="false">
						<view class="avatar">
							<!-- #ifdef MP-WEIXIN -->
							<button open-type="chooseAvatar" @chooseavatar="uploadAvatar">
								<cl-avatar round :size="88" :src="user.info.avatarUrl" />
							</button>
							<!-- #endif -->

							<!-- #ifndef MP-WEIXIN -->
							<cl-avatar
								round
								:size="88"
								:src="user.info.avatarUrl"
								@tap="uploadAvatar()"
							/>
							<!-- #endif -->
						</view>
					</cl-list-item>
					<cl-list-item label="昵称" @tap="router.push('/pages/user/edit')">
						<cl-text :value="user.info.nickName" />
					</cl-list-item>
					<cl-list-item label="手机号" :arrow-icon="false">
						<cl-text :value="user.info.phone" />
					</cl-list-item>
					<cl-list-item label="ID" :arrow-icon="false" :border="false">
						<cl-text :value="user.info.id" />
					</cl-list-item>
				</cl-list>
			</template>

			<cl-text value="关于" :margin="[30, 0, 20, 20]" block />

			<cl-list :radius="16">
				<cl-list-item label="关于我们" @tap="router.push('/pages/user/about')" />

				<cl-list-item
					label="用户协议"
					@tap="
						router.push({
							path: '/pages/user/doc',
							query: {
								key: 'userAgreement',
								title: '用户协议',
							},
						})
					"
				/>
				<cl-list-item
					label="隐私政策"
					@tap="
						router.push({
							path: '/pages/user/doc',
							query: {
								key: 'privacyPolicy',
								title: '隐私政策',
							},
						})
					"
				/>

				<cl-list-item label="软件升级" :arrow-icon="false" :border="false">
					<cl-loading :size="20" v-if="app.version.loading" />

					<template v-else>
						<cl-text
							:value="`新版本 v${app.version.num}`"
							color="red"
							v-if="app.version.isUpgrade"
						/>
						<cl-text value="已经是最新版本" v-else />
					</template>
				</cl-list-item>
			</cl-list>

			<cl-list :radius="16">
				<cl-list-item label="切换账号" @tap="router.push('/pages/user/login')" />
				<cl-list-item label="退出登录" :arrow-icon="false" @tap="user.logout()">
					<cl-icon :size="36" name="exit" />
				</cl-list-item>
			</cl-list>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { useApp, useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";

const { router, upload } = useCool();
const { user } = useStore();
const app = useApp();
const ui = useUi();

// 上传头像
function uploadAvatar(e?: { detail: { avatarUrl: string } }) {
	function next(path: string) {
		upload({ path }).then((url) => {
			ui.showToast("头像更新成功");

			user.update({
				avatarUrl: url,
			});
		});
	}

	if (e) {
		next(e.detail.avatarUrl);
	} else {
		uni.chooseImage({
			count: 1,
			success(res) {
				next(res.tempFiles[0].path);
			},
		});
	}
}

onReady(() => {
	app.version.check();
	user.get();
});
</script>

<style lang="scss" scoped>
.page-set {
	padding: 20rpx 24rpx;

	.avatar {
		padding: 10rpx 0;

		button {
			padding: 0;
			margin: 0;
			line-height: normal;
			background-color: transparent;

			&::after {
				border: 0;
			}
		}
	}
}
</style>
