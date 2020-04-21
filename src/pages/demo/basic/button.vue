<template>
	<view class="demo-button">
		<cl-card label="默认按钮">
			<cl-button :type="item.value" v-for="(item, index) in list" :key="index">
				<text>{{ item.label }}</text>
			</cl-button>
		</cl-card>

		<cl-card label="朴素按钮">
			<cl-button :type="item.value" plain v-for="(item, index) in list" :key="index">
				{{ item.label }}
			</cl-button>
		</cl-card>

		<cl-card label="圆角按钮">
			<cl-button :type="item.value" round v-for="(item, index) in list" :key="index">
				{{ item.label }}
			</cl-button>
		</cl-card>

		<cl-card label="图标按钮">
			<cl-button type="primary" icon="cl-icon-arrow-left">
				上一页
			</cl-button>
			<cl-button type="primary">
				下一页
				<text class="cl-icon-arrow-right"></text>
			</cl-button>
			<cl-button type="primary" icon="cl-icon-search">
				搜索
			</cl-button>
		</cl-card>

		<cl-card label="文字按钮">
			<cl-button type="text">
				<text>文字按钮</text>
			</cl-button>

			<cl-button type="text" disabled>
				<text>文字按钮</text>
			</cl-button>
		</cl-card>

		<cl-card label="按钮阴影">
			<cl-button type="primary" shadow>
				<text>图标按钮</text>
			</cl-button>
		</cl-card>

		<cl-card label="其他按钮">
			<cl-button disabled>
				禁用按钮
			</cl-button>
			<cl-button type="success" loading>
				加载中
			</cl-button>
		</cl-card>

		<cl-card label="按钮尺寸">
			<cl-button size="default">
				<text>默认按钮</text>
			</cl-button>

			<cl-button size="small">
				<text>小号按钮</text>
			</cl-button>

			<cl-button size="mini">
				<text>超小号按钮</text>
			</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					label: '默认按钮',
					value: ''
				},
				{
					label: '主要按钮',
					value: 'primary'
				},
				{
					label: '成功按钮',
					value: 'success'
				},
				{
					label: '失败按钮',
					value: 'error'
				},
				{
					label: '警告按钮',
					value: 'warning'
				},
				{
					label: '信息按钮',
					value: 'info'
				}
			]
		};
	}
};
</script>

<style lang="scss">
.demo-button {
	.cl-button {
		margin-bottom: 20rpx;
	}
}
</style>
