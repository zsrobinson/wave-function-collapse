class Tile {
	constructor(sides, img) {
		this.sides = sides;
		this.img = img;
	}

	rotate(n) { // pretty much sourced directly from The Coding Train
		
		// rotate the image
		const w = this.img.width;
		const h = this.img.height;
		const newImg = createGraphics(w, h);
		newImg.imageMode(CENTER);
		newImg.translate(w / 2, h / 2);
		newImg.rotate(HALF_PI * n);
		newImg.image(this.img, 0, 0);

		// rotate the sides array
		const newSides = [];
		const len = this.sides.length;
		for (let i = 0; i < len; i++) {
			newSides[i] = this.sides[(i - n + len) % len];
		}

		return new Tile(newSides, newImg);
	}
}