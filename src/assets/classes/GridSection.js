import { Comment } from "./Comment.js";

/**
 * GridSection
 * @class
 * @classdesc Represents a single section of the grid. Holds hardcoded and editable data. Has a one-to-many relationship with the Comment class.
 *
 * @property {string} x - The x coordinate of the section translated to a letter
 * @property {number} y - The y coordinate of the section
 * @property {HTMLElement} element - The element that represents the section
 * @property {Comment[]} comments - An array of Comment instances
 */
export class GridSection {
	/**
	 * CommentData
	 * @typedef {Object} CommentData
	 * @property {number} epoch - The epoch time of the comment
	 * @property {string} data - The text comment or base64 image data
	 * @property {import("./Comment.js").coordinates} coordinates - The coordinates of the comment
	 */

	/**
	 * @param {number} x - The x coordinate of the section
	 * @param {number} y - The y coordinate of the section
	 * @param {HTMLElement} element - The element that represents the section
	 * @param {boolean} isDisabled - Whether the section is disabled
	 * @param {Renderer} renderer - The Renderer
	 * @param {CommentData} commentData - The data for the comments (from IndexedDB)
	 */
	constructor(x, y, element, isDisabled, renderer, commentData = null) {
		// Translate x coordinate to letter
		this.xAsNumber = x;
		const letter = String.fromCharCode(65 + x);
		this.x = letter;
		this.y = y;
		element.dataset.coords = `${this.x}${this.y}`;
		this.element = element;
		this.renderer = renderer;
		this.grid = renderer.grid;

		this.comments = [];
		if (commentData) {
			commentData.forEach((data) => {
				this.comments.push(new Comment(this, data.data, data.coordinates, data.epoch));
			});
		}

		if (isDisabled) {
			this.element.classList.add("disabled");
		} else {
			this.init();
		}
	}

	init() {
		this.element.addEventListener("click", this.handleClick.bind(this));
		this.element.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				this.handleClick();
			}
		});
	}

	handleClick() {
		this.renderer.focusSection(this);
	}

	/**
	 * Add a comment to the section
	 * @param {Comment} comment - The Comment instance
	 */
	addComment(comment) {
		this.comments.push(comment);
		this.grid.syncManager.saveComment(comment);
	}

	/**
	 * Remove a comment from the section
	 * @param {Comment} comment - The Comment instance
	 */
	removeComment(comment) {
		const index = this.comments.indexOf(comment);
		this.comments.splice(index, 1);
		this.grid.syncManager.deleteComment(comment);
	}
}
