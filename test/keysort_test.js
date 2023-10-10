import assert from "node:assert";
import {keysort} from "../dist/keysort.cjs";

describe("Testing functionality", function () {
	it("Sort one", function () {
		const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

		keysort(arr, "abc");
		assert.strictEqual(arr[0].abc, 2, "Should be '2'");
	});

	it("Sort one (hyphens)", function () {
		const arr = [{"ab-c": 123124, xyz: 5}, {"ab-c": 123124, xyz: 6}, {"ab-c": 2, xyz: 5}];

		keysort(arr, "ab-c");
		assert.strictEqual(arr[0]["ab-c"], 2, "Should be '2'");
	});

	it("Sort one (toSorted)", function () {
		const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

		const sortedArr = keysort(arr, "abc", true);
		assert.strictEqual(arr[0].abc, 123124, "Should be '123124'");
		assert.strictEqual(sortedArr[0].abc, 2, "Should be '2'");
	});

	it("Sort two", function () {
		const arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

		keysort(arr, "abc, xyz desc");
		assert.strictEqual(arr[0].abc, 2, "Should be '2'");
		assert.strictEqual(arr[1].xyz, 6, "Should be '6'");
		assert.strictEqual(arr[2].xyz, 5, "Should be '5'");
	});

	it("Sort one nested", function () {
		const arrNested = [{data: {abc: 123124, xyz: 5}}, {data: {abc: 123124, xyz: 6}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data.abc");
		assert.strictEqual(arrNested[0].data.abc, 2, "Should be '2'");
	});

	it("Sort two nested", function () {
		const arrNested = [{data: {abc: 123124, xyz: 6}}, {data: {abc: 123124, xyz: 5}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data.abc, data.xyz desc");
		assert.strictEqual(arrNested[0].data.abc, 2, "Should be '2'");
		assert.strictEqual(arrNested[1].data.xyz, 6, "Should be '6'");
		assert.strictEqual(arrNested[2].data.xyz, 5, "Should be '5'");
	});

	it("Sort one nested (bracket)", function () {
		const arrNested = [{data: {abc: 123124, xyz: 5}}, {data: {abc: 123124, xyz: 6}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data['abc']");
		assert.strictEqual(arrNested[0].data.abc, 2, "Should be '2'");
	});

	it("Sort two nested (bracket)", function () {
		const arrNested = [{data: {abc: 123124, xyz: 6}}, {data: {abc: 123124, xyz: 5}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data['abc'], data['xyz'] desc");
		assert.strictEqual(arrNested[0].data.abc, 2, "Should be '2'");
		assert.strictEqual(arrNested[1].data.xyz, 6, "Should be '6'");
		assert.strictEqual(arrNested[2].data.xyz, 5, "Should be '5'");
	});

	it("Sort two nested (bracket and period)", function () {
		const arrNested = [{data: {abc: 123124, xyz: 6}}, {data: {abc: 123124, xyz: 5}}, {data: {abc: 2, xyz: 5}}];

		keysort(arrNested, "data['abc'], data.xyz desc");
		assert.strictEqual(arrNested[0].data.abc, 2, "Should be '2'");
		assert.strictEqual(arrNested[1].data.xyz, 6, "Should be '6'");
		assert.strictEqual(arrNested[2].data.xyz, 5, "Should be '5'");
	});

	it("Sort two nested (bracket and period, toSorted)", function () {
		const arrNested = [{data: {abc: 123124, xyz: 6}}, {data: {abc: 123124, xyz: 5}}, {data: {abc: 2, xyz: 5}}];

		const sortedArr = keysort(arrNested, "data['abc'], data.xyz desc", true);
		assert.strictEqual(arrNested[0].data.abc, 123124, "Should be '123124'");
		assert.strictEqual(sortedArr[0].data.abc, 2, "Should be '2'");
	});
});
