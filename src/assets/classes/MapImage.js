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
    this.image = document.createElement("img");
    this.image.src = "/src/map.png";
    this.image.alt = "an overhead map of our property, an overlay of a satellite view, boundary lines, and labels";

    this.grid.gridWrapper.insertAdjacentElement("beforebegin", this.image);
  }
}
