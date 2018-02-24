export class GridItem {
    isAlive: boolean = false;

    private _nextValue: boolean;

    recordNextValue(next: boolean): void {
        this._nextValue = next;
    }

    goToNext(): void {
        this.isAlive = this._nextValue;
    }
}
