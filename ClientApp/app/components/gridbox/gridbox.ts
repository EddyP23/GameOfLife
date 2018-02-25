import { GridItem } from "./griditem";

export class GridBox {
    elements: GridItem[][] = [[]];

    constructor(height: number, width: number) {
        this.elements = this.generateDeadElements(height, width);
    }

    goNext() {
        this.elements = this.moveToNextGeneration();
        this.increaseBoundaries();
    }

    private generateDeadElements(height: number, width: number): GridItem[][] {
        let gridItems: GridItem[][] = [];
        for (let h = 0; h < height; h++) {
            gridItems[h] = [];
            for (let w = 0; w < width; w++) {
                gridItems[h][w] = new GridItem();
            }
        }

        return gridItems;
    }

    private moveToNextGeneration(): GridItem[][] {
        let newElements = this.generateDeadElements(this.height(), this.width());

        for (let h = 0; h < this.height(); h++) {
            for (let w = 0; w < this.width(); w++) {
                let aliveNeighbours = this.countAliveNeighbours(h, w);

                if (this.elements[h][w].isAlive) {
                    newElements[h][w].isAlive = aliveNeighbours === 2 || aliveNeighbours === 3;
                } else {
                    newElements[h][w].isAlive = aliveNeighbours === 3;
                }
            }
        }

        return newElements;
    }

    private increaseBoundaries() {
        // top row
        if (this.elements[0].some(this.isAlive)) {
            this.elements.unshift(Array(this.width()).fill(() => new GridItem()));
        }

        // bottom row
        if (this.elements[this.height() - 1].some(this.isAlive)) {
            this.elements.push(Array(this.width()).fill(() => new GridItem()));
        }

        // left side
        let zeroToHeigh = Array.from(Array(this.height()).keys())
        if (zeroToHeigh.map(i => this.elements[i][0]).some(this.isAlive)) {
            this.elements.forEach(row => row.unshift(new GridItem()));
        }

        // right side
        zeroToHeigh = Array.from(Array(this.height()).keys())
        if (zeroToHeigh.map(i => this.elements[i][this.width() - 1]).some(this.isAlive)) {
            this.elements.forEach(row => row.push(new GridItem()));
        }
    }

    private isAlive(item: GridItem) {
        return item.isAlive
    }

    private countAliveNeighbours(h: number, w: number): number {
        let aliveNeighbours = 0
                
        for(let i = h - 1; i <= h + 1; i++) {
            for(let j = w - 1; j <= w + 1; j++) {
                if((i !== h) || (j !== w)) { // Ignore element itself
                    try {
                        // Certain neighbours might not exist
                        if(this.elements[i][j].isAlive) {
                            aliveNeighbours++;
                        }
                    } catch (e) {
                        // we ignore the error
                    }
                }
            }
        }

        return aliveNeighbours;
    }

    private height(): number {
        return this.elements.length;
    }

    private width(): number {
        return this.elements[0].length;
    }
}
