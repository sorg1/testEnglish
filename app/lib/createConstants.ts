interface CreateConstantsOptions {
	prefix?: string;
}

export default function createConstants<ConstantKey extends string>(
	keys: ConstantKey[],
	options?: CreateConstantsOptions
) {
	const map: { [key in ConstantKey]: string } = Object();
	for (const key of keys) {
		map[key] = padString(key, options && options.prefix);
	}
	return map;
}

export function createAsyncConstants<ConstantKey extends string>(
	keys: ConstantKey[],
	options?: CreateConstantsOptions
) {
	const map: { [key in ConstantKey]: AsyncConstant } = Object();
	for (const key of keys) {
		map[key] = {
			TYPE: padString(key, options && options.prefix),
			PENDING: padString(key, options && options.prefix, '_PENDING'),
			REJECTED: padString(key, options && options.prefix, '_REJECTED'),
			FULFILLED: padString(key, options && options.prefix, '_FULFILLED')
		};
	}
	return map;
}

function padString(key: string, prefix?: string, suffix?: string): string {
	return `${prefix ? `${prefix}_` : ''}${key}${suffix || ''}`;
}

interface AsyncConstant {
	TYPE: string;
	PENDING: string;
	REJECTED: string;
	FULFILLED: string;
}
