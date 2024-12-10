import { Renderer } from "./Renderer.js";

/**
 * Grid
 * @class
 * @classdesc Renders and manages GridSections. Has a one-to-many relationship with the GridSection class.
 */
export class Grid {
	gridToLot = {
		"00": [5242],
		"01": [5242],
		"02": [5242, 5240],
		"03": [5240],
		"10": [5242],
		"11": [5242, 5240],
		"12": [5242, 5240],
		"13": [5240, 5238],
		"14": [5238],
		"20": [5242],
		"21": [5242, 5240],
		"22": [5240, 5238],
		"23": [5240, 5238],
		"24": [5238, 5236],
		"25": [5238, 5236],
		"26": [5214],
		"27": [5214],
		"28": [5214],
		"32": [5240, 5238],
		"33": [5238, 5236],
		"34": [5238, 5236],
		"35": [5236, 5234, 5214],
		"36": [5234, 5214],
		"37": [5214],
		"38": [5214],
		"43": [5238, 5236],
		"44": [5236, 5234],
		"45": [5236, 5234],
		"46": [5234, 5214],
		"47": [5214],
		"54": [5234],
		"55": [5234],
		"56": [5234]
	}

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
