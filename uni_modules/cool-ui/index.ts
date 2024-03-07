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
			}
		};
	});

	return ui;
}
