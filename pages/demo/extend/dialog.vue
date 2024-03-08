<template>
	<cl-page :padding="20">
		<cl-dialog title="标题" v-model="visible">
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
		</cl-dialog>

		<cl-dialog :ref="setRefs('d1')">
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
		</cl-dialog>

		<cl-dialog :ref="setRefs('d2')" title="标题">
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>

			<template #footer>
				<cl-button @tap="refs.d2?.close()">好诗！</cl-button>
			</template>
		</cl-dialog>

		<cl-card label="基础用法">
			<cl-button @tap="open">打开</cl-button>
		</cl-card>

		<cl-card label="无标题">
			<cl-button @tap="refs.d1?.open()">打开</cl-button>
		</cl-card>

		<cl-card label="带按钮">
			<cl-button @tap="refs.d2?.open()">打开</cl-button>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";

const { refs, setRefs } = useCool();

const visible = ref(false);

function open() {
	visible.value = true;
}
</script>
