class Cell {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.tile = undefined;

		this.x = i * width / cellNum;
		this.y = j * height / cellNum;
		this.w = width / cellNum;
		this.h = height / cellNum;
	}

	draw() {
		strokeWeight(0);
		if (this.tile) {
			image(this.tile.img, this.x, this.y, this.w, this.h);
		} else {
			fill(64);
			rect(this.x, this.y, this.w, this.h);
		}
	}

	displayEntropy() {
		fill("white")
		textSize(this.w/3)
		const num = this.entropy().length;
		if (num == 0) return
		text(num, this.x + this.w/2, this.y + this.h/2)
	}

	entropy() {
		if (this.tile) {
			return [];
		}

		let possibleTiles = tiles.slice(); // creates a copy of the array

		// check up
		if (this.j > 0) { // if it exists
			if (cells[this.i][this.j-1].tile) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (cells[this.i][this.j-1].tile.sides[2] != possibleTiles[k].sides[0]) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// check right
		if (this.i < cellNum - 1) { // if it exists
			if (cells[this.i+1][this.j].tile) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (cells[this.i+1][this.j].tile.sides[3] != possibleTiles[k].sides[1]) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// check down
		if (this.j < cellNum - 1) { // if it exists
			if (cells[this.i][this.j+1].tile) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (cells[this.i][this.j+1].tile.sides[0] != possibleTiles[k].sides[2]) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// check left
		if (this.i > 0) { // if it exists
			if (cells[this.i-1][this.j].tile) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (cells[this.i-1][this.j].tile.sides[1] != possibleTiles[k].sides[3]) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		return possibleTiles;
	}
}