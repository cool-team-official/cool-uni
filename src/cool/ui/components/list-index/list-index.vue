<template>
	<view class="cl-li">
		<!-- 搜索栏 -->
		<view class="cl-li__search">
			<cl-input
				v-model="LI.keyWord"
				:border="false"
				prefix-icon="cl-icon-search"
				round
				placeholder="搜索关键字"
				clearable
			></cl-input>
		</view>

		<!-- 滚动视图 -->
		<scroll-view
			class="cl-li__scroller"
			scroll-y
			enable-back-to-top
			scroll-with-animation
			:scroll-into-view="`index-${LI.label}`"
			@scroll="onScroll"
		>
			<template v-for="(item, index) in flist">
				<view
					class="cl-li__group"
					:key="index"
					:id="`index-${item.label}`"
				>
					<!-- 关键字 -->
					<view
						:class="[
							'cl-li__header',
							'cl-sticky',
							{
								'is-active': LI.curr.label == item.label,
							},
						]"
					>
						<text>{{ item.label }}</text>
					</view>
					<!-- 数据列表 -->
					<view class="cl-li__container">
						<template v-for="(item2, index2) in item.children">
							<view
								class="cl-li__item"
								:key="index2"
								@tap="selectRow(item2)"
							>
								<cl-avatar :src="item2.avatarUrl"></cl-avatar>
								<text>{{ item2.name }}</text>
							</view>
						</template>
					</view>
				</view>
			</template>
		</scroll-view>

		<!-- 索引栏 -->
		<view class="cl-li__bar" @touchmove.stop="barMove" @touchend="barEnd">
			<view
				class="cl-li__bar-list"
				@touchmove.stop="barMove"
				@touchend="barEnd"
			>
				<template v-for="(item, index) in flist">
					<view
						:class="[
							'cl-li__bar-block',
							{
								'is-active': LI.curr.label == item.label,
							},
						]"
						:key="index"
						:id="index"
						@touchstart="toRow(item)"
					>
						<text>{{ item.label }}</text>
					</view>
				</template>
			</view>
		</view>

		<!-- 索引关键字 -->
		<view class="cl-li__alert" v-show="LI.alert">{{ LI.curr.label }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			LI: {
				keyWord: "",
				label: "",
				alert: false,
				data: [],
				curr: {},
				bar: {
					top: 0,
					itemH: 0,
				},
			},
		};
	},

	computed: {
		flist() {
			const match = (d) => d.name.includes(this.LI.keyWord);

			return this.LI.data
				.filter((e) => e.children && e.children.find(match))
				.map((e) => {
					e.children = e.children.filter(match);
					return e;
				});
		},
	},

	created() {
		this.LI.data = [
			{
				label: "A",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg",
						name: "阿雪",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg",
						name: "阿良",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg",
						name: "阿绵",
					},
				],
			},

			{
				label: "C",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg",
						name: "陈杨",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/6.jpg",
						name: "陈飞",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/7.jpg",
						name: "陈品如",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg",
						name: "陈逸",
					},
				],
			},
			{
				label: "D",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/10.jpg",
						name: "道天",
					},
				],
			},
			{
				label: "H",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/9.jpg",
						name: "韩琦",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/10.jpg",
						name: "韩重",
					},
				],
			},
			{
				label: "J",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg",
						name: "江澄",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/7.jpg",
						name: "江厌离",
					},
				],
			},
			{
				label: "S",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg",
						name: "苏三",
					},
					,
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg",
						name: "沈道",
					},
				],
			},
			{
				label: "Z",
				children: [
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg",
						name: "周蓓蓓",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg",
						name: "朱勇",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg",
						name: "朱鸣",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg",
						name: "张伟",
					},
					{
						avatarUrl:
							"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/9.jpg",
						name: "郑金榜",
					},
				],
			},
		];
	},

	mounted() {
		const query = uni.createSelectorQuery().in(this);

		query
			.select(`.cl-li__bar-list`)
			.boundingClientRect((res) => {
				this.LI.bar.top = res.top;
				this.LI.bar.itemH = parseInt(res.height / this.LI.data.length);
			})
			.exec();
	},

	methods: {
		toRow(e) {
			this.LI.alert = true;
			this.LI.curr = e;
		},

		barMove(e) {
			const max = this.LI.data.length;
			let index = parseInt(
				(e.touches[0].clientY - this.LI.bar.top) / this.LI.bar.itemH
			);

			if (index >= max) {
				index = max - 1;
			}

			if (index < 0) {
				index = 0;
			}

			this.LI.curr = this.LI.data[index];
		},

		barEnd() {
			this.LI.label = this.LI.curr.label;
			this.LI.alert = false;
		},

		selectRow(item) {
			console.log(item);
		},

		onScroll() {
			this.LI.data.forEach((e) => {
				uni.createSelectorQuery()
					.in(this)
					.select(`#index-${e.label} .cl-li__header`)
					.boundingClientRect((res) => {
						if (res.top < 60) {
							this.LI.curr = e;
						}
					})
					.exec();
			});
		},
	},
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.cl-li {
	&__search {
		border-bottom: 0;
	}

	&__header {
		background-color: #fff;
		color: #999;
		font-weight: 500;
	}

	&__item {
		.cl-avatar {
			margin-right: 30rpx;
		}
	}
}
</style>
