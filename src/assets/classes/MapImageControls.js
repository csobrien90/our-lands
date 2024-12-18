import { MapImage } from "./MapImage.js";

/**
 * MapImageControls
 * @class
 * @classdesc The control panel to switch map views and toggle property line visibility.
 */
export class MapImageControls {
  /**
   * @param {MapImage} mapImage - The MapImage instance
   */
  constructor(mapImage) {
    this.mapImage = mapImage;
  }

  renderControls() {
	const controls = document.createElement("div");
	controls.id = "map-controls";
	
	const viewToggleLabel = document.createElement("label");
	viewToggleLabel.htmlFor = "view-toggle";
	viewToggleLabel.textContent = "Satellite/Labeled";

	const viewToggle = document.createElement("input");
	viewToggle.type = "checkbox";
	viewToggle.id = "view-toggle";

	viewToggle.addEventListener("change", () => {
		if (viewToggle.checked) {
			this.mapImage.satelliteImg.style.display = "block";
			this.mapImage.labeledImg.style.display = "none";
		} else {
			this.mapImage.satelliteImg.style.display = "none";
			this.mapImage.labeledImg.style.display = "block";
		}
	});

	const boundaryLabel = document.createElement("label");
	boundaryLabel.htmlFor = "boundary";
	boundaryLabel.textContent = "Property Lines";

	const boundaryInput = document.createElement("input");
	boundaryInput.type = "checkbox";
	boundaryInput.id = "boundary";
	boundaryInput.checked = true;

	boundaryInput.addEventListener("change", () => {
		if (boundaryInput.checked) {
			this.mapImage.boundaryImg.style.display = "block";
		} else {
			this.mapImage.boundaryImg.style.display = "none";
		}
	});

	controls.appendChild(viewToggleLabel);
	controls.appendChild(viewToggle);
	controls.appendChild(boundaryLabel);
	controls.appendChild(boundaryInput);

	this.mapImage.grid.gridWrapper.parentElement.appendChild(controls);
  }
}
