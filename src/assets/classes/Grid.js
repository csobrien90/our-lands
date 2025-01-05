import { Renderer } from "./Renderer.js";
import { SyncManager } from "./SyncManager.js";

/**
 * Grid
 * @class
 * @classdesc Renders and manages GridSections. Has a one-to-many relationship with the GridSection class.
 */
export class Grid {
	gridToLot = {
		"06": [5214],
		"07": [5214],
		"08": [5214],
		"12": [5240],
		"16": [5214],
		"17": [5214],
		"18": [5214],
		"21": [5242, 5240],
		"22": [5240],
		"23": [5240, 5238],
		"24": [5238],
		"25": [5236],
		"26": [5214, 5236, 5234],
		"27": [5214],
		"28": [5214],
		"30": [5242],
		"31": [5242, 5240],
		"32": [5240],
		"33": [5240, 5238],
		"34": [5238],
		"35": [5236],
		"36": [5236, 5234, 5214],
		"37": [5234, 5214],
		"40": [5242],
		"41": [5242, 5240],
		"42": [5240],
		"43": [5240, 5238],
		"44": [5236, 5234],
		"45": [5238, 5236],
		"46": [5236, 5234],
		"47": [5234],
		"50": [5242],
		"51": [5242, 5240],
		"52": [5240],
		"53": [5240, 5238],
		"54": [5238, 5236],
		"55": [5236],
		"56": [5236, 5234],
		"57": [5234]
	}

  /**
   * @param {HTMLElement} gridWrapper - The element that will contain the grid
   * @param {Renderer} renderer - The Renderer
   */
  constructor(gridWrapper, renderer) {
    this.gridWrapper = gridWrapper;
    this.renderer = renderer;
	this.syncManager = new SyncManager(this);
    this.grid = [];
    this.makeGrid();
  }

  async makeGrid() {
	// Get grid data from IndexedDB
	const gridData = await this.syncManager.loadGrid();
	console.log({gridData});
	
	if (!gridData || !gridData.length) {
		// Create grid
		this.syncManager.createGridRecord();

		for (let i = 0; i < 6; i++) {
			this.grid.push([]);
			for (let j = 0; j < 9; j++) {
				this.renderer.createGridSection(i, j, this);
			}
		}
	} else {
		// Load grid from IndexedDB
		for (let i = 0; i < 6; i++) {
			this.grid.push([]);
			for (let j = 0; j < 9; j++) {
				const gridSectionData = gridData.find((data) => data.x === i && data.y === j);
				this.renderer.createGridSection(i, j, this, gridSectionData?.comments);
			}
		}
	}
  }
}
