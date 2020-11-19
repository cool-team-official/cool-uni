<template>
	<view class="cl-toast__wrap">
		<template v-for="(item, index) in list">
			<view
				class="cl-toast"
				v-if="!item.closed"
				:key="item.id"
				:class="[
					`cl-toast--${item.type}`,
					`is-${item.position}`,
					{
						'is-show': item.visible,
						'is-icon': item.icon,
					},
				]"
			>
				<view class="cl-toast__icon" v-if="item.icon">
					<cl-icon :name="`cl-icon-toast-${item.icon}`"></cl-icon>
				</view>

				<slot>
					<text class="cl-toast__content">{{ item.message }}</text>
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
				icon: "",
				message: "",
				duration: 2000,
				type: "default",
				position: "bottom",
				timer: null,
				onClose: null,
				iconSize: 22,
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
			}, 300);
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
