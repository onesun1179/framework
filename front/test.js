function solution(numbers) {
	return numbers.map((o, i) => {
		if (i === numbers.length - 1) return -1;

		for (let ii = i + 1; ii < numbers.length; ii++) {}
	});
}

console.log(solution([9, 1, 5, 3, 6, 2]));
