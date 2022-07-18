const cellNum = 16;
let tiles = [];
let cells = [];
let done = false;

function setup() {
	createCanvas(512, 512);

	tiles.push(new Tile([1, 1, 0, 1], loadImage("img/tee.png")));
	tiles.push(new Tile([1, 1, 0, 0], loadImage("img/bend.png")));
	tiles.push(new Tile([1, 1, 1, 1], loadImage("img/cross.png")));
	tiles.push(new Tile([0, 0, 0, 0], loadImage("img/blank.png")));

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
	setTimeout(rotateTiles, 100)
	setTimeout(start, 200)
	noLoop();
}

function rotateTiles() {
	for (let i = 0; i < 2; i++) {
		for (let r = 0; r < 3; r++) {
			tiles.push(tiles[i].rotate(r + 1));
		}
	}  
}

function start() {
	cells[1][1].tile = tiles[Math.floor(Math.random() * tiles.length)]
	step();
}

function findLeastEntropyTiles() {
	let leastEntropyTiles = [];
	let leastEntropy;

	for (let i = 0; i < cellNum; i++) {
		for (let j = 0; j < cellNum; j++) {

			let tileEntropy = cells[i][j].entropy()
			if (tileEntropy == 0) continue;

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
	findLeastEntropyTiles();
	if (done) return;
	setTimeout(step, 10);
}

function drawTiles() {
	for (let i = 0; i < cellNum; i++) {
		for (let j = 0; j < cellNum; j++) {
			cells[i][j].draw();
			cells[i][j].displayEntropy();
		}
	}
}