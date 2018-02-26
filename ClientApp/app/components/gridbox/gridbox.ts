import { GridItem } from "./griditem";

export class GridBox {
    elements: GridItem[][] = [[]];

    constructor(height: number, width: number) {
        this.elements = this.generateDeadElements(height, width);
    }

    moveToNextGeneration() {
        this.elements = this.generateNextGeneration();
        this.increaseBoundariesIfNeeded();
    }

    height(): number {
        return this.elements.length;
    }

    width(): number {
        return this.elements[0].length;
    }

    private generateNextGeneration(): GridItem[][] {
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

    private countAliveNeighbours(h: number, w: number): number {
        let aliveNeighbours = 0
                
        for(let i = h - 1; i <= h + 1; i++) {
            for(let j = w - 1; j <= w + 1; j++) {
                if((i !== h) || (j !== w)) { // Ignore element itself
                    try { // Certain neighbours might not exist at the edges
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

    private increaseBoundariesIfNeeded() {
        // top row
        if (this.isAnyAlive(this.elements[0])) {
            let gridItems = this.generateGridItemsLength(this.width());
            this.elements.unshift(gridItems);
        }

        // bottom row
        if (this.isAnyAlive(this.elements[this.height() - 1])) {
            let gridItems = this.generateGridItemsLength(this.width());
            this.elements.push(gridItems);
        }

        // left side
        if (this.isAnyAlive(this.elements.map(row => row[0]))) {
            this.elements.forEach(row => row.unshift(new GridItem()));
        }

        // right side
        if (this.isAnyAlive(this.elements.map(row => row[this.width() - 1]))) {        
            this.elements.forEach(row => row.push(new GridItem()));
        }
    }

    private isAnyAlive(items: GridItem[]): boolean {
        return items.some(item => item.isAlive);
    }

    private generateDeadElements(height: number, width: number): GridItem[][] {
        return Array(height).fill(undefined).map(() => this.generateGridItemsLength(width));
    }

    private generateGridItemsLength(l: number): GridItem[] {
        return Array(l).fill(undefined).map(() => new GridItem());
    }
}
