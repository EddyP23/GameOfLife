/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { GridBox } from "./gridbox";
import { GridItem } from "./griditem";

describe('GridBox', () => {
    it('should return correct height and width', () => {
        let gridBox = new GridBox(5, 10);

        expect(gridBox.height()).toBe(5);
        expect(gridBox.width()).toBe(10);
    });

    it('should run successfull generation with same boundaries', () => {
        let gridBox = new GridBox(5, 5);
        let elements: GridItem[][] = gridBox.elements;

        // xxxxx
        // xxoxx
        // xxoxx
        // xxoxx
        // xxxxx
        gridBox.elements[1][2].isAlive = true;
        gridBox.elements[2][2].isAlive = true;
        gridBox.elements[3][2].isAlive = true;

        gridBox.moveToNextGeneration();

        // xxxxx
        // xxxxx
        // xooox
        // xxxxx
        // xxxxx
        expect(3).toBe(countAllAlive(elements));
        expect(gridBox.elements[2][1].isAlive).toBeTruthy();
        expect(gridBox.elements[2][2].isAlive).toBeTruthy();
        expect(gridBox.elements[2][3].isAlive).toBeTruthy();
        expect(5).toBe(gridBox.height());
        expect(5).toBe(gridBox.width());
    });

    it('should increase boundaries with generation when needed', () => {
        let gridBox = new GridBox(5, 5);
        let elements: GridItem[][] = gridBox.elements;

        // xxxxx
        // xoxxx
        // xoxxx
        // xoxxx
        // xxxxx
        gridBox.elements[1][1].isAlive = true;
        gridBox.elements[2][1].isAlive = true;
        gridBox.elements[3][1].isAlive = true;

        gridBox.moveToNextGeneration();

        // xxxxxx
        // xxxxxx
        // xoooxx
        // xxxxxx
        // xxxxxx
        expect(3).toBe(countAllAlive(elements));
        expect(gridBox.elements[2][1].isAlive).toBeTruthy();
        expect(gridBox.elements[2][2].isAlive).toBeTruthy();
        expect(gridBox.elements[2][3].isAlive).toBeTruthy();
        expect(5).toBe(gridBox.height());
        expect(6).toBe(gridBox.width());        
    });
});


export function countAllAlive(elements: GridItem[][]): number {
    return elements
        .map(row => row.filter(el => el.isAlive).length)
        .reduce((acc, curr) => acc + curr, 0);
}
