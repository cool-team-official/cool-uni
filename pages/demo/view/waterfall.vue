<template>
	<cl-page :padding="20">
		<cl-waterfall ref="Waterfall" :column="2">
			<template #default="{ list }">
				<cl-waterfall-column v-for="(item, index) in list" :key="index">
					<view class="goods-item" v-for="(item2, index2) in item" :key="index2">
						<image :src="item2.url" mode="widthFix"></image>
						<cl-text :value="item2.title" :margin="20" :line-height="1.5" />
					</view>
				</cl-waterfall-column>
			</template>
		</cl-waterfall>

		<cl-loadmore :loading="loading" :divider="false"></cl-loadmore>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { usePager } from "/@/cool";

const { onRefresh, onData } = usePager();

const Waterfall = ref<ClWaterfall.Ref>();

const loading = ref(false);

function refresh(params?: any) {
	const { data, next } = onRefresh(params);

	onData((list) => {
		if (data.page == 1) {
			Waterfall.value?.refresh(list);
		} else {
			Waterfall.value?.append(list);
		}
	});

	loading.value = true;

	return next(
		new Promise((resolve) => {
			setTimeout(() => {
				loading.value = false;

				resolve({
					list: [
						{
							title: "Watslim 擦窗机器人全自动智能遥控电动擦窗机神器 智能款",
							url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F47d3d4dab03cd71a8800c389d4dd8d5928ab826c37ac3-Vck8iS_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654339724&t=ec32099a3891504569cb6ec390154c54",
						},
						{
							title: "富士instax立拍立得 一次成像相机 mini11 冰晶白",
							url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Feed5cf6958521b0b9e36bb9f28b90d59caffa5e1a661-MdQUZ1_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654339724&t=16e5d80bab1e1fb385c3e8e14d11e0dd",
						},
						{
							title: "syitren Syitren PARON赛塔林黑胶唱片机HIFi复古",
							url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F438d277c48a7364d7f5c9947e5cab9b8928de5131b023-llMbUl_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654339724&t=c648048f6b243018dc3d98c4c2191d15",
						},
						{
							title: "华为路由AX3 凌霄双核/wifi6/智能分频3000M/高速路由器",
							url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fed5b7cc0611afb58821f6efa2ccbfc9f9c3f14c11c3a1-2dUtHQ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654339724&t=2d4e188339ad12fdceac4217ed6e0e5e",
						},
						{
							title: "千幻魔镜 十代 vr眼镜手机VR 智能3D眼镜VR游戏头盔",
							url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F111d7605120959a2ca836310277f8daf42855ec639e87-kzE5gK_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654339724&t=5e37c84f9f506f05e812031c660fe56b",
						},
						{
							title: "神火（supfire） X60-T强光手电筒变焦远射USB充电式",
							url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8813230e61b64518e74f2b1b088e96036d62d79231874-bkqhNM_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654339724&t=0ac1b94c1d8e7478c122dadcd6b3915b",
						},
					],
					pagination: {
						total: 100,
						page: data.page,
						size: 20,
					},
				});
			}, 1000);
		}),
	);
}

onReady(() => {
	refresh();
});

defineExpose({
	refresh,
});
</script>

<style lang="scss" scoped>
.goods-item {
	margin-bottom: 20rpx;
	border: $cl-border-width solid #eee;
	border-radius: 16rpx;
	overflow: hidden;
	background-color: #fff;

	image {
		display: block;
		width: 100%;
	}
}
</style>
