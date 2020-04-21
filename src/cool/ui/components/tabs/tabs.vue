<template>
	<view class="cl-tabs" :class="[`cl-tabs--${type}`, isSticky]">
		<scroll-view
			class="cl-tabs__bar"
			:style="{
				top: stickyTop
			}"
			scroll-with-animation
			scroll-x
			:scroll-left="scrollLeft"
		>
			<view
				v-for="(item, index) in list2"
				:key="index"
				:class="[
					'cl-tabs__bar-li',
					{
						active: value == item.name
					}
				]"
				@tap="change(index)"
			>
				<text
					:class="['cl-tabs__icon', 'cl-tabs__icon--prefix', item.prefixIcon]"
					v-if="item.prefixIcon"
				></text>
				<text class="cl-tabs__label">{{ item.label }}</text>
				<text
					:class="['cl-tabs__icon', 'cl-tabs__icon--suffix', item.suffixIcon]"
					v-if="item.suffixIcon"
				></text>
			</view>
		</scroll-view>

		<view class="cl-tabs__pane">
			<template v-if="type === 'swiper'">
				<swiper
					class="cl-tabs__swiper"
					circular
					@change="onChangeSwiper"
					:current="current"
				>
					<swiper-item v-for="(item, index) in list2" :key="index">
						<scroll-view
							scroll-y
							enable-back-to-top
							:class="[`cl-tabs__swiper-scroller`]"
						>
							<slot :item="item" :index="index" v-if="item.visible"></slot>
						</scroll-view>
					</swiper-item>
				</swiper>
			</template>

			<template v-else>
				<slot></slot>
			</template>
		</view>
	</view>
</template>

<script>
import Emitter from '../../mixins/emitter';
import { isNumber } from '../../utils';

export default {
	componentName: 'ClTabs',

	props: {
		value: [String, Number],
		// 离开前
		beforeLeave: Function,
		// 标签
		labels: null,
		// 是否懒加载
		lazy: Boolean,
		// 是否吸顶
		sticky: Boolean,
		// 吸顶顶部距离
		stickyTop: {
			type: [Number],
			default: 0
		},
		// 类型，default: 默认，swiper: 滑动
		type: {
			type: String,
			default: 'default'
		}
	},

	mixins: [Emitter],

	data() {
		return {
			list: [],
			scrollLeft: 0,
			current: 0
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.current = val;
			}
		}
	},

	computed: {
		list2() {
			return (this.labels || this.list).map((e, i) => {
				e.name = e.name || i;
				if (!e.visible) {
					e.visible = this.lazy ? this.value == e.name : true;
				}
				return e;
			});
		},

		isSticky() {
			return this.sticky ? 'cl-tabs--sticky' : '';
		}
	},

	created() {
		this.$on('tabs.addPane', data => {
			this.list.push(data);
		});
	},

	mounted() {
		this.broadcast('ClTabPane', 'tabs.change', this.value);
	},

	methods: {
		onChangeSwiper(e) {
			if (e.detail.current !== this.current) {
				this.change(e.detail.current);
			}
		},

		async change(index) {
			const { name } = this.list2[index];

			let flag = true;

			if (this.beforeLeave) {
				const fn = this.beforeLeave(name);

				if (!!fn && typeof fn.then === 'function') {
					flag = !!(await fn.catch(() => null));
				} else {
					flag = fn;
				}
			}

			if (flag) {
				this.$emit('input', name);
				this.$emit('tab-change', name);
				this.broadcast('ClTabPane', 'tabs.change', name);
				this.scrollLeft = (index - 1) * 60;
				this.current = index;
				this.list2[index].visible = true;
			}
		}
	}
};
</script>
