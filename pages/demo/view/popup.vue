<template>
	<cl-page :padding="20">
		<cl-popup v-model="visible">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-popup v-model="visible_modal" :modal="false">
			<cl-button @tap="visible_modal = false">点我关闭</cl-button>
		</cl-popup>

		<cl-popup v-model="visible_custom" background-color="red" border-radius="20rpx">
			<cl-text color="#fff" value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-popup
			title="选择"
			v-model="visible_type"
			type="select"
			direction="bottom"
			@confirm="onConfirm"
		>
			<cl-radio-group v-model="music">
				<cl-list-item label="冠军相" :arrow-icon="false">
					<cl-radio label="冠军相"></cl-radio>
				</cl-list-item>
				<cl-list-item label="鬼脸 Ghost Face" :arrow-icon="false">
					<cl-radio label="鬼脸 Ghost Face"></cl-radio>
				</cl-list-item>
				<cl-list-item label="临时抱佛脚" :arrow-icon="false">
					<cl-radio label="临时抱佛脚"></cl-radio>
				</cl-list-item>
				<cl-list-item label="一般的一天" :arrow-icon="false">
					<cl-radio label="一般的一天"></cl-radio>
				</cl-list-item>
			</cl-radio-group>
		</cl-popup>

		<cl-popup v-model="visible_left" direction="left">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-popup v-model="visible_top" direction="top">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-popup v-model="visible_right" direction="right">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-popup v-model="visible_bottom" direction="bottom">
			<cl-text value="云想衣裳花想容，春风拂槛露华浓。"></cl-text>
		</cl-popup>

		<cl-card label="基础用法">
			<cl-button @tap="visible = true">打开</cl-button>
		</cl-card>

		<cl-card label="不显示遮罩层">
			<cl-button @tap="visible_modal = true">打开</cl-button>
		</cl-card>

		<cl-card label="添加样式">
			<cl-button @tap="visible_custom = true">打开</cl-button>
		</cl-card>

		<cl-card label="选择模式">
			<cl-button @tap="visible_type = true">打开</cl-button>
		</cl-card>

		<cl-card label="方向">
			<cl-button @tap="visible_left = true">左边</cl-button>
			<cl-button @tap="visible_top = true">上边</cl-button>
			<cl-button @tap="visible_right = true">右边</cl-button>
			<cl-button @tap="visible_bottom = true">下边</cl-button>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUi } from "/@/ui";

const ui = useUi();

const visible = ref(false);
const visible_modal = ref(false);
const visible_custom = ref(false);
const visible_type = ref(false);

const visible_left = ref(false);
const visible_top = ref(false);
const visible_right = ref(false);
const visible_bottom = ref(false);

const music = ref("冠军相");

function onConfirm() {
	ui.showToast(`选择了${music.value}`);
	visible_type.value = false;
}
</script>
