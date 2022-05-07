declare namespace ClForm {
	type Cb = (valid: boolean, errors: Array<{ field: string; message: string }>) => void;

	interface Ref {
		setRules(value: any): void;
		validate(cb: Cb): void;
		validateField(props: string | string[], cb: Cb): void;
		clearValidate(): void;
		reset(): void;
		clear(): void;
	}
}
