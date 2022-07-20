const cellNum = 10;
let tiles = [];
let cells = [];
let done = false;
let cellStates = [];
let stateNum = 0;

function setup() {
	createCanvas(512, 512);

	/* tiles.push(new Tile([1, 1, 0, 1], loadImage("lines/tee.png")));
	tiles.push(new Tile([1, 1, 0, 0], loadImage("lines/bend.png")));
	tiles.push(new Tile([1, 1, 1, 1], loadImage("lines/cross.png")));
	tiles.push(new Tile([0, 0, 0, 0], loadImage("lines/blank.png"))); */

	tiles.push(new Tile(["aaa", "aaa", "aaa", "aaa"], loadImage("circuit/0.png"), 0))
	tiles.push(new Tile(["bbb", "bbb", "bbb", "bbb"], loadImage("circuit/1.png"), 1))
	tiles.push(new Tile(["bbb", "bdb", "bbb", "bbb"], loadImage("circuit/2.png"), 2))
	tiles.push(new Tile(["bbb", "bcb", "bbb", "bcb"], loadImage("circuit/3.png"), 3))
	tiles.push(new Tile(["abb", "bdb", "bba", "aaa"], loadImage("circuit/4.png"), 4))
	tiles.push(new Tile(["abb", "bbb", "bbb", "bba"], loadImage("circuit/5.png"), 5))
	tiles.push(new Tile(["bbb", "bdb", "bbb", "bdb"], loadImage("circuit/6.png"), 6))
	tiles.push(new Tile(["bcb", "bdb", "bcb", "bdb"], loadImage("circuit/7.png"), 7))
	tiles.push(new Tile(["bcb", "bbb", "bdb", "bbb"], loadImage("circuit/8.png"), 8))
	tiles.push(new Tile(["bdb", "bdb", "bbb", "bdb"], loadImage("circuit/9.png"), 9))
	tiles.push(new Tile(["bdb", "bdb", "bdb", "bdb"], loadImage("circuit/10.png"), 10))
	tiles.push(new Tile(["bdb", "bdb", "bbb", "bbb"], loadImage("circuit/11.png"), 11))
	tiles.push(new Tile(["bbb", "bdb", "bbb", "bdb"], loadImage("circuit/12.png"), 12))

	for (let i = 0; i < cellNum; i++) {
		cells.push([]);
		for (let j = 0; j < cellNum; j++) {
			cells[i][j] = new Cell(i, j);
		}
	}

	
}

// okay so everything seems to actually work when
// I add a bit of delay to each step

// this fixed the problem where the width and height
// of the rotated tiles was just one and other
// weird things happening...

function draw() {
	setTimeout(rotateTiles, 500);
	setTimeout(step, 1000);
	noLoop();
}

function rotateTiles() {
	const len = tiles.length
	for (let i = 0; i < len; i++) {
		for (let r = 0; r < 3; r++) {
			tiles.push(tiles[i].rotate(r + 1));
		}
	}  
}

function findLeastEntropyTiles() {
	let leastEntropyTiles = [];
	let leastEntropy;

	for (let i = 0; i < cellNum; i++) {
		for (let j = 0; j < cellNum; j++) {

			let tileEntropy = cells[i][j].entropy()
			if (tileEntropy == "collapsed") continue;
			if (tileEntropy.length == 0) {
				return "backtrack!";
			};

			if (leastEntropy == undefined) {
				leastEntropy = tileEntropy.length;
				leastEntropyTiles.push(cells[i][j])
			} else if (leastEntropy == tileEntropy.length) {
				leastEntropyTiles.push(cells[i][j])
			} else if (leastEntropy > tileEntropy.length) {
				leastEntropy = tileEntropy.length;
				leastEntropyTiles = [cells[i][j]];
			}
		}
	}

	if (leastEntropyTiles.length == 0) { done = true; return; }

	let cellToCollapse = leastEntropyTiles[Math.floor(Math.random() * leastEntropyTiles.length)];
	let cellToCollapseEntropy = cellToCollapse.entropy();
	cellToCollapse.tile = cellToCollapseEntropy[Math.floor(Math.random() * cellToCollapseEntropy.length)]
}

function step() {
	
	drawTiles();

	if (findLeastEntropyTiles() == "backtrack!") {
		console.log("backtracking");
		console.log("current state: " + stateNum);
		console.log("backtracked to state: " + cellStates[0].num);
		console.log(cells == cellStates[0].cells);
		cells = cloneArray(cellStates[0].cells);
		console.log(cells == cellStates[0].cells);
		drawTiles();

		return

	} else {
		if (done) { return; }

		cellStates.push({num: stateNum, cells: cloneArray(cells)});
		stateNum++;
		if (cellStates.length > 8) {
			cellStates.shift();
		}

		setTimeout(step, 50);
	}

}

function drawTiles() {
	for (let i = 0; i < cellNum; i++) {
		for (let j = 0; j < cellNum; j++) {
			cells[i][j].draw();
			cells[i][j].displayEntropy();
		}
	}
}

// https://stackoverflow.com/a/45949356
function cloneArray(a){
	return a.map(e => Array.isArray(e) ? cloneArray(e) : e);
  };