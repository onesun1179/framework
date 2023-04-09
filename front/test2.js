function solution(picks, minerals) {
	var answer = 0;
	let len = Math.ceil(minerals.length / 5);
	let maxLen = picks.reduce((a, b) => a + b);
	let arr = [];
	if (maxLen === 0) return 0;
	minerals = minerals.splice(0, maxLen * 5);
	console.log(minerals);
	for (let a = 0; a < len; a++) {
		let obj = { d: 0, i: 0, s: 0 };

		minerals.splice(0, 5).map((v) => obj[v[0]]++);
		console.log(obj);
		arr.push([
			obj.d * 1 + obj.i * 1 + obj.s * 1,
			obj.d * 5 + obj.i * 1 + obj.s * 1,
			obj.d * 25 + obj.i * 5 + obj.s * 1,
		]);
	}
	console.log(arr);
	arr
		.sort((a, b) => b[2] - a[2])
		.map((v) => {
			console.log(picks, v);
			if (picks[0] > 0) return picks[0]--, (answer += v[0]);
			if (picks[1] > 0) return picks[1]--, (answer += v[1]);
			if (picks[2] > 0) return picks[2]--, (answer += v[2]);
		});

	console.log(answer);
	return answer;
}

// solution(
// 	[1, 3, 2],
// 	["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"]
// );
// solution(
// 	[0, 1, 1],
// 	[
// 		"diamond",
// 		"diamond",
// 		"diamond",
// 		"diamond",
// 		"diamond",
// 		"iron",
// 		"iron",
// 		"iron",
// 		"iron",
// 		"iron",
// 		"diamond",
// 	]
// );
solution(
	[1, 1, 0],
	[
		"diamond",
		"diamond",
		"diamond",
		"iron",
		"iron",
		"diamond",
		"iron",
		"stone",
		"iron",
		"iron",
		"diamond",
		"diamond",
	]
);
// solution(
// 	[1, 1, 0],
// 	["iron", "iron", "diamond", "iron", "stone", "diamond", "diamond", "diamond"]
// );
