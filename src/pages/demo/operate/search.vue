<template>
	<view class="demo-search">
		<cl-toast ref="cl-toast"></cl-toast>

		<cl-card label="默认" padding="0">
			<cl-search v-model="val1" placeholder="搜索图片、文章、链接" @search="onSearch">
			</cl-search>
		</cl-card>

		<cl-card label="后缀" padding="0">
			<cl-search v-model="val2" placeholder="搜索图片、文章、链接" @search="onSearch">
				<cl-avatar :src="avatarUrl" slot="suffix" :size="60"></cl-avatar>
			</cl-search>
		</cl-card>

		<cl-card label="前缀" padding="0">
			<cl-search
				v-model="val3"
				placeholder="搜索图片、文章、链接"
				search-button-text="搜索区域"
				@search="onSearch"
			>
				<cl-select v-model="val5" :options="options.city" slot="prefix"></cl-select>
			</cl-search>
		</cl-card>

		<cl-card label="自定义搜索" padding="0">
			<cl-search
				v-model="val4"
				placeholder="搜索图片、文章、链接"
				:show-search-button="false"
			>
				<cl-button slot="suffix" type="error" @tap="onSearch2">搜索</cl-button>
			</cl-search>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/avatar.jpeg',
			val1: '',
			val2: '',
			val3: '',
			val4: '',
			val5: 1,

			options: {
				city: [
					{
						label: '厦门市',
						value: 1
					},
					{
						label: '福州市',
						value: 2
					},
					{
						label: '龙岩市',
						value: 3
					}
				]
			}
		};
	},

	methods: {
		onSearch(val) {
			console.log(val);
			if (val) {
				this.$refs['cl-toast'].open(val);
			}
		},
		onSearch2() {
			if (this.val4) {
				this.$refs['cl-toast'].open(`搜索的是：${this.val4}`);
			}
		}
	}
};
</script>
