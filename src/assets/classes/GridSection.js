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
	 * @param {number} x - The x coordinate of the section
	 * @param {number} y - The y coordinate of the section
	 * @param {HTMLElement} element - The element that represents the section
	 * @param {boolean} isDisabled - Whether the section is disabled
	 * @param {Renderer} renderer - The Renderer
	 */
	constructor(x, y, element, isDisabled, renderer) {
		// Translate x coordinate to letter
		this.xAsNumber = x;
		const letter = String.fromCharCode(65 + x);
		this.x = letter;
		this.y = y;
		element.dataset.coords = `${this.x}${this.y}`;
		this.element = element;
		this.renderer = renderer;

		this.comments = [];

		if (isDisabled) {
			this.element.classList.add("disabled");
		} else {
			this.init();
		}
	}

	init() {
		this.element.addEventListener("click", this.handleClick.bind(this));
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
	}

	/**
	 * Remove a comment from the section
	 * @param {Comment} comment - The Comment instance
	 */
	removeComment(comment) {
		const index = this.comments.indexOf(comment);
		this.comments.splice(index, 1);
	}
}
