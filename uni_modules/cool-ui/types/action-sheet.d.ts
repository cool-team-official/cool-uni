declare namespace ClActionSheet {
	interface Item {
		label: string;
		color?: string;
		size?: string;
		icon?: string;
		disabled?: boolean;
		openType?:
			| "feedback"
			| "share"
			| "getUserInfo"
			| "contact"
			| "getPhoneNumber"
			| "launchApp"
			| "openSetting"
			| "getAuthorize"
			| "contactShare"
			| "lifestyle"
			| "openGroupProfile"
			| string;
	}

	type Action = number | "cancel";

	interface Options {
		title?: string;
		list: Item[];
		showCancel?: boolean;
		cancelText?: string;
		closeOnClickModal?: boolean;
		beforeClose?(action: Action, done: Function): void;
		callback?(action: Action): void;
	}

	interface Ref {
		open(options: Options): void;
	}
}
