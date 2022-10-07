export function explode (obj, arg = ",") {
	return obj.replace(/^(\s+|\t+)|(\s+|\t+)$/g, "").split(new RegExp("\\s*" + arg + "\\s*"));
}
