<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-select-date v-model="v1"></cl-select-date>
		</cl-card>

		<cl-card label="时分秒">
			<cl-select-date
				v-model="v2"
				:mode="['hour', 'minute', 'second']"
				format="HH:mm:ss"
			></cl-select-date>
		</cl-card>

		<cl-card label="月-日 时:分">
			<cl-select-date
				v-model="v3"
				:mode="['month', 'date', 'hour', 'minute']"
				format="MM-DD HH:mm"
			></cl-select-date>
		</cl-card>

		<cl-card label="起始时间">
			<cl-select-date
				v-model="v4"
				start="2023-01-01 08:00:00"
				end="2025-12-12 12:00:00"
			></cl-select-date>

			<cl-text
				value="2023-01-01 08:00:00 < 时间 < 2025-12-12 12:00:00"
				block
				:margin="[20, 0, 0, 10]"
				:size="24"
				color="warning"
			></cl-text>
		</cl-card>

		<cl-card label="自定义">
			<cl-select-date v-model="v5" round title="请选择预约时间">
				<template #default="{ value }">
					<cl-text
						prefix-icon="cl-icon-time"
						:value="
							value
								? dayjs(value).format('YYYY年MM月DD日 HH时mm分ss秒')
								: '请选择预约时间'
						"
					></cl-text>
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
</script>
