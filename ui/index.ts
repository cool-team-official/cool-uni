import { onReady } from "@dcloudio/uni-app";
import { router, useGlobal } from "/@/cool";

export function useUi(): Ui.Page {
	const global = useGlobal();

	let d: any;

	const ui: any = {
		loaded: false,
	};

	function update() {
		d = null;

		if (!d) {
			const p = router.info();

			if (p) {
				d = global.data[`cl-page__${p.path}`];
			}
		}
	}

	onReady(() => {
		ui.loaded = true;
		update();
	});

	["showLoading", "hideLoading", "showToast", "showTips", "showConfirm"].forEach((e) => {
		ui[e] = (...args: any[]) => {
			if (d) {
				d[e]?.(...args);
			}
		};
	});

	return ui;
}
