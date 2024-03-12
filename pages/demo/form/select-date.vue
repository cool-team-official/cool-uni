<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-select-date v-model="v1" />
		</cl-card>

		<cl-card label="时-分">
			<cl-select-date v-model="v2" :mode="['hour', 'minute']" format="HH:mm" />
		</cl-card>

		<cl-card label="年-月">
			<cl-select-date v-model="v3" :mode="['year', 'month']" format="YYYY-MM" />
		</cl-card>

		<cl-card label="起始时间">
			<cl-select-date v-model="v4" start="2023-01-01 08:00:00" end="2025-12-12 12:00:00" />

			<cl-row :margin="[20, 0, 0, 0]">
				<cl-text value="2023-01-01 08:00:00 < " />
				<cl-text value="时间" color="red" :margin="[0, 10, 0, 10]" />
				<cl-text value=" < 2025-12-12 12:00:00" />
			</cl-row>
		</cl-card>

		<cl-card label="展示格式">
			<cl-select-date
				v-model="v5"
				:display-format="
					(date: string) => {
						return date ? dayjs(date).format('YYYY年MM月DD日 HH时mm分ss秒') : '';
					}
				"
			/>
		</cl-card>

		<cl-card label="自定义">
			<cl-select-date v-model="v6" title="请选择预约时间">
				<template #default="{ value }">
					<cl-select-inner round background-color="#f7f7f7">
						<cl-text
							prefix-icon="cl-icon-time"
							:value="
								value
									? dayjs(value).format('YYYY年MM月DD日 HH时mm分ss秒')
									: '请选择预约时间'
							"
						/>
					</cl-select-inner>
				</template>
			</cl-select-date>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref } from "vue";

const v1 = ref();
const v2 = ref();
const v3 = ref();
const v4 = ref();
const v5 = ref();
const v6 = ref();
</script>
