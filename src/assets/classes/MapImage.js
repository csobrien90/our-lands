import { Grid } from "./Grid.js";
import { MapImageControls } from "./MapImageControls.js";

/**
 * MapImage
 * @class
 * @classdesc Represents the overlay of satellite and labeled views behind the Grid. Manages a single instance of MapImageControls.
 */
export class MapImage {
  /**
   * @param {Grid} grid - The grid element
   */
  constructor(grid) {
    this.grid = grid;
    this.controls = new MapImageControls(this);
    this.createImage();
  }

  async createImage() {
	const satelliteImg = document.createElement("img");
	satelliteImg.src = "/src/assets/images/satellite-map.png";
	
	const labeledImg = document.createElement("img");
	labeledImg.src = "/src/assets/images/labeled-map.png";
	
	const boundaryImg = document.createElement("img");
	boundaryImg.src = "/src/assets/images/boundary-overlay.png";

	// Get saved user settings and apply them
	const settings = await this.grid.syncManager.getSettings();
	satelliteImg.style.display = settings.view === "labeled" ? "none" : "block";
	labeledImg.style.display = settings.view === "labeled" ? "block" : "none";
	boundaryImg.style.display = settings.showBoundary ? "block" : "none";
	if (settings.alignNorth) this.grid.renderer.main.classList.add("north");

	this.satelliteImg = satelliteImg;
	this.labeledImg = labeledImg;
	this.boundaryImg = boundaryImg;

	this.renderImages();
  }

  renderImages() {
	const main = this.grid.gridWrapper.parentElement;
	main.appendChild(this.satelliteImg);
	main.appendChild(this.labeledImg);
	main.appendChild(this.boundaryImg);

	this.controls.renderControls();
  }
}
