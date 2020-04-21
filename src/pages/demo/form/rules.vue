<template>
	<view class="demo-rules">
		<!-- 消息提示 -->
		<cl-message ref="message"></cl-message>

		<cl-card label="表单">
			<cl-row>
				<cl-button @tap="setLabelAlign('left')">
					左对齐
				</cl-button>
				<cl-button @tap="setLabelAlign('right')">
					右对齐
				</cl-button>
				<cl-button @tap="setLabelAlign('top')">
					顶部对齐
				</cl-button>
			</cl-row>

			<cl-row>
				<cl-button @tap="changeRule">
					{{ isRule ? '清空验证' : '还原验证' }}
				</cl-button>
				<cl-button @tap="changeShowMessage">
					{{ showMessage ? '关闭错误提示' : '打开错误提示' }}
				</cl-button>
			</cl-row>

			<!-- 表单 -->
			<cl-form
				ref="cl-form"
				:model.sync="form"
				:rules="rules"
				:label-position="labelAlign"
				:label-width="labelWidth"
				:show-message="showMessage"
			>
				<cl-form-item label="活动名称" prop="name">
					<cl-input placeholder="请填写活动名称" v-model="form.name"></cl-input>
				</cl-form-item>
				<cl-form-item label="活动区域" prop="region" justify="end">
					<cl-select-region
						placeholder="请选择活动区域"
						v-model="form.region"
					></cl-select-region>
				</cl-form-item>
				<cl-form-item label="活动时间" prop="date" justify="end">
					<cl-select
						mode="date"
						placeholder="请选择活动时间"
						v-model="form.date"
					></cl-select>
				</cl-form-item>
				<cl-form-item label="即时配送" prop="delivery" justify="end">
					<label>
						<cl-switch v-model="form.delivery"></cl-switch>
						<text>{{ form.delivery ? '开启' : '关闭' }}</text>
					</label>
				</cl-form-item>
				<cl-form-item label="活动海报" prop="cover">
					<cl-upload v-model="form.cover" :size="['200rpx', '200rpx']"></cl-upload>
				</cl-form-item>
				<cl-form-item label="活动性质" prop="type">
					<cl-checkbox-group v-model="form.type">
						<block v-for="(item, index) in options.type" :key="index">
							<cl-checkbox :label="item.value">{{ item.label }}</cl-checkbox>
							<br />
						</block>
					</cl-checkbox-group>
				</cl-form-item>
				<cl-form-item label="特殊资源" prop="resource">
					<cl-radio-group v-model="form.resource">
						<cl-radio
							v-for="(item, index) in options.resource"
							:key="index"
							:label="item.value"
							>{{ item.label }}</cl-radio
						>
					</cl-radio-group>
				</cl-form-item>
				<cl-form-item label="活动描述" prop="desc">
					<textarea class="cl-textarea" v-model="form.desc"></textarea>
				</cl-form-item>
			</cl-form>
		</cl-card>

		<view class="footer">
			<cl-button type="primary" @tap="onSubmit">
				立即创建
			</cl-button>
			<cl-button @tap="onReset">
				重置
			</cl-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '情人节',
				region: ['120000', '120100', '120103'],
				type: [0, 3],
				delivery: true,
				resource: 0,
				desc: '',
				date: '',
				cover: ''
			},
			rules: {
				name: {
					required: true,
					message: '活动名称不能为空'
				},
				region: {
					required: true,
					message: '活动地区不能为空'
				},
				date: {
					required: true,
					message: '活动时间不能为空'
				}
			},
			options: {
				type: [
					{
						label: '美食/餐厅线上活动',
						value: 0
					},
					{
						label: '地推活动',
						value: 1
					},
					{
						label: '线下主题活动',
						value: 2
					},
					{
						label: '单纯品牌曝光',
						value: 3
					}
				],
				region: [
					{
						label: '不限',
						value: 0
					},
					{
						label: '区域一',
						value: 1
					},
					{
						label: '区域二',
						value: 2
					}
				],
				resource: [
					{
						label: '线上品牌商赞助',
						value: 0
					},
					{
						label: '线下场地免费',
						value: 1
					},
					{
						label: '其他',
						value: 2
					}
				]
			},
			labelAlign: 'right',
			labelWidth: '150rpx',
			isRule: true,
			showMessage: true
		};
	},

	methods: {
		setLabelAlign(pos) {
			this.labelAlign = pos;
		},
		changeRule() {
			this.isRule = !this.isRule;

			for (let i in this.rules) {
				this.rules[i].required = this.isRule;
			}
		},
		changeShowMessage() {
			this.showMessage = !this.showMessage;
		},
		onSubmit() {
			this.$refs['cl-form'].validate((valid, errors) => {
				if (valid) {
					this.$refs['message'].open({ message: '提交成功' });
					console.log(this.form);
				} else {
					this.$refs['message'].open({ message: errors[0].message, type: 'cancel' });
				}
			});
		},
		onReset() {
			this.$refs['cl-form'].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-rules {
	padding-bottom: 60rpx;

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 9;
		display: flex;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;

		.cl-button {
			flex: 1;
		}
	}
}
</style>
