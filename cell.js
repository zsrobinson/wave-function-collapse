class Cell {
	constructor(i, j) {
		this.tile = null;
		this.i = i;
		this.j = j;
	}

	draw() {
		let x = this.i * width / cellNum;
		let y = this.j * height / cellNum;
		let w = width / cellNum;
		let h = height / cellNum;
		strokeWeight(0);

		if (this.tile) {
			image(this.tile.img, x, y, w, h);
			console.log("drawing tile " + this.tile.sides)
		} else {
			fill(64);
			rect(x, y, w, h);
		}
	}

	determineEntropy() {
		let possibleTiles = tiles.slice(); // creates a copy of the array

		// check up
		if (this.i - 1 >= 0) { // if it exists
			//console.log("the cell above me exists")
			if (cells[this.i][this.j-1].tile) { // and if it has a tile
				//console.log("the cell above me has a tile")
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (cells[this.i][this.j-1].tile.sides[2] != possibleTiles[k].sides[0]) { // if the sides don't match
						//console.log("the cell above me has a tile that doesn't match")
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// set this.tile to a random tile from the possibleTiles array
		this.tile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];
		this.draw()

		return possibleTiles;
	}
}