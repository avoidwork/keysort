import assert from "node:assert";
import {keysort} from "../dist/keysort.esm.js";

describe("Testing functionality", function () {
	it("Sort one", function () {
		const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

		keysort(arr, "abc");
		assert.equal(arr[0].abc, 2, "Should be '2'");
	});

	it("Sort two", function () {
		const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

		keysort(arr, "abc, xyz desc");
		assert.equal(arr[0].abc, 2, "Should be '2'");
		assert.equal(arr[1].xyz, 6, "Should be '6'");
		assert.equal(arr[2].xyz, 5, "Should be '5'");
	});

	it("Sort one nested", function () {
		const arrNested = [{data: {abc: 123124, xyz: 5}}, {data: {abc: 123124, xyz: 6}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data.abc");
		assert.equal(arrNested[0].data.abc, 2, "Should be '2'");
	});

	it("Sort two nested", function () {
		const arrNested = [{data: {abc: 123124, xyz: 6}}, {data: {abc: 123124, xyz: 5}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data.abc, data.xyz desc");
		assert.equal(arrNested[0].data.abc, 2, "Should be '2'");
		assert.equal(arrNested[1].data.xyz, 6, "Should be '6'");
		assert.equal(arrNested[2].data.xyz, 5, "Should be '5'");
	});
});
