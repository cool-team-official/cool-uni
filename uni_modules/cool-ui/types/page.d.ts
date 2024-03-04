declare interface ClPage {
	loaded: boolean;
	showLoading(options?: ClLoading.MaskOptions): void;
	hideLoading(): void;
	showToast(options: ClToast.Options): void;
	showConfirm(options: ClConfirm.Options): void;
	showTips(message: string, callback?: () => void): void;
}
