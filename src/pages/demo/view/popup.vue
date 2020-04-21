<template>
	<view class="demo-popup">
		<cl-card label="基本用法">
			<cl-row v-for="(item, index) in dirs" :key="index">
				<cl-popup
					:with-header="false"
					:size="item.size"
					:visible.sync="item.visible"
					:direction="item.value"
				>
					<p class="f-26">{{ item.label }}</p>
				</cl-popup>

				<cl-button @tap="open(item)">{{ item.label }}</cl-button>
			</cl-row>
		</cl-card>

		<cl-card label="自定义内容">
			<cl-confirm ref="confirm"></cl-confirm>

			<cl-popup :visible.sync="visible" :with-header="false" direction="bottom">
				<cl-form>
					<cl-form-item label="名称">
						<cl-input placeholder="请填写名称" maxlength="11" type="text"> </cl-input>
					</cl-form-item>
					<cl-form-item label="手机号">
						<cl-input placeholder="请填写手机号" maxlength="11" type="text"> </cl-input>
					</cl-form-item>
				</cl-form>

				<view class="footer">
					<cl-button @tap="visible = false">取消</cl-button>
					<cl-button type="primary" @tap="submit">
						提交
					</cl-button>
				</view>
			</cl-popup>

			<cl-button @tap="visible = true">新增联系方式</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			dirs: [
				{
					label: '顶部弹出',
					value: 'top',
					visible: false,
					size: 'auto'
				},
				{
					label: '右侧弹出',
					value: 'right',
					visible: false,
					size: 'auto'
				},
				{
					label: '底部弹出',
					value: 'bottom',
					visible: false,
					size: 'auto'
				},
				{
					label: '左侧弹出',
					value: 'left',
					visible: false,
					size: 'auto'
				},
				{
					label: '中间弹出',
					value: 'center',
					visible: false,
					size: 'auto'
				}
			]
		};
	},

	methods: {
		open(item) {
			item.visible = true;
		},
		submit() {
			this.$refs['confirm'].open({
				title: '提示',
				message: '确定添加该条数据吗？',
				callback: ({ action }) => {
					if (action === 'confirm') {
						this.visible = false;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.demo-popup {
	.f-26 {
		font-size: 26rpx;
	}

	.footer {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		display: flex;

		.cl-button {
			flex: 1;
		}
	}
}
</style>
