export function explode (obj, arg = ",") {
	return obj.trim().split(new RegExp(`\\s*${arg}\\s*`));
}
