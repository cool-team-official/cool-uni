import { join } from "path";
import { readFile } from "../utils";

export function createCtx() {
	const pages = readFile(join(__dirname, "../../../pages.json"));

	return { pages };
}
