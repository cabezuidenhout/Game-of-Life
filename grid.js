class Grid {
	
	constructor(cellSize, worldWidth, worldHeight) {
		this._cellSize = cellSize;
		this._cols = -1;
		this._rows = -1;
		this._worldWidth = -1;
		this._worldHeight = -1;
		
		this.resizeWorld( worldWidth, worldHeight );
	}
	
	numberOfCells() {
		return this._cols * this._rows;
	}
	
	resizeWorld( worldWidth , worldHeight ) {
		this._worldWidth = worldWidth;
		this._worldHeight = worldHeight;
		this._cols = Math.floor( worldWidth / this._cellSize );
		this._rows = Math.floor( worldHeight / this._cellSize );
	}
	
	set cellSize( newSize ) {
		console.log("Called");
		this._cellSize = newSize;
		this.resizeWorld( this._worldWidth, this._worldHeight );
	}
	
	get cellSize() {
		return this._cellSize;
	}
	
	get rows() {
		return this._rows;
	}
	
	get cols() {
		return this._cols;
	}
}