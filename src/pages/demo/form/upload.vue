<template>
	<view class="demo-upload">
		<cl-toast ref="toast"></cl-toast>

		<cl-card label="基础用法">
			<cl-upload v-model="form.url1" :action="action" :headers="headers"></cl-upload>
		</cl-card>

		<cl-card label="照片墙">
			<cl-upload v-model="form.url2" multiple :action="action" :headers="headers"></cl-upload>
		</cl-card>

		<cl-card label="上传校验（图片大小不能大于50K）">
			<cl-upload
				v-model="form.url3"
				:before-upload="onBeforeUpload"
				:action="action"
				:headers="headers"
			></cl-upload>
		</cl-card>

		<cl-card label="禁用状态">
			<cl-upload v-model="form.url4" disabled></cl-upload>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				url: '',
				url2: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/avatar.jpeg'],
				url3: '',
				url4: ''
			},
			action: '/pro/admin/comm/upload',
			headers: {
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjEiXSwidXNlcklkIjoiMSIsInBhc3N3b3JkVmVyc2lvbiI6MSwiaWF0IjoxNTg1Nzk2ODQxLCJleHAiOjE1ODY0MDE2NDF9.9_L44m-LUm5kqOvyWAOHJDsj7e-_BGfLJLIFHrOiaUA'
			}
		};
	},

	methods: {
		onBeforeUpload(file, index) {
			if (file.size > 51200) {
				this.$refs['toast'].open('图片大小不能大于50K');
				return false;
			}
		}
	}
};
</script>