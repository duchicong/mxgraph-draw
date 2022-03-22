import { mxCellState } from "./factory";

export default class CellState extends mxCellState {
    // Constructs a new object that represents the current state of the given cell in the specified view.
    constructor(view, cell, style) {
        super(view, cell, style)
        console.log('cellState ', {view, cell, style})
    }

}