/* Please refractor!!!!*/
const cellSize = 8; //Maybe allow user to change this
let currentState = [];
let nextState = [];
let grid;

function setup() {
  createCanvas(window.innerWidth-5,window.innerHeight-5);
  initColors();
  
  grid = new Grid( cellSize, width, height );
  
  initGame();
}

function draw() {
	
	let t0 = performance.now();

	background(colors.deepPurple);
	drawState(currentState, grid);
  
	currentState = getNextState();  
	
	let t1 = performance.now();
	
	if( (frameCount % 60) == 0 ) {
		console.log("Loop time: " + (t1-t0) + "ms");
	}
  
	
}

function windowResized() {
  resizeCanvas(window.innerWidth-5, window.innerHeight-5);
  initGame();
}


function getInitialState(numberOfCells, lifeProbability = 0.5) {
	initialState = [];
	
	for( let i = 0 ; i < numberOfCells ; i++ ) {
		initialState.push( ( random() <= lifeProbability ? 1 : 0 )  );
	}
	
	return initialState;
}

function initGame() {
	grid.resizeWorld( width, height );
	nextState = [grid.numberOfCells()];	
	currentState = getInitialState(grid.numberOfCells(), 0.1);
	
	nextState = getNextState(currentState);
}

function drawState( state, grid ) {
	stroke(0);
	
	
	for( let x = 0; x < grid.cols ; x++ ) {
		for( let y = 0; y < grid.rows ; y++) {
			//TODO : Allow for cellSize of 1				
			if( getState(currentState,x,y) === 1 ) {
				fill(colors.green);
			} else {
				fill(colors.deepPurple);
			}
			
			rect(x * grid.cellSize ,y * grid.cellSize , grid.cellSize, grid.cellSize)
		}
	}
}

function getState( states, x, y , show = false ) {
	
	let _x , _y;
	
	if( x < 0 ) {
		_x = grid.cols-1;
	} else if( x >= grid.cols ) {
		_x = 0;
	} else {
		_x = x;
	}

	if( y < 0 ) {
		_y = grid.rows-1;
	} else if( y >= grid.rows ) {
		_y = 0;
	} else {
		_y = y;
	}
	
	if( show )
		console.log( `(${x},${y}) => (${_x},${_y}) = ${states[_x + grid.cols*_y]}`);
	
	return states[_x + grid.cols*_y];
}

function setState( states, toState, x, y ) {
	states[x+grid.cols*y] = toState;
}

function getNextState() {
	let newState = [currentState.size];
	
	for( let x = 0; x < grid.cols ; x++ ) {
		for( let y = 0; y < grid.rows ; y++) {
			let neighbors = getNeighbors(x,y);
			
			if( neighbors < 2 || neighbors > 3 ) {
				setState(newState, 0, x, y);
			} else if( neighbors === 3 ) {
				setState(newState, 1, x, y);
			} else {
				setState(newState, getState(currentState,x,y), x, y); 
			}
		}
	}
	
	return newState;
}

function getNeighbors(x,y) {
	
	let neighbors = -1*getState(currentState, x, y);
	
	for( let i = -1; i < 2 ; i++ ) {
		for( let j = -1; j < 2; j++) {
			neighbors += getState( currentState, x+i, y+j);
		}
	}
	
	return neighbors;
}
