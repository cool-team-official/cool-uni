<template>
	<cl-page :padding="20">
		<cl-card label="裁剪模式">
			<cl-row :gutter="20">
				<cl-col :span="6">
					<cl-image
						src="/pages/demo/static/bg.png"
						:size="140"
						mode="scaleToFill"
					></cl-image>
					<cl-text value="scaleToFill"></cl-text>
				</cl-col>

				<cl-col :span="6">
					<cl-image
						src="/pages/demo/static/bg.png"
						:size="140"
						mode="aspectFit"
					></cl-image>
					<cl-text value="aspectFit"></cl-text>
				</cl-col>

				<cl-col :span="6">
					<cl-image
						src="/pages/demo/static/bg.png"
						:size="140"
						mode="aspectFill"
					></cl-image>
					<cl-text value="aspectFill"></cl-text>
				</cl-col>

				<cl-col :span="6">
					<cl-image
						src="/pages/demo/static/bg.png"
						:size="140"
						mode="widthFix"
					></cl-image>
					<cl-text value="widthFix"></cl-text>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="不同样式">
			<cl-row type="flex">
				<cl-image src="/pages/demo/static/avatar.png" :size="140" round></cl-image>
				<cl-image
					src="/pages/demo/static/avatar.png"
					:size="[140, 280]"
					mode="aspectFill"
					:margin="[0, 0, 0, 20]"
				></cl-image>
			</cl-row>
		</cl-card>

		<cl-card label="点击预览">
			<cl-row type="flex">
				<cl-image
					src="/pages/demo/static/bg.png"
					:size="140"
					:preview-list="previewList"
				></cl-image>
			</cl-row>
		</cl-card>

		<cl-card label="插槽：地址为空">
			<cl-row type="flex">
				<cl-image src="" :size="150"></cl-image>

				<cl-image src="" :size="150" :margin="[0, 0, 0, 20]">
					<template #placeholder>
						<cl-text color="red" value="自定义"></cl-text>
					</template>
				</cl-image>
			</cl-row>
		</cl-card>

		<cl-card label="插槽：加载错误">
			<cl-image src="https://xxxx.png" :size="150"></cl-image>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Bg from "/pages/demo/static/bg.png";
import Avatar from "/pages/demo/static/avatar.png";

const previewList = ref([Bg, Avatar]);
</script>
