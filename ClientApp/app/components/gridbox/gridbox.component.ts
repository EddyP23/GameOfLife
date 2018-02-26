import { Component, Input } from '@angular/core';
import { GridBox } from './gridbox';

@Component({
    selector: 'gridbox',
    templateUrl: './gridbox.component.html',
    styleUrls: ['./gridbox.component.css']
})
export class GridBoxComponent {
    readonly defaultHeight = 15;
    readonly defaultWidth = 20;

    private gridBox: GridBox;

    private generationDuration: number;
    private setIntervalNumber: number;

    constructor() {
        this.initGridBox();

        this.generationDuration = 1000;
        this.setIntervalNumber = -1;
    }

    isRunning(): boolean {
        return this.setIntervalNumber >= 0;
    }

    initGridBox(): void {
        this.gridBox = new GridBox(this.defaultHeight, this.defaultWidth);
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

    cellHeightWidth(): string {
        // TODO: could be adjusted for different screens
        if ((this.gridBox.height() < 25) && (this.gridBox.width() < 40)) {
            return '20px';
        } else if ((this.gridBox.height() > 50) || (this.gridBox.width() > 80)) {
            return '5px';
        } else {
            return '10px';
        }
    }
}
