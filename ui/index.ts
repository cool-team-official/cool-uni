import { onReady } from "@dcloudio/uni-app";
import { router } from "../cool";

export function useUi(): Ui.Page {
	// 子组件方法
	let d: any;

	const ui: any = {
		get loaded() {
			return Boolean(d);
		},
	};

	function update() {
		d = null;

		if (!d) {
			const p = router.info();

			if (p) {
				d = p.$vm?.$cl_page || p.$vm?.$root?.$cl_page;
			}
		}
	}

	onReady(() => {
		update();
	});

	update();

	["showLoading", "hideLoading", "showToast", "showTips", "showConfirm"].forEach((e) => {
		ui[e] = (...args: any[]) => {
			if (d) {
				d[e](...args);
			}
		};
	});

	return ui;
}
