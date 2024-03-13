<template>
	<view class="cl-toast__wrap">
		<template v-for="item in list" :key="item.id">
			<cl-popup
				v-model="item.visible"
				:padding="0"
				:modal="false"
				:direction="item.position"
				background-color="transparent"
			>
				<view
					class="cl-toast"
					:class="{
						'is-icon': item.image || item.icon,
					}"
				>
					<view class="cl-toast__icon" v-if="item.image || item.icon">
						<image
							:src="item.image.url"
							:mode="item.image.mode || 'aspectFill'"
							:style="item.image.style"
							v-if="item.image"
						/>
						<text :class="item.icon" v-else></text>
					</view>

					<slot>
						<text class="cl-toast__content">{{ item.message }}</text>
					</slot>
				</view>
			</cl-popup>
		</template>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { isFunction, last, has } from "lodash-es";

export default defineComponent({
	name: "cl-toast",

	setup() {
		let id = 0;

		// 列表
		const list = ref<any[]>([]);

		// 打开
		function open(d: ClToast.Options) {
			// 默认
			const options = {
				id: id++,
				visible: false,
				closed: false,
				icon: "",
				image: null,
				message: "",
				duration: 2000,
				type: "",
				position: "center",
				clear: false,
			};

			// 合并
			if (has(d, "message")) {
				Object.assign(options, d);
			} else {
				options.message = String(d);
			}

			switch (options.type) {
				case "success":
					options.icon = "cl-icon-check-border";
					break;

				case "warning":
					options.icon = "cl-icon-warning-border";
					break;

				case "info":
					options.icon = "cl-icon-help-border";
					break;

				case "error":
					options.icon = "cl-icon-close-border";
					break;
			}

			// 是否清除之前的
			if (options.clear) {
				list.value = [options];
			} else {
				list.value.push(options);
			}

			// 有图标默认居中显示
			if (options.image || options.icon) {
				options.position = "center";
			}

			setTimeout(() => {
				create(last(list.value));
			}, 50);
		}

		// 关闭
		function close(item: any) {
			// 清空计时器
			clearTimeout(item.timer);
			item.visible = false;

			// 关闭回调
			if (isFunction(item.onClose)) {
				item.onClose();
			}

			setTimeout(() => {
				item.closed = true;
			}, 300);
		}

		// 创建
		function create(item: any) {
			const { duration } = item || {};

			if (duration > 0) {
				item.visible = true;

				item.timer = setTimeout(() => {
					close(item);
				}, duration);
			}
		}

		return {
			list,
			open,
			close,
			create,
		};
	},
});
</script>
