/**
 * Interface describing point's/tile's position on the map
 */
export interface Point {
	/**
	 * Position X of a point. Expressed in pixels or in tiles.
	 */
	xPos: number;
	/**
	 * Position Y of a point. Expressed in pixels or in tiles.
	 */
	yPos: number;
}

/**
 * Interface describing a rectangle.
 */
export interface RectangleBoundaries {
	/**
	 * Upper left-hand corner of a rectangle.
	 */
	startPoint: Point;
	/**
	 * Bottom right-hand corner of a rectangle
	 */
	endPoint: Point;
}

/**
 * Interface describing width and height of a rectangle.
 * Basically does the same thing as RectangleBoundaries but differently.
 * (honestly i don't remember why i did that please help me take me out of here please god)
 */
export interface Size {
	/**
	 * Width of a rectangle expressed either in pixels or tiles.
	 */
	width: number;
	/**
	 * Height of a rectangle expressed either in pixels or tiles.
	 */
	height: number;
}

/**
 * fuck knows what it does honestly
 */

/**
 * Interface describing information of image presented in a map's fragment.
 */
export interface ImageInformation {
	/**
	 * Image's boundaries in a sprite canvas.
	 */
	imageBoundaries: RectangleBoundaries;
	/**
	 * Unique index of an image.
	 */
	imageIndex: number;
}

/**
 * Interface describing one tile in a history step.
 */
export interface HistoryEntry {
	/**
	 * Unique index of an image on this tile.
	 */
	imageIndex: number;
	/**
	 * Tile's id in DOM.
	 */
	fragmentDomId: string;
}

/**
 * Interface describing one tile saved to clipboard.
 */
export interface ClipboardEntry {
	/**
	 * Unique index of an image on this tile.
	 */
	imageIndex: number;
	/**
	 * Shift in postion X from the first tile in the clipboard. Expressed in tiles.
	 */
	xShift: number;
	/**
	 * Shift in postion X from the first tile in the clipboard. Expressed in tiles.
	 */
	yShift: number;
}
