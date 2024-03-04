import { router } from "/@/cool";

export function useUi(): Ui.Page {
	const ui: any = {
		get loaded() {
			return router.currentPage()?.["cl-page"]?.loaded;
		},
	};

	const keys = ["showLoading", "hideLoading", "showToast", "showTips", "showConfirm"];

	keys.forEach((k) => {
		ui[k] = (...args: any[]) => {
			const d = router.currentPage()?.["cl-page"];

			if (d) {
				d[k]?.(...args);
			} else {
				if (ui.loaded) {
					console.error(`[error] ui.${k}(), because <cl-page /> not added.`);
				} else {
					console.error(`[error] ui.${k}(), cannot be used in onLoad.`);
				}
			}
		};
	});

	return ui;
}
