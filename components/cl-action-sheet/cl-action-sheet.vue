<template>
	<view class="cl-action-sheet">
		<cl-popup
			direction="bottom"
			size="auto"
			:visible.sync="visible"
			:with-header="false"
			:close-on-click-modal="closeOnClickModal"
		>
			<button
				class="cl-action-sheet__item"
				v-for="(item, index) in list"
				:key="index"
				:class="[item.disabled ? 'is-disabled' : '']"
				:style="{
					color: item.color,
					fontSize: item.size,
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
/**
 * actionSheet 操作菜单
 * @description 从底部弹出的一个操作菜单，类似于 uni.showActionSheetAPI，同时添加新的支持。
 * @tutorial https://docs.cool-js.com/uni/components/operate/action-sheet.html
 * @example <cl-action-sheet ref="action-sheet"></cl-action-sheet>
 */

export default {
	name: "cl-action-sheet",

	data() {
		return {
			visible: false,
			list: [],
			closeOnClickModal: true,
			callback: null,
			beforeClose: null,
			showCancel: true,
			cancelText: null,
		};
	},

	methods: {
		open({
			list = [],
			closeOnClickModal = true,
			callback,
			beforeClose,
			cancelText = "取消",
			showCancel = true,
		}) {
			this.closeOnClickModal = closeOnClickModal;
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
					this.callback({
						action,
					});
				}
			};

			if (this.beforeClose) {
				this.beforeClose({
					action,
					done,
				});
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
		},
	},
};
</script>
