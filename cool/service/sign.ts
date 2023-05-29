import md5 from "md5";

function useSign(params: any) {
	const timestamp = new Date().getTime();

	let arr = [`timestamp=${timestamp}`];

	for (const i in params) {
		arr.push(`${i}=${decodeURIComponent(params[i])}`);
	}

	arr.sort();

	const sign = md5(arr.join("&"));

	return {
		timestamp,
		sign,
	};
}

export { useSign };
