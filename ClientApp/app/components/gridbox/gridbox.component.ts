import { Component, Input } from '@angular/core';
import { GridBox } from './gridbox';

@Component({
    selector: 'gridbox',
    templateUrl: './gridbox.component.html',
    styleUrls: ['./gridbox.component.css']
})
export class GridBoxComponent {
    private gridBox: GridBox;

    private generationDuration: number;
    private setIntervalNumber: number;

    constructor() {
        this.initGridBox(15, 20);

        this.generationDuration = 1000;
        this.setIntervalNumber = -1;
    }

    isRunning(): boolean {
        return this.setIntervalNumber >= 0;
    }

    initGridBox(height: number, width: number): void {
        this.gridBox = new GridBox(height, width);
    }

    start(): void {
        if(! this.isRunning()) {
            this.setIntervalNumber = setInterval(() => this.runGeneration(), this.generationDuration);
        }
    }

    stop(): void {
        if(this.isRunning()) {
            clearInterval(this.setIntervalNumber);
            this.setIntervalNumber = -1;
        }
    }

    runGeneration(): void {
        this.gridBox.goNext();
    }
}
