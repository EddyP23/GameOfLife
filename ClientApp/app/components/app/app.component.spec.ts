/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { assert } from 'chai';
import { AppComponent } from './app.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { GridBoxComponent } from '../gridbox/gridbox.component';
import { Component } from '@angular/core';

@Component({
    selector: 'gridbox',
    template: ''
})
export class GridBoxComponentMock {
}

let fixture: ComponentFixture<AppComponent>;

describe('App component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [AppComponent, GridBoxComponentMock] });
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual("Conway's Game of Life");
    }));
});
