<template>
	<cl-page>
		<view class="page-user-edit">
			<cl-topbar title="编辑">
				<template #append>
					<!-- #ifndef MP -->
					<button class="save-btn" @tap="save">保存</button>
					<!-- #endif -->
				</template>
			</cl-topbar>

			<view class="form">
				<cl-form label-position="top">
					<cl-form-item label="昵称">
						<cl-input v-model="form.nickName" type="nickname" :border="false" />
					</cl-form-item>
				</cl-form>
			</view>

			<!-- #ifdef MP -->
			<view class="next">
				<cl-button :width="220" round type="primary">保存</cl-button>
			</view>
			<!-- #endif -->
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";

const { router } = useCool();
const { user } = useStore();
const ui = useUi();

const form = reactive(user.info || {});

function save() {
	user.update(form);
	ui.showToast("更新用户信息成功");
	router.back();
}
</script>

<style lang="scss" scoped>
.page-user-edit {
	.form {
		padding: 20rpx 24rpx;
	}

	.next {
		padding: 20rpx 24rpx;
		display: flex;
		justify-content: center;
	}

	.save-btn {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 30rpx;
		margin: 0;
		line-height: normal;
		font-size: 28rpx;
		color: $cl-color-primary;
		background-color: transparent;

		&::after {
			border: 0;
		}
	}
}
</style>
