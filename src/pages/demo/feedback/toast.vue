<template>
	<view class="demo-toast">
		<cl-toast ref="toast"></cl-toast>

		<cl-card label="文字提示">
			<cl-button  @tap="open('文字提示')">文字提示</cl-button>
			<cl-button  @tap="open('这是一条长文字提示，超过一定字数就会换行')">
				长文字提示
			</cl-button>
		</cl-card>

		<cl-card label="不同位置">
			<cl-button  @tap="openPosition('top')">顶部</cl-button>
			<cl-button  @tap="openPosition('middle')">居中</cl-button>
			<cl-button  @tap="openPosition('bottom')">底部</cl-button>
		</cl-card>

		<cl-card label="不同状态">
			<cl-button  @tap="openType('default')">默认</cl-button>
			<cl-button  @tap="openType('primary')">主要</cl-button>
			<cl-button  @tap="openType('success')">成功</cl-button>
			<cl-button  @tap="openType('error')">失败</cl-button>
			<cl-button  @tap="openType('warning')">警告</cl-button>
		</cl-card>

		<cl-card label="带图标">
			<cl-button  @tap="openIcon('success')">success</cl-button>
			<cl-button  @tap="openIcon('error')">error</cl-button>
			<cl-button  @tap="openIcon('warning')">warning</cl-button>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true
		};
	},

	methods: {
		open(message) {
			this.$refs['toast'].open(message);
		},

		openPosition(position) {
			this.$refs['toast'].open({
				position,
				message: '消息提示'
			});
		},

		openType(type) {
			this.$refs['toast'].open({
				type,
				message: '消息提示'
			});
		},

		openIcon(icon) {
			this.$refs['toast'].open({
				icon,
				position: 'middle',
				message: '消息提示'
			});
		}
	}
};
</script>