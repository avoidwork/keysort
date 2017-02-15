	// Node, AMD & window supported
	if (typeof exports !== "undefined") {
		module.exports = sort;
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return sort;
		});
	} else {
		global.keysort = sort;
	}
}(this));
