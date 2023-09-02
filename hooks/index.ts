import { defineStore } from "pinia";
import { ref } from "vue";

// 方式一，创建缓存方式
export const useTest = defineStore("test", () => {
	const data = ref();

	return {
		data,
	};
});

// 方式2
export function useTest2() {
	const data = ref();

	return {
		data,
	};
}
