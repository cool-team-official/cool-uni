declare namespace ClConfirm {
	type Action = "confirm" | "close" | "cancel";

	interface Options {
		title?: string;
		message?: string;
		width?: string;
		type?: "success" | "warning" | "error";
		showCancelButton?: boolean;
		cancelButtonText?: string;
		showConfirmButton?: boolean;
		confirmButtonText?: string;
		closeOnClickModal?: boolean;
		beforeClose?(
			action: Action,
			fn: { done(): void; showLoading(): void; hideLoading(): void }
		): void;
		callback?(action: Action): void;
		duration?: number;
	}

	interface Ref {
		open(options: Options): void;
	}
}
