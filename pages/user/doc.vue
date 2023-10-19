<template>
	<view class="doc mp-html">
		<mp-html :content="content"></mp-html>
	</view>
</template>

<script setup lang="ts">
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useCool } from "/@/cool";
// @ts-ignore
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html";

const { router, service } = useCool();

const content = ref("");

onReady(() => {
	const { title, key } = router.query;

	uni.setNavigationBarTitle({
		title,
	});

	service.base.comm
		.param({
			key,
		})
		.then((res) => {
			content.value = res;
		});
});
</script>

<style lang="scss" scoped>
.doc {
	padding: 20rpx;
}
</style>
