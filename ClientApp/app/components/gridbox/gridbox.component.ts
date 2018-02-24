import { Component, Input } from '@angular/core';
import { GridBox } from './gridbox';

@Component({
    selector: 'gridbox',
    templateUrl: './gridbox.component.html',
    styleUrls: ['./gridbox.component.css']
})
export class GridBoxComponent {
    private _width: number;
    private _height: number;
    private gridBox: GridBox;

    private generationDuration: number = 1000;
    private setIntervalNumber: number = -1;

    constructor() {
        this._height = 0;
        this._width = 0;
        this.initGridBox();
    }

    @Input()
    set width(w: number) {
        this._width = w;
        this.initGridBox();
    }
    
    @Input()
    set height(h: number) {
        this._height = h;
        this.initGridBox();
    }

    isRunning(): boolean {
        return this.setIntervalNumber >= 0;
    }

    initGridBox(): void {
        this.gridBox = new GridBox(this._height, this._width);
    }

    start(): void {
        if(! this.isRunning()) {
            this.setIntervalNumber = setInterval(() => this.runGeneration(), this.generationDuration);
        
            console.log("Starting time " + this.setIntervalNumber);
        }
    }

    stop(): void {
        if(this.isRunning()) {
            console.log("stopping time");
            clearInterval(this.setIntervalNumber);
            this.setIntervalNumber = -1;
        }
    }

    runGeneration(): void {
        console.log("Generation ran :)");
    }
}
