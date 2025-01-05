import { GridSection } from "./GridSection.js";

/**
 * @typedef {Object} coordinates
 * @property {number} lat - The latitude
 * @property {number} long - The longitude
 */


/**
 * Comment
 * @class
 * @classdesc Represents a historical datapoint for a GridSection. Comments have a many-to-one relationship with GridSections.
 */
export class Comment {
  /**
   * @param {GridSection} gridSection - The GridSection instance
   * @param {string | File} data - The data for the comment
   * @param {coordinates} coordinates (Optional) - The lat/long of the location this comment is associated with
   * @param {number} epoch (Optional) - The epoch time of the comment
   */
  constructor(gridSection, data, coordinates = null, epoch = null) {
    this.gridSection = gridSection;
    this.data = data;
	this.coordinates = coordinates;
	this.timestamp = epoch ? new Date(epoch) : new Date();
  }

  /**
   * Get the comment data for rendering
   * @returns {HTMLElement | null} An element representing the comment data
   */
  getData() {
	const element = document.createElement("div");
	element.classList.add("comment");

	if (this.data instanceof File) {
		const imageComment = document.createElement("img");
		const reader = new FileReader();
		reader.onload = function(e) {
			imageComment.src = e.target.result;
		}
		reader.readAsDataURL(this.data);
		element.appendChild(imageComment);
	} else {
		const textComment = document.createElement("p");
		textComment.textContent = this.data;
		element.appendChild(textComment);		
	}

	// Add timestamp
	const timestamp = document.createElement("time");
	timestamp.textContent = this.getTimestamp();
	element.appendChild(timestamp);

	return element;
  }

  /**
   * Get the comment timestamp as a readable, formatted string
   * @returns {string} The formatted time
   */
  getTimestamp() {
	return this.timestamp.toLocaleString();
  }
}
