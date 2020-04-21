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
		>
			<template v-for="(item, index) in flist">
				<view class="cl-li__group" :key="index" :id="`index-${item.label}`">
					<!-- 关键字 -->
					<view class="cl-li__header cl-sticky">
						<text>{{ item.label }}</text>
					</view>
					<!-- 数据单元 -->
					<view class="cl-li__container">
						<template v-for="(item2, index2) in item.children">
							<view class="cl-li__item" :key="index2" @tap="selectRow(item2)">
								<text>{{ item2.label }}</text>
							</view>
						</template>
					</view>
				</view>
			</template>
		</scroll-view>

		<!-- 索引栏 -->
		<view class="cl-li__bar" @touchmove.stop="barMove" @touchend="barEnd">
			<view class="cl-li__bar-list">
				<template v-for="(item, index) in flist">
					<view
						class="cl-li__bar-block"
						:class="[{ 'is-active': LI.curr.label == item.label }]"
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
import CityData from '@/data/city';

export default {
	data() {
		return {
			LI: {
				keyWord: '',
				label: '',
				alert: false,
				data: CityData,
				curr: {},
				bar: {
					top: 0,
					itemH: 0
				}
			}
		};
	},

	computed: {
		flist() {
			const match = d => d.label.includes(this.LI.keyWord);

			return this.LI.data
				.filter(e => e.children && e.children.find(match))
				.map(e => {
					e.children = e.children.filter(match);
					return e;
				});
		}
	},

	mounted() {
		const query = uni.createSelectorQuery().in(this);

		query
			.select(`.cl-li__bar-list`)
			.boundingClientRect(res => {
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
			let index = parseInt((e.touches[0].clientY - this.LI.bar.top) / this.LI.bar.itemH);

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
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
</style>
