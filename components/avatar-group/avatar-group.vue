<template>
	<view class="cl-avatar-group">
		<template v-for="(item, index) in urls">
			<cl-avatar
				v-if="index < max"
				:key="index"
				:size="size"
				:shape="shape"
				:src="item"
			></cl-avatar>
		</template>

		<cl-avatar :size="size" :shape="shape" src="" v-if="overLen > 0">
			<view class="cl-avatar-group__more"> {{ overLen }} </view>
		</cl-avatar>
	</view>
</template>

<script>
export default {
	props: {
		urls: Array,
		size: {
			type: Number,
			default: 80
		},
		max: {
			type: Number,
			default: 5
		},
		shape: {
			type: String,
			default: 'circle'
		}
	},
	computed: {
		overLen() {
			return this.urls.length - this.max;
		}
	}
};
</script>
