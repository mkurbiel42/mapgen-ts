import Tile from "./tile";
import Item from "./item";
import Fragment from "./fragment";
import { margins, mapWidth, mapHeight } from "./global";
import { createHistoryStep } from "./history";

/** Class responsible for the main sprite. */
export default class Sprite {
	/** Sprite's image source. */
	private static imageSource: string = "./sprite.png";
	/** Sprite's main DOM element. */
	public static image: HTMLImageElement = new Image();
	/** Static width of sprite's fragment. */
	public static imageWidth = 47;
	/** Static height of sprite's fragment. */
	public static imageHeight = 47;

	/** Initializes sprite. */
	public static initSprite(): void {
		Sprite.image.src = Sprite.imageSource;

		let i = 0;
		Sprite.image.onload = () => {
			for (let y = 0; y < 20; y++) {
				for (let x = 0; x < 16; x++) {
					let newItem: Item = new Item(
						x * (Tile.width + margins),
						y * (Tile.height + margins),
						1 + x * (Sprite.imageWidth + 1),
						1 + y * (Sprite.imageHeight + 1),
						++i
					);
					newItem.drawImage(Sprite.image, Sprite.imageWidth, Sprite.imageHeight);
					newItem.addToDOM();
				}
			}

			for (let y = 0; y < 20; y++) {
				for (let x = 16; x < 32; x++) {
					let newItem: Item = new Item(
						x * (Tile.width + margins),
						y * (Tile.height + margins),
						1 + x * (Sprite.imageWidth + 1),
						1 + y * (Sprite.imageHeight + 1),
						++i
					);
					newItem.drawImage(Sprite.image, Sprite.imageWidth, Sprite.imageHeight);
					newItem.addToDOM();
				}
			}

			i = 0;
			for (let y = 0; y < mapHeight; y++) {
				for (let x = 0; x < mapWidth; x++) {
					let newFrag: Fragment = new Fragment(
						++i,
						x * (Tile.width + margins),
						y * (Tile.height + margins),
						1 + x * (Sprite.imageWidth + 1),
						1 + y * (Sprite.imageHeight + 1),
						x,
						y
					);
					newFrag.addToDOM();
				}
			}
			createHistoryStep();
		};
	}
}
