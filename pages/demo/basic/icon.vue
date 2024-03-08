<template>
	<cl-page :padding="20">
		<cl-card label="尺寸">
			<cl-icon name="like"></cl-icon>
			<cl-icon name="like" :size="40"></cl-icon>
			<cl-icon name="like" :size="50"></cl-icon>
		</cl-card>

		<cl-card label="颜色">
			<cl-icon name="like" color="primary"></cl-icon>
			<cl-icon name="like" color="red"></cl-icon>
			<cl-icon name="like" color="green"></cl-icon>
		</cl-card>

		<cl-card label="所有图标">
			<cl-grid :column="4">
				<cl-grid-item v-for="item in list" :key="item">
					<view class="item" @tap="copy(item)">
						<cl-icon :name="item" :size="44"></cl-icon>
						<cl-text :value="item" align="center" :margin="[10, 0, 0, 0]"></cl-text>
					</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const list = ref([
	"app",
	"payment",
	"face-auth",
	"folder",
	"bill",
	"phone",
	"share",
	"link",
	"back",
	"enter",
	"top",
	"upgrade",
	"rise",
	"decline",
	"active",
	"shrink",
	"cropper",
	"fullscreen",
	"enlarge",
	"chart-bar",
	"chart-pie",
	"my",
	"eye-open",
	"eye-close",
	"cloud-download",
	"cloud-upload",
	"like",
	"like-fill",
	"arrow-double-left",
	"arrow-double-right",
	"arrow-bottom",
	"arrow-top",
	"arrow-left",
	"arrow-right",
	"set",
	"stop",
	"play",
	"more",
	"back-top",
	"map",
	"keyboard-9",
	"keyboard-26",
	"calendar",
	"customer-service",
	"edit",
	"scan",
	"pay",
	"image",
	"image-error",
	"warning-border",
	"time",
	"meh",
	"cry",
	"smile",
	"refresh",
	"help-border",
	"caret-bottom",
	"caret-top",
	"notification",
	"toast-success",
	"toast-waiting",
	"toast-warning",
	"toast-error",
	"plus",
	"plus-border",
	"minus",
	"minus-border",
	"check",
	"check-border",
	"close",
	"close-border",
	"search",
	"clock-fill",
	"favor-fill",
	"help-fill",
	"history-fill",
	"smile-fill",
	"success-fill",
	"map-fill",
	"prompt-fill",
	"meh-fill",
	"cry-fill",
	"delete-fill",
	"amount-fill",
	"wallet-fill",
	"doc-fill",
	"good-fill",
	"camera-fill",
	"mail-fill",
	"bank-card-fill",
	"relay-fill",
	"comment-fill",
	"notification-fill",
]);

function copy(name: string) {
	uni.setClipboardData({
		data: name,
	});
}
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 150rpx;
	padding-top: 20rpx;
}
</style>
