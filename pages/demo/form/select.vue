<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-select v-model="v1" :options="list"></cl-select>
		</cl-card>

		<cl-card label="日期">
			<cl-select v-model="v2" mode="date" fields="month"></cl-select>
		</cl-card>

		<cl-card label="时间">
			<cl-select v-model="v3" mode="time"></cl-select>
		</cl-card>

		<cl-card label="禁用">
			<cl-select v-model="v4" :options="list" disabled></cl-select>
		</cl-card>

		<cl-card label="省市区">
			<cl-select-region v-model="v5"></cl-select-region>
		</cl-card>

		<cl-card label="自定义">
			<cl-select v-model="v6" :options="list">
				<template #default="{ label, value }">
					<cl-select-inner round background-color="#f7f7f7">
						<cl-text value="你选择了" :size="24" color="info" />
						<cl-tag round size="small" :margin="[0, 0, 0, 20]">{{ label }}</cl-tag>
					</cl-select-inner>
				</template>
			</cl-select>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const v1 = ref();
const v2 = ref();
const v3 = ref();
const v4 = ref(2);
const v5 = ref([]);
const v6 = ref(2);

const list = ref([
	{
		label: "冠军相",
		value: 1,
	},
	{
		label: "鬼脸",
		value: 2,
	},
	{
		label: "说唱歌手",
		value: 3,
	},
	{
		label: "一般的一天",
		value: 4,
	},
	{
		label: "会魔法的老人",
		value: 5,
	},
	{
		label: "C级浪漫",
		value: 6,
	},
	{
		label: "我想",
		value: 7,
	},
	{
		label: "小河淌水",
		value: 8,
	},
	{
		label: "午夜派对",
		value: 9,
	},
	{
		label: "POW!!!!!!!!!!!!!引爆",
		value: 10,
	},
	{
		label: "流浪`地球",
		value: 11,
	},
]);
</script>
