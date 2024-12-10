import { GridSection } from "./GridSection.js";

/**
 * Comment
 * @class
 * @classdesc Represents a historical datapoint for a GridSection. Comments have a many-to-one relationship with GridSections.
 */
export class Comment {
  /**
   * @param {GridSection} gridSection - The GridSection instance
   */
  constructor(gridSection) {
    this.gridSection = gridSection;
    console.log("Comment created");
  }
}
