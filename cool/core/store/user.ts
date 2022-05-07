import { defineStore } from "pinia";
import { ref } from "vue";
import { deepMerge, storage } from "../../utils";
import { router } from "../router";
import { service } from "../service";
import { User } from "/@/types";

// 本地缓存
const data = storage.info();

const useUserStore = defineStore("user", function () {
	// 标识
	const token = ref<string>(data.token || "");

	// 设置标识
	function setToken(value: string) {
		token.value = value;
		storage.set("token", value);
	}

	// 用户信息
	const info = ref<User.Info | undefined>(data.userInfo);

	// 设置用户信息
	function set(value: User.Info) {
		info.value = value;
		storage.set("userInfo", value);
	}

	// 更新用户信息
	async function update(data: any) {
		set(deepMerge(info.value, data));
		await service.user.user.update(data);
	}

	// 清除用户
	function clear() {
		storage.remove("userInfo");
		storage.remove("token");
		token.value = "";
		info.value = undefined;
	}

	// 退出
	function logout() {
		clear();
		router.login();
	}

	// 获取用户信息
	async function get() {
		return service.user.user
			.info()
			.then((res) => {
				if (res) {
					set(res);
				}
				return res;
			})
			.catch(() => {
				logout();
			});
	}

	return {
		token,
		setToken,
		info,
		get,
		set,
		update,
		logout,
	};
});

export default useUserStore;
