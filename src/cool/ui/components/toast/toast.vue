<template>
	<view class="cl-toast__wrap">
		<view
			class="cl-toast"
			v-for="(item, index) in list"
			:key="index"
			:class="[
				`cl-toast--${item.type}`,
				`is-${item.position}`,
				{
					'is-show': item.visible,
					'is-icon': item.icon
				}
			]"
		>
			<view class="cl-toast__icon" v-if="item.icon">
				<cl-icon :name="`cl-icon-toast-${item.icon}`"></cl-icon>
			</view>

			<slot>
				<text class="cl-toast__content">{{ item.message }}</text>
			</slot>
		</view>
	</view>
</template>

<script>
import { isObject, isString, isFunction } from '../../utils';

let id = 0;

export default {
	data() {
		return {
			list: []
		};
	},

	methods: {
		open(d) {
			let options = {
				id: id++,
				visible: false,
				closed: false,
				icon: '',
				message: '',
				duration: 2000,
				type: 'default',
				position: 'bottom',
				onClose: null,
				iconSize: 22
			};

			if (isObject(d)) {
				Object.assign(options, d);
			} else {
				options.message = d;
			}

			this.list.push(options);

			setTimeout(() => {
				this.create(options);
			}, 50);
		},

		close(item) {
			item.visible = false;
			item.closed = true;

			if (isFunction(item.onClose)) {
				item.onClose(this);
			}
		},

		create(item) {
			const { duration } = item || {};

			if (duration > 0) {
				item.visible = true;
				setTimeout(() => {
					this.close(item);
				}, duration);
			}
		}
	}
};
</script>
