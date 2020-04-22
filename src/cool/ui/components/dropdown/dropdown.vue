<template>
	<view class="cl-dropdown__box" :class="[customClass]">
		<view class="cl-dropdown__target" @tap="open">
			<slot></slot>
		</view>

		<view
			class="cl-dropdown__wrapper"
			:class="[
				{
					'is-show': visible
				}
			]"
		>
			<!-- <view class="cl-dropdown__modal" @tap="close"></view> -->
			<view
				class="cl-dropdown"
				:style="{
					left: offset.left + 'px',
					top: offset.top + 'px'
				}"
			>
				<slot name="dropdown"></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		customClass: {
			type: String,
			default: "default"
		}
	},

	data() {
		return {
			offset: {
				left: 0,
				top: 0
			},
			visible: false
		};
	},

	mounted() {
		const query = uni.createSelectorQuery().in(this);

		query
			.select(`.cl-dropdown__target`)
			.boundingClientRect(res => {
				this.offset = {
					left: res.left + res.width / 2 - 16,
					top: res.top + res.height + 12
				};

				console.log(this.offset, res);
			})
			.exec();
	},

	methods: {
		open() {
			this.visible = true;
		},

		close() {
			this.visible = false;
		}
	}
};
</script>