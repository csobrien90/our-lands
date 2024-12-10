import { Renderer } from "./Renderer.js";

/**
 * Grid
 * @class
 * @classdesc Renders and manages GridSections. Has a one-to-many relationship with the GridSection class.
 */
export class Grid {
	gridSectionsIOwn = [
		"00", "01", "02", "03",
		"10", "11", "12", "13", "14",
		"20", "21", "22", "23", "24", "25", "26", "27", "28",
		"32", "33", "34", "35", "36", "37", "38",
		"43", "44", "45", "46", "47",
		"54", "55", "56"
	]


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
    for (let i = 0; i < 6; i++) {
      this.grid.push([]);
      for (let j = 0; j < 9; j++) {
        this.renderer.createGridSection(i, j, this);
      }
    }
  }
}
