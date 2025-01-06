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
	this.syncManager = mapImage.grid.syncManager
  }

  async renderControls() {
	const settings = await this.syncManager.getSettings()

	const controls = document.createElement("div");
	controls.id = "map-controls";
	
	const viewToggleLabel = document.createElement("label");
	viewToggleLabel.htmlFor = "view-toggle";
	viewToggleLabel.textContent = "Labeled/Satellite";

	const viewToggle = document.createElement("input");
	viewToggle.type = "checkbox";
	viewToggle.id = "view-toggle";
	viewToggle.checked = settings.view === "satellite";

	viewToggle.addEventListener("change", () => {
		if (viewToggle.checked) {
			this.mapImage.satelliteImg.style.display = "block";
			this.mapImage.labeledImg.style.display = "none";
		} else {
			this.mapImage.satelliteImg.style.display = "none";
			this.mapImage.labeledImg.style.display = "block";
		}

		this.syncManager.updateSettings({ view: viewToggle.checked ? "satellite" : "labeled" });
	});

	const boundaryLabel = document.createElement("label");
	boundaryLabel.htmlFor = "boundary";
	boundaryLabel.textContent = "Property Lines";

	const boundaryInput = document.createElement("input");
	boundaryInput.type = "checkbox";
	boundaryInput.id = "boundary";
	boundaryInput.checked = settings.showBoundary;

	boundaryInput.addEventListener("change", () => {
		if (boundaryInput.checked) {
			this.mapImage.boundaryImg.style.display = "block";
		} else {
			this.mapImage.boundaryImg.style.display = "none";
		}

		this.syncManager.updateSettings({ showBoundary: boundaryInput.checked })
	});

	const orientationLabel = document.createElement("label");
	orientationLabel.htmlFor = "orientation";
	orientationLabel.textContent = "Align North/South";

	const orientationInput = document.createElement("input");
	orientationInput.type = "checkbox";
	orientationInput.id = "orientation";
	orientationInput.checked = settings.alignNorth;

	orientationInput.addEventListener("change", () => {
		if (orientationInput.checked) {
			this.mapImage.grid.renderer.main.classList.add("north");
		} else {
			this.mapImage.grid.renderer.main.classList.remove("north");
		}

		this.syncManager.updateSettings({ alignNorth: orientationInput.checked });
	})

	controls.appendChild(viewToggleLabel);
	controls.appendChild(viewToggle);
	controls.appendChild(boundaryLabel);
	controls.appendChild(boundaryInput);
	controls.appendChild(orientationLabel);
	controls.appendChild(orientationInput);

	this.mapImage.grid.gridWrapper.parentElement.appendChild(controls);
  }
}
