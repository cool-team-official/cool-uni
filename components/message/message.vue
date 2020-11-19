<template>
	<view class="cl-message__wrap">
		<template v-for="(item, index) in list">
			<view
				class="cl-message"
				v-if="!item.closed"
				:key="item.id"
				:class="[
					{
						'is-show': item.visible,
					},
				]"
				:style="{
					top: item.visible ? item.top : '-200rpx',
				}"
			>
				<icon
					class="cl-message__icon"
					:type="item.type"
					:size="item.iconSize"
					v-if="item.type"
				/>
				<slot>
					<text class="cl-message__content">{{ item.message }}</text>
				</slot>
			</view>
		</template>
	</view>
</template>

<script>
import { isObject, isString, isFunction } from "../../utils";

let id = 0;

export default {
	props: {
		single: Boolean,
	},

	data() {
		return {
			list: [],
		};
	},

	methods: {
		open(d) {
			let options = {
				id: id++,
				visible: false,
				closed: false,
				message: "",
				type: "success",
				duration: 3000,
				timer: null,
				onClose: null,
				iconSize: 22,
				top: "120rpx",
			};

			if (isObject(d)) {
				Object.assign(options, d);
			} else {
				options.message = d;
			}

			if (this.single) {
				this.list = [options];
			} else {
				this.list.push(options);
			}

			setTimeout(() => {
				this.create(options);
			}, 50);
		},

		close(item) {
			clearTimeout(item.timer);

			item.visible = false;

			if (isFunction(item.onClose)) {
				item.onClose(this);
			}

			setTimeout(() => {
				item.closed = true;
			}, 600);
		},

		create(item) {
			const { duration } = item || {};

			if (duration > 0) {
				item.visible = true;
				item.timer = setTimeout(() => {
					this.close(item);
				}, duration);
			}
		},
	},
};
</script>
