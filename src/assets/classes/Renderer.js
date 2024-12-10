import { Grid } from "./Grid.js";
import { GridSection } from "./GridSection.js";
import { MapImage } from "./MapImage.js";

export class Renderer {
  constructor() {
    this.body = document.querySelector("body");
    this.body.innerHTML = "";
    this.main = document.createElement("main");
    this.main.id = "our-lands-app";
    this.body.appendChild(this.main);
    this.init();
  }

  init() {
    this.focusMap();
  }

  clearUI() {
    this.main.innerHTML = "";
  }

  focusMap() {
    this.clearUI();

    // If the grid doesn't exist, create it
    if (!this.grid) this.createGrid();
    else this.main.appendChild(this.grid.gridWrapper);

    // If the map image doesn't exist, create it
    if (!this.mapImage) this.createMapImage();
    else this.mapImage.renderImages();
  }

  createGrid() {
    const gridWrapper = document.createElement("div");
    gridWrapper.id = "grid-wrapper";
    this.main.appendChild(gridWrapper);
    this.grid = new Grid(gridWrapper, this);
  }

  createMapImage() {
    this.mapImage = new MapImage(this.grid);
  }

  createGridSection(x, y, grid) {
	const element = document.createElement("div");
	const gridSectionsIOwn = Object.keys(grid.gridToLot);
	const isOwned = !gridSectionsIOwn.includes(`${x}${y}`);
    element.classList.add("grid-section");
    grid.grid[x].push(new GridSection(x, y, element, isOwned, this));
    grid.gridWrapper.appendChild(element);
  }

  focusSection(section) {
    this.clearUI();

    const sectionView = document.createElement("section");
    sectionView.id = `section-${section.x}${section.y}`;

    const title = document.createElement("h2");
    title.textContent = `Section ${section.x}${section.y}`;

    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", this.focusMap.bind(this));

    sectionView.appendChild(title);
    sectionView.appendChild(backButton);
    this.main.appendChild(sectionView);
  }
}
