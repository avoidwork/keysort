var keysort   = require("../lib/keysort.js"),
    arr       = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}],
    arrNested = [{data:{abc: 123124, xyz: 5}}, {data:{abc: 123124, xyz: 6}}, {data:{abc: 2, xyz: 5}}];

exports["one"] = {
	setUp: function (done) {
		this.arr = keysort(arr.slice(), "abc");
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(this.arr[0].abc, 2, "Should be '2'");
		test.done();
	}
};

exports["two"] = {
	setUp: function (done) {
		this.arr = keysort(arr.slice(), "abc, xyz desc");
		done();
	},
	test: function (test) {
		test.expect(3);
		test.equal(this.arr[0].abc, 2, "Should be '2'");
		test.equal(this.arr[1].xyz, 6, "Should be '6'");
		test.equal(this.arr[2].xyz, 5, "Should be '5'");
		test.done();
	}
};

exports["oneNested"] = {
	setUp: function (done) {
		this.arr = keysort(arrNested.slice(), "abc", "data");
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(this.arr[0].data.abc, 2, "Should be '2'");
		test.done();
	}
};

exports["twoNested"] = {
	setUp: function (done) {
		this.arr = keysort(arrNested.slice(), "abc, xyz desc", "data");
		done();
	},
	test: function (test) {
		test.expect(3);
		test.equal(this.arr[0].data.abc, 2, "Should be '2'");
		test.equal(this.arr[1].data.xyz, 6, "Should be '6'");
		test.equal(this.arr[2].data.xyz, 5, "Should be '5'");
		test.done();
	}
};
