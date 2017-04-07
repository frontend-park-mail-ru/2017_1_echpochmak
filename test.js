const PF = require('pathfinding');

function findPath() {
	let matrix = [
		[0,1,0,0,0],
		[0,0,0,1,0],
		[0,1,0,0,0],
		[0,1,0,1,0],
		[0,0,0,1,0]
	]

	const grid = new PF.Grid(matrix);
	const finder = new PF.BiAStarFinder({
		allowDiagonal: true,
		heuristic: PF.Heuristic.euclidean
	});

	const path = finder.findPath(0, 0, 4, 4, grid);
	console.log(path);
}

findPath();