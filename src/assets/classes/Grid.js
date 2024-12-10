import { Renderer } from "./Renderer.js";

/**
 * Grid
 * @class
 * @classdesc Renders and manages GridSections. Has a one-to-many relationship with the GridSection class.
 */
export class Grid {
  /**
   * @param {HTMLElement} gridWrapper - The element that will contain the grid
   * @param {Renderer} renderer - The Renderer
   */
  constructor(gridWrapper, renderer) {
    this.gridWrapper = gridWrapper;
    this.renderer = renderer;
    this.grid = [];
    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < 7; i++) {
      this.grid.push([]);
      for (let j = 0; j < 10; j++) {
        this.renderer.createGridSection(i, j, this);
      }
    }
  }
}
