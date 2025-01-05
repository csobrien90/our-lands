import { Grid } from "./Grid.js";
import { GridSection } from "./GridSection.js";
import { MapImage } from "./MapImage.js";
import { Comment } from "./Comment.js";

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

  createGridSection(x, y, grid, commentData) {
	const element = document.createElement("div");
	const gridSectionsIOwn = Object.keys(grid.gridToLot);
	const isOwned = !gridSectionsIOwn.includes(`${x}${y}`);
    element.classList.add("grid-section");
    grid.grid[x].push(new GridSection(x, y, element, isOwned, this, commentData));
    grid.gridWrapper.appendChild(element);
  }

  focusSection(section) {
    this.clearUI();

    const sectionView = document.createElement("section");
    sectionView.id = `section-${section.x}${section.y}`;
	sectionView.classList.add("section-view");

	const header = document.createElement("header");

    const title = document.createElement("h2");
    title.textContent = `Section ${section.x}${section.y}`;
	header.appendChild(title);

	const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", this.focusMap.bind(this));
    header.appendChild(backButton);

	sectionView.appendChild(header);

	const lot = this.grid.gridToLot[`${section.xAsNumber}${section.y}`];

	if (lot) {
		const lotList = document.createElement("ul");
		lot.forEach((lotNumber) => {
			const listItem = document.createElement("li");
			listItem.textContent = lotNumber;
			lotList.appendChild(listItem);
		})

		const lotTitle = document.createElement("h3");
		lotTitle.textContent = "Lots in this section";
		sectionView.appendChild(lotTitle);
		sectionView.appendChild(lotList);
	}

	// Add comments
	const comments = document.createElement("ul");
	comments.classList.add("comments");
	section.comments.forEach((comment) => {
		const commentData = comment.getData();
		if (!commentData) return;
		const commentItem = document.createElement("li");
		commentItem.appendChild(commentData);

		if (comment.coordinates) {
			const coordinates = document.createElement("a");
			coordinates.href = `https://www.google.com/maps/search/?api=1&query=${comment.coordinates.latitude},${comment.coordinates.longitude}`;
			coordinates.textContent = "View on map";
			coordinates.target = "_blank";
			commentItem.appendChild(coordinates);
		}

		// Delete button
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => {
			// Confirm deletion
			if (!confirm("Are you sure you want to delete this comment?")) return;

			section.removeComment(comment);
			this.focusSection(section);
		})
		commentItem.appendChild(deleteButton);

		comments.appendChild(commentItem);
	})

	// Include coordinates checkbox
	const coordinatesCheckbox = document.createElement("input");
	coordinatesCheckbox.type = "checkbox";

	const coordinatesLabel = document.createElement("label");
	coordinatesLabel.textContent = "Add coordinates to comment";
	coordinatesLabel.appendChild(coordinatesCheckbox);

	sectionView.appendChild(coordinatesLabel);

	// Add text comment form
	const commentForm = document.createElement("form");
	commentForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		const formData = new FormData(commentForm);
		const commentText = formData.get("comment");

		if (!commentText) return;

		let coordinates = null;
		if (coordinatesCheckbox.checked) coordinates = await this.getCurrentLocation()
		const newComment = new Comment(section, commentText, coordinates);
		section.addComment(newComment);
		this.focusSection(section);
	})

	const commentInput = document.createElement("input");
	commentInput.type = "text";
	commentInput.name = "comment";
	commentForm.appendChild(commentInput);

	const commentSubmit = document.createElement("button");
	commentSubmit.type = "submit";
	commentSubmit.textContent = "Add comment";
	commentForm.appendChild(commentSubmit);

	sectionView.appendChild(comments);
	sectionView.appendChild(commentForm);

	// Add image upload
	const imageInput = document.createElement("input");
	imageInput.type = "file";
	imageInput.name = "image";
	imageInput.accept = "image/*";

	imageInput.addEventListener("change", async (event) => {
		const file = event.target.files[0];

		if (!file || !file.type.startsWith("image/")) {
			imageInput.value = "";
			alert("Please select an image file.");
			return;
		}

		let coordinates = null;
		if (coordinatesCheckbox.checked) coordinates = await this.getCurrentLocation();

		const newComment = new Comment(section, file, coordinates);
		section.addComment(newComment);
		this.focusSection(section);
	})

	sectionView.appendChild(imageInput);
    this.main.appendChild(sectionView);
  }

  async getCurrentLocation() {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser.");
			resolve(null);
		}

		const success = async (position) => {
			// Note:
			// 	It is unclear whether this will be accurate enough for its purpose.
			// 	When app is deployed and working on mobile, accuracy should be tested.
			// console.log({position});
			// alert(`Accuracy: ${position.coords.accuracy}`);
 
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			resolve({ latitude, longitude });

		}

		const error = () => {
			alert("Unable to retrieve location.");
			resolve(null);
		}

		navigator.geolocation.getCurrentPosition(success, error);
	})
  }
  
}
