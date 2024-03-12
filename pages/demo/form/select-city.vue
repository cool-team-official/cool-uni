<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-select-city v-model="v1" />
		</cl-card>

		<cl-card label="省市区乡镇4级">
			<cl-select-city v-model="v2" :data="CityPcas" placeholder="省市区县、乡镇" />
		</cl-card>

		<cl-card label="自定义">
			<cl-select-city v-model="v3">
				<template #default="{ selection }">
					<cl-row :margin="[0, 0, 20, 0]" v-if="selection.length">
						<cl-tag v-for="item in selection" plain round :key="item.code">{{
							item.name
						}}</cl-tag>
					</cl-row>

					<cl-button round>选择所在地区</cl-button>
				</template>
			</cl-select-city>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CityPcas from "../static/city-pcas.json";

const v1 = ref([]);
const v2 = ref([]);
const v3 = ref([]);
</script>
