<template>
	<view class="cl-message__wrap">
		<view
			v-for="(item, index) in list"
			:key="index"
			:class="[
				'cl-message',
				{
					'is-show': item.visible
				}
			]"
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
				message: '',
				type: 'success',
				duration: 3000,
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
