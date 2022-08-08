import { defineStore } from "pinia";
import { ref } from "vue";
import { deepMerge, storage } from "../../utils";
import { router } from "../router";
import { service } from "../service";

// 本地缓存
const data = storage.info();

const useUserStore = defineStore("user", function () {
	// 标识
	const token = ref<string>(data.token || "");

	// 设置标识
	function setToken({ accessToken, accessTokenExpires, refreshToken, refreshTokenExpires }: any) {
		token.value = accessToken;

		// 访问
		storage.set("token", accessToken, accessTokenExpires - 5);
		// 刷新
		storage.set("refreshToken", refreshToken, refreshTokenExpires);
	}

	// 刷新标识
	async function refreshToken() {
		return service.seller.user
			.refreshToken({
				refreshToken: storage.get("refreshToken"),
			})
			.then((res) => {
				setToken(res);
				return res.accessToken;
			});
	}

	// 用户信息
	const info = ref<Eps.BuniessSellerEntity | undefined>(data.userInfo);

	// 设置用户信息
	function set(value: Eps.BuniessSellerEntity) {
		info.value = value;
		storage.set("userInfo", value);
	}

	// 更新用户信息
	async function update(data: any) {
		set(deepMerge(info.value, data));
		await service.seller.user.update(info.value);
	}

	// 清除用户
	function clear() {
		storage.remove("userInfo");
		storage.remove("token");
		storage.remove("refreshToken");
		token.value = "";
		info.value = undefined;
	}

	// 退出
	function logout() {
		clear();
		router.login({ reLaunch: true });
	}

	// 获取用户信息
	async function get() {
		return service.seller.user
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
		refreshToken,
		info,
		get,
		set,
		update,
		logout,
	};
});

export default useUserStore;
