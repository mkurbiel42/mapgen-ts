import Tile from "./tile";
import {
	mapWrapper,
	fragments,
	setSelected,
	selected,
	isCtrlDown,
	unselectAll,
	clipboardPreview,
} from "./global";
import Clipboard from "./clipboard";
import { createHistoryStep } from "./history";

/**
 * Single fragment of the map.
 */
export default class Fragment extends Tile {
	/** Unique index of this tile. */
	public index: number;
	/** Unique DOM index of this tile. */
	public domId: string;
	/** Position X of this fragment relative to (0,0) position of the map. */
	public tileXPos: number;
	/** Position Y of this fragment relative to (0,0) position of the map. */
	public tileYPos: number;

	/** Fragment currently hovered by the cuyrsor. */
	public static hovered: Fragment;

	constructor(
		index: number,
		xPos: number,
		yPos: number,
		imageXPos: number,
		imageYPos: number,
		tileXPos: number,
		tileYPos: number
	) {
		super(xPos, yPos, imageXPos, imageYPos);
		this.index = index;
		this.domId = "fragment-" + this.index;
		this.root.setAttribute("id", this.domId);
		this.root.classList.add("fragment");

		this.tileXPos = tileXPos;
		this.tileYPos = tileYPos;

		this.root.onclick = () => {
			if (Clipboard.isPasting) {
				Clipboard.drawFromClipboard();
				clipboardPreview.replaceChildren();
				Clipboard.isPasting = false;
				createHistoryStep();
				unselectAll();
			} else {
				if (selected.includes(this) && isCtrlDown) {
					this.unselect();
				} else {
					this.select(isCtrlDown);
				}
			}
		};

		this.root.onmouseover = () => {
			if (Fragment.hovered == this) return;
			Fragment.hovered = this;

			if (!Clipboard.isPasting) return;
			unselectAll();
			Clipboard.movePreview();
		};
	}

	/**
	 * Adds fragment's root to DOM.
	 */
	public addToDOM(): void {
		mapWrapper?.appendChild(this.root);
		fragments.push(this);
	}

	/**
	 * adds fragment's root to preview of a clipboard
	 */
	public addToClipboardPreview(): void {
		clipboardPreview.appendChild(this.root);
	}
	/**
	 * Selectes this fragment
	 * @param addToSelection defines either the action should override current selection or add to it
	 */
	public select(addToSelection: boolean = false):void {
		if (!addToSelection) {
			selected.forEach((f: Fragment) => f.unselect());
		}
		if (selected.includes(this)) return;
		setSelected([...selected, this]);
		this.root.classList.add("selected");
	}

	/**
	 * Removes this fragment from selection
	 */
	public unselect():void {
		setSelected([...selected.filter((t) => t != this)]);
		this.root.classList.remove("selected");
	}

	/**
	 * Sets image (sprite's area) to be presented by this tile
	 * @param image sprites DOM element
	 * @param imageX area's starting point position X
	 * @param imageY area's starting point position Y
	 * @param imageWidth area's width
	 * @param imageHeight area's height
	 * @param imageIndex unique id of an image
	 */
	public setImage(
		image: HTMLImageElement,
		imageX: number,
		imageY: number,
		imageWidth: number,
		imageHeight: number,
		imageIndex: number
	):void {
		this.context?.clearRect(0, 0, Tile.width, Tile.height);
		this.context?.drawImage(
			image,
			imageX,
			imageY,
			imageWidth,
			imageHeight,
			0,
			0,
			Tile.width,
			Tile.height
		);
		this.context.fillStyle = "black";
		this.imageIndex = imageIndex;
	}

	/**
	 * Erases image presented in this tile.
	 */
	public erase():void {
		this.context?.clearRect(0, 0, Tile.width, Tile.height);
		this.imageIndex = -1;
	}

	/**
	 * Defines tile as a part of clipboard's preview.
	 * @param tileXPos position X of this tile relative to preview's (0,0) tile
	 * @param tileYPos position Y of this tile relative to preview's (0,0) tile
	 */
	public displayAsPreview(tileXPos: number, tileYPos: number):void {
		this.root.style.left = tileXPos * 29 + "px";
		this.root.style.top = tileYPos * 29 + "px";
		this.root.classList.add("preview");
	}

	public fillBlack(): void {
		this.context.fillRect(0, 0, Tile.width, Tile.height);
	}
}
