const cellStates = {
    DEAD: 0,
    ALIVE: 1
}

class Cell {
    constructor( size = 1, state ) {
        this.size_ = size;
        this.state_ = ( state ? state : this.getRandomState() );
    }

    static getRandomState() {
        let keys = Object.keys(cellStates);
        return cellStates[ keys[ Math.floor( random(keys.length) )] ];
    }

}