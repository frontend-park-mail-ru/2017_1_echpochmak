function findPath() {

	const checkpoints = [
		[0,2],
		[2,0]
	];

	const start = [0,0];
	const finish = [4,4];
	checkpoints.push(finish);

	const matrix = [
		[0,1,0,0,0],
		[0,0,0,1,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,1,0,0,0],
	];

	const grid = new PF.Grid(matrix);
	const finder = new PF.BiAStarFinder({
		allowDiagonal: true,
		heuristic: PF.Heuristic.euclidean
	});

	let path = [];
	curStart = start;
	for (let i = 0; i < checkpoints.length; i++) {
		if (i > 0) {
			curStart = checkpoints[i-1];
		}
		let subStart = curStart;
		let subFinish = checkpoints[i];
		let subPath = finder.findPath(subStart[0], subStart[1], subFinish[0], subFinish[1], grid);
		// path.concat(finder.findPath(curStart[0], curStart[1], checkpoints[i][0], checkpoints[i][1], grid));
		path.concat([subPath]);
		// if (i > 0) {
		// 	curStart = checkpoints[i-1];
		// }
		console.log(subPath);
		console.log(subStart);
		console.log(subFinish);
	}

	// const path = finder.findPath(start[0], start[1], finish[0], finish[1], grid);
	console.log(path);
	// for (const step of path) {
	// 	console.log(step);
	// }
} 

findPath();
