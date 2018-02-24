import { GridItem } from "./griditem";

export class GridBox {
    private height: number;
    private width: number;

    elements: GridItem[][] = [[]];

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;

        this.elements = [];
        for (let h = 0; h < height; h++) {
            this.elements[h] = [];
            for (let w = 0; w < width; w++) {
                this.elements[h][w] = new GridItem();
            }
        }
    }

    goNext() {
        console.log('goin next');
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                let aliveNeighbours = 0;
                
                for(let i = h - 1; i <= h + 1; i++) {
                    for(let j = w - 1; j <= w + 1; j++) {
                        if(!((i === h) && (j === w))) {
                            try {
                                let neighbourElement = this.elements[i][j];
                                if(neighbourElement.isAlive) {
                                    aliveNeighbours++;
                                }
                            } catch (e) {
                                console.log(e);
                                // we ignore the error
                            }
                        }
                    }
                }

                let isAliveNext = aliveNeighbours == 2 || aliveNeighbours === 3;

                this.elements[h][w].recordNextValue(isAliveNext);
            }
        }

        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                this.elements[h][w].goToNext();
            }
        }
    }
}
