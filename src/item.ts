import Tile from "./tile";
import Sprite from "./sprite";
import { items, itemsWrapper, selected, automat, fragments } from "./global";
import { createHistoryStep } from "./history";
import Fragment from "./fragment";

/**
 * Item from images' menu on the left.
 */
export default class Item extends Tile {
	constructor(
		xPos: number,
		yPos: number,
		imageXPos: number,
		imageYPos: number,
		imageIndex: number
	) {
		super(xPos, yPos, imageXPos, imageYPos);
		this.root.classList.add("item");

		this.root.onclick = () => {
			this.setImageForSelected();
		};

		this.imageIndex = imageIndex;
	}

	/**
	 * Adds item's root to DOM.
	 */
	public addToDOM(): void {
		itemsWrapper?.appendChild(this.root);
		items.push(this);
	}

	/**
	 * Sets this item's image to be presented in currently selected fragments.
	 */
	public setImageForSelected(): void {
		if (selected.length == 0) return;

		let newIndex: number = selected[selected.length - 1].index + 1;
		selected.forEach((f: Fragment) => {
			f.setImage(
				Sprite.image,
				this.imageBoundaries.startPoint.xPos,
				this.imageBoundaries.startPoint.yPos,
				Sprite.imageWidth,
				Sprite.imageHeight,
				this.imageIndex
			);
			f.unselect();
		});
		if (automat.checked) {
			fragments.filter((f) => f.index == newIndex)[0].select();
		}

		createHistoryStep();
	}

	/**
	 * Sets this item's image to be presented in one selected fragment.
	 * @param f the selected fragment
	 */
	public setImageForFragment(f: Fragment):void {
		f.erase();
		f.setImage(
			Sprite.image,
			this.imageBoundaries.startPoint.xPos,
			this.imageBoundaries.startPoint.yPos,
			Sprite.imageWidth,
			Sprite.imageHeight,
			this.imageIndex
		);
	}

	/**
	 * Draws image (area of sprite) to be presented as a preview in this tile.
	 * @param image sprites DOM element
	 * @param imageWidth static width of sprite's area
	 * @param imageHeight static height of sprite's area
	 */

	public drawImage(image: HTMLImageElement, imageWidth: number, imageHeight: number): void {
		this.context?.drawImage(
			image,
			this.imageBoundaries.startPoint.xPos,
			this.imageBoundaries.startPoint.yPos,
			imageWidth,
			imageHeight,
			0,
			0,
			Tile.width,
			Tile.height
		);
	}
}
