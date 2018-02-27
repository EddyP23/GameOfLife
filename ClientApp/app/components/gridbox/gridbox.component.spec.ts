/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { assert } from 'chai';
import { GridBoxComponent } from './gridbox.component';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let fixture: ComponentFixture<GridBoxComponent>;

export function expectCellAlive(el: HTMLDivElement): boolean {
    let areClassesCorrect = el.classList.contains('cell--alive') &&
                      ! (el.classList.contains('cell--dead'));
    return expect(areClassesCorrect).toBeTruthy();
}

export function expectCellDead(el: HTMLDivElement): boolean {
    let areClassesCorrect = el.classList.contains('cell--dead') &&
                         ! (el.classList.contains('cell--alive'));
    return expect(areClassesCorrect).toBeTruthy();
}

export function getGridItem(i: number, j: number): HTMLDivElement {
    let irow = fixture.nativeElement.querySelectorAll('tr')[i];
    let jcell = irow.querySelectorAll('td div')[j];

    return jcell;
}

export function startRun(): void {
    const startButton = fixture.nativeElement.querySelector('button.button--start');
    startButton.click();
}

export function stopRun(): void {
        // Stop the run, as angular fails with '1 periodic timer(s) still in the queue.'
        // This needs to be run in the test and not in 'afterEach'
        const stopButton = fixture.nativeElement.querySelector('button.button--stop');
        stopButton.click();
}

describe('Counter component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [GridBoxComponent], imports: [CommonModule, FormsModule ] });
        fixture = TestBed.createComponent(GridBoxComponent);
        fixture.detectChanges();
    });

    it('should display three buttons', async(() => {
        const buttons = fixture.nativeElement.querySelectorAll('button');

        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toBe('Start');
        expect(buttons[1].textContent).toBe('Stop');
        expect(buttons[2].textContent).toBe('Reset Grid');
    }));

    it('should run after Start', fakeAsync(() => {
        let firstGridElement = getGridItem(1, 1);
        expectCellDead(getGridItem(1, 1));

        firstGridElement.click();
        fixture.detectChanges();

        expectCellAlive(getGridItem(1, 1));

        startRun();

        tick(500);
        fixture.detectChanges();
        expectCellAlive(getGridItem(1, 1)); // Should still be alive after half of the time

        tick(550);
        fixture.detectChanges();
        expectCellDead(getGridItem(1, 1)); // Should be dead after more than a second

        stopRun();
    }));

    it('should run with a more complicated setup', fakeAsync(() => {
        //xxxxx
        //xxoxx
        //xxoxx
        //xxoxx
        //xxxxx
        getGridItem(1, 2).click();
        getGridItem(2, 2).click();
        getGridItem(3, 2).click();

        fixture.detectChanges();
        startRun();

        tick(1100);
        fixture.detectChanges();

        //xxxxx
        //xxxxx
        //xooox
        //xxxxx
        //xxxxx
        expectCellAlive(getGridItem(2, 1));
        expectCellAlive(getGridItem(2, 2));
        expectCellAlive(getGridItem(2, 3));
        expectCellDead(getGridItem(1, 2));
        expectCellDead(getGridItem(3, 2));

        tick(1100);
        fixture.detectChanges();

        //xxxxx
        //xxoxx
        //xxoxx
        //xxoxx
        //xxxxx
        expectCellAlive(getGridItem(1, 2));
        expectCellAlive(getGridItem(2, 2));        
        expectCellAlive(getGridItem(3, 2));
        expectCellDead(getGridItem(2, 1));
        expectCellDead(getGridItem(2, 3));

        stopRun();
    }));

    it('should increase grid when needed', fakeAsync(() => {
        //xxxxx
        //xoxxx
        //xoxxx
        //xoxxx
        //xxxxx
        getGridItem(1, 1).click();
        getGridItem(2, 1).click();
        getGridItem(3, 1).click();

        let width = fixture.componentInstance.defaultWidth;
        expect(getGridItem(1, width)).toBeUndefined();

        fixture.detectChanges();
        startRun();
        tick(1100);
        fixture.detectChanges();   

        expect(getGridItem(1, width)).toBeDefined();
        expectCellDead(getGridItem(1, width));

        stopRun();
    }));
});
