<template>
	<view class="cl-action-sheet">
		<cl-popup
			direction="bottom"
			size="auto"
			:visible.sync="visible"
			:with-header="false"
			:wrapper-closable="wrapperClosable"
		>
			<button
				class="cl-action-sheet__item"
				v-for="(item, index) in list"
				:key="index"
				:class="[
					{
						'is-disabled': item.disabled
					}
				]"
				:style="{
					color: item.color,
					fontSize: item.size
				}"
				:open-type="item.openType"
				@getphonenumber="onEvent(item, 'getphonenumber')"
				@getuserinfo="onEvent(item, 'getuserinfo')"
				@error="onEvent(item, 'error')"
				@opensetting="onEvent(item, 'opensetting')"
				@tap="select(index, item)"
			>
				<text class="cl-action-sheet__icon" :class="[item.icon]"></text>
				<text class="cl-action-sheet__label">{{ item.label }}</text>
			</button>

			<button
				class="cl-action-sheet__item cl-action-sheet__item--cancel"
				@tap="close('cancel')"
				v-if="showCancel"
			>
				{{ cancelText }}
			</button>
		</cl-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			list: [],
			wrapperClosable: true,
			callback: null,
			beforeClose: null,
			showCancel: true,
			cancelText: null
		};
	},

	methods: {
		open({
			list = [],
			wrapperClosable = true,
			callback,
			beforeClose,
			cancelText = '取消',
			showCancel = true
		}) {
			this.wrapperClosable = wrapperClosable;
			this.list = list;
			this.callback = callback;
			this.beforeClose = beforeClose;
			this.cancelText = cancelText;
			this.showCancel = showCancel;

			this.visible = true;
		},

		close(action) {
			const done = () => {
				this.visible = false;

				if (this.callback) {
					this.callback({ action });
				}
			};

			if (this.beforeClose) {
				this.beforeClose({ action, done });
			} else {
				done();
			}
		},

		select(index, item) {
			if (item.disabled) {
				return false;
			}

			if (item.click) {
				item.click(() => {
					this.visible = false;
				});
			} else {
				this.close(index);
			}
		},

		onEvent(item, name) {
			if (item[name]) {
				item[name]();
			}
		}
	}
};
</script>