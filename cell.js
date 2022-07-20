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
		if (this.tile) return
		fill("white")
		textSize(this.w/3)
		const num = this.entropy().length;
		text(num, this.x + this.w/2, this.y + this.h/2)
	}

	entropy() {
		if (this.tile) {
			return [];
		}

		let possibleTiles = tiles.slice(); // creates a copy of the array

		// could I condense all of these checks into a loop? probably.
		// but I don't have the energy for that rn
		// *ctrl-c ctrl-v*

		let upCell, rightCell, downCell, leftCell;

		// check up
		if (this.j > 0) { // if it exists
			upCell = cells[this.i][this.j-1].tile;
			if (upCell) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (upCell.sides[2] != revStr(possibleTiles[k].sides[0])) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// check right
		if (this.i < cellNum - 1) { // if it exists
			rightCell = cells[this.i+1][this.j].tile;
			if (rightCell) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (rightCell.sides[3] != revStr(possibleTiles[k].sides[1])) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// check down
		if (this.j < cellNum - 1) { // if it exists
			downCell = cells[this.i][this.j+1].tile;
			if (downCell) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (downCell.sides[0] != revStr(possibleTiles[k].sides[2])) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// check left
		if (this.i > 0) { // if it exists
			leftCell = cells[this.i-1][this.j].tile;
			if (leftCell) { // and if it has a tile
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (leftCell.sides[1] != revStr(possibleTiles[k].sides[3])) { // if the sides don't match
						possibleTiles.splice(k, 1); // remove it
					}
				}
			}
		}

		// tile 5 cannot be matched with tile 5
		let dirCells = [upCell, rightCell, downCell, leftCell];
		dirCells.forEach(dirCell => {
			try {
				for (var k = possibleTiles.length -1; k >= 0 ; k--) {
					if (possibleTiles[k].index == 5 && dirCell.index == 5) {
						possibleTiles.splice(k, 1);
					}
				}
			} catch {}
		})

		// would ideally implement backtracking here
		if (possibleTiles.length == 0) {
			location.reload()
		}

		return possibleTiles;
	}
}

function revStr(str) {
	return str.split("").reverse().join("");
}