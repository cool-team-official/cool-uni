<template>
	<cl-page fullscreen>
		<cl-scroller :ref="setRefs('scroller')" @up="loadmore" @down="refresh">
			<cl-list-item
				v-for="(item, index) in list"
				:key="index"
				:label="`${item + 1}`"
				:padding="[0, 20, 0, 20]"
				border
			/>
		</cl-scroller>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";
import { onReady } from "@dcloudio/uni-app";
import { range } from "lodash-es";

const { refs, setRefs } = useCool();

const list = ref<number[]>([]);

function loadmore() {
	setTimeout(() => {
		const data = range(list.value.length, list.value.length + 20);
		list.value.push(...data);
	}, 300);
}

function refresh() {
	list.value = range(20);

	setTimeout(() => {
		refs.scroller.end();
	}, 500);
}

onReady(() => {
	refresh();
});
</script>
