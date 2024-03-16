import { ImageInformation, Point, RectangleBoundaries } from "./interfaces";
import Sprite from "./sprite";

export default class Tile implements RectangleBoundaries, ImageInformation {
	/** DOM canvas element owned by this tile. */
	protected root: HTMLCanvasElement;
	/** Context of this tile's root. */
	protected context: CanvasRenderingContext2D;
	/** Unique index of an image present on this tile. */
	public imageIndex: number = -1;

	/** Boundaries of an image present on this tile. */
	public imageBoundaries: RectangleBoundaries;
	/** Starting point of this tile relative to (0,0) position of the map. Expressed in pixels */
	public startPoint: Point;
	/** Ending point of this tile relative to (0,0) position of the map. Expressed in pixels */
	public endPoint: Point;

	/** Width of single tile */
	public static width: number = 25;
	/** Height of single tile */
	public static height: number = 25;

	constructor(xPos: number, yPos: number, imageXPos: number, imageYPos: number) {
		this.startPoint = {
			xPos,
			yPos,
		};
		this.endPoint = {
			xPos: xPos + Tile.width,
			yPos: yPos + Tile.height,
		};
		this.imageBoundaries = {
			startPoint: {
				xPos: imageXPos,
				yPos: imageYPos,
			},
			endPoint: {
				xPos: imageXPos + Sprite.imageWidth,
				yPos: imageYPos + Sprite.imageHeight,
			},
		};
		this.root = document.createElement("canvas");
		this.root.width = Tile.width;
		this.root.height = Tile.height;
		this.root.classList.add("tile");
		this.context = this.root.getContext("2d")!;
	}
}
