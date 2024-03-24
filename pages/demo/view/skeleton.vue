<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<view class="count">
				<view class="item" v-for="(item, index) in list" :key="index">
					<cl-skeleton
						:height="120"
						:width="120"
						:radius="120"
						:margin="[0, 0, 20, 0]"
						:loading="!item.avatar"
					>
						<cl-image
							:radius="120"
							:src="item.avatar"
							background-color="#fff"
							v-if="item.avatar"
						/>
					</cl-skeleton>

					<cl-skeleton
						:custom-style="{
							height: '28rpx',
							width: '90rpx',
							borderRadius: '6rpx',
						}"
						:loading="!item.name"
					>
						<cl-text :size="24" align="center" block>{{ item.name }}</cl-text>
					</cl-skeleton>
				</view>
			</view>
		</cl-card>

		<cl-card label="基础用法2">
			<cl-banner :list="list" type="card" :height="300">
				<template #item="{ item }">
					<cl-skeleton :radius="12">
						<image
							class="cl-banner-item__image"
							:src="item.bg"
							mode="aspectFill"
							v-if="item.bg"
						/>
					</cl-skeleton>
				</template>
			</cl-banner>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { uniqueId } from "lodash-es";
import { ref } from "vue";

const list = ref<any[]>([{}, {}, {}, {}]);

function get() {
	setTimeout(() => {
		list.value = list.value.map((_, i) => {
			return {
				id: uniqueId(),
				avatar: `/pages/demo/static/avatar${i + 1}.png`,
				bg: `/pages/demo/static/bg${i + 1}.png`,
				name: ["小青", "小白", "小黑", "笑死"][i],
			};
		});
	}, 3000);
}

onReady(() => {
	get();
});
</script>

<style lang="scss" scoped>
.count {
	display: flex;
	padding: 20rpx 0;

	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200rpx;
	}
}
</style>
