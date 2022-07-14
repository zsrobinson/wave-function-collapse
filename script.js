const cellNum = 4;
let tiles = [];
let cells = [];

function setup() {
	createCanvas(512, 512);

	tiles.push(new Tile([1, 1, 0, 1], loadImage("img/tee.png")));
	tiles.push(new Tile([1, 1, 0, 0], loadImage("img/bend.png")));
	tiles.push(new Tile([1, 1, 1, 1], loadImage("img/cross.png")));
	tiles.push(new Tile([0, 0, 0, 0], loadImage("img/blank.png")));
	
	for (let i = 0; i < 2; i++) {
		for (let r = 0; r < 3; r++) {
			tiles.push(tiles[i].rotate(r));
		}
	}   

	for (let i = 0; i < cellNum; i++) {
		cells.push([]);
		for (let j = 0; j < cellNum; j++) {
			cells[i][j] = new Cell(i, j);
		}
	}

	cells[1][1].tile = tiles[3];
	
}

function draw() {
	for (let i = 0; i < cellNum; i++) {
		for (let j = 0; j < cellNum; j++) {
			cells[i][j].draw();
		}
	}
	console.log(cells[1][2].determineEntropy())
	noLoop()
}