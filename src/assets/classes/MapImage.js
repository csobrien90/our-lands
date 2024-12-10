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

  createImage() {
	const satelliteImg = document.createElement("img");
	satelliteImg.src = "/src/assets/images/satellite-map.png";
	satelliteImg.style.display = "none";

	const labeledImg = document.createElement("img");
	labeledImg.src = "/src/assets/images/labeled-map.png";
	labeledImg.style.display = "block";

	const boundaryImg = document.createElement("img");
	boundaryImg.src = "/src/assets/images/boundary-overlay.png";
	boundaryImg.style.display = "block";

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
