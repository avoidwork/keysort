import assert from "node:assert";
import {keysort} from "../dist/keysort.esm.js";

const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}],
	arrNested = [{data: {abc: 123124, xyz: 5}}, {data: {abc: 123124, xyz: 6}}, {data: {abc: 2, xyz: 5}}];

describe("Testing functionality", function () {
	it("Sort one", function () {
		this.arr = keysort(arr.slice(), "abc");
		assert.equal(this.arr[0].abc, 2, "Should be '2'");
	});

	it("Sort two", function () {
		this.arr = keysort(arr.slice(), "abc, xyz desc");
		assert.equal(this.arr[0].abc, 2, "Should be '2'");
		assert.equal(this.arr[1].xyz, 6, "Should be '6'");
		assert.equal(this.arr[2].xyz, 5, "Should be '5'");
	});

	it("Sort one nested", function () {
		this.arr = keysort(arrNested.slice(), "abc", "data");
		assert.equal(this.arr[0].data.abc, 2, "Should be '2'");
	});

	it("Sort two nested", function () {
		this.arr = keysort(arrNested.slice(), "abc, xyz desc", "data");
		assert.equal(this.arr[0].data.abc, 2, "Should be '2'");
		assert.equal(this.arr[1].data.xyz, 6, "Should be '6'");
		assert.equal(this.arr[2].data.xyz, 5, "Should be '5'");
	});
});
