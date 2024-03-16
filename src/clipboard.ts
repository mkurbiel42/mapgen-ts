import Fragment from "./fragment";
import { clipboardPreview, fragments, items, mapHeight, mapWidth, margins } from "./global";
import { drawHistoryStep } from "./history";
import { ClipboardEntry } from "./interfaces";
import Item from "./item";
import Tile from "./tile";

/**
 * Class controlling clipboard.
 */
export default class Clipboard {
	/** Array of informations about fragments copied to clipboard. */
	public static entries: ClipboardEntry[] = [];
	/** Checks if use is currently pasting fragments from clipboard onto the map. */
	public static isPasting: boolean = false;

	/**
	 * Starts previewing content's opf a clipboard.
	 */
	public static previewClipboard(): void {
		let firstEntry: ClipboardEntry = this.entries[0];
		let lastEntry: ClipboardEntry = this.entries[this.entries.length - 1];

		Clipboard.entries.forEach((e: ClipboardEntry, idx: number) => {
			// if (
			// 	Fragment.hovered.tileXPos + e.xShift >= mapWidth ||
			// 	Fragment.hovered.tileYPos + e.yShift >= mapHeight
			// )
			// 	return;

			let previewFragment: Fragment = new Fragment(
				idx + 10000,
				e.xShift * Tile.width,
				e.yShift * Tile.height,
				-1,
				-1,
				e.xShift,
				e.yShift
			);

			if (e.imageIndex != -1) {
				let item = items.find((i: Item) => i.imageIndex == e.imageIndex)!;
				item.setImageForFragment(previewFragment);
			} else {
				previewFragment.fillBlack();
			}

			previewFragment.displayAsPreview(e.xShift, e.yShift);

			previewFragment.addToClipboardPreview();
			clipboardPreview.style.gridTemplateColumns = `repeat(${
				lastEntry.xShift - firstEntry.xShift + 1
			}, 1fr)`;
		});

		this.movePreview();
	}

	/**
	 * Ends preview and pasting process. Pastes fragments onto the map.
	 */
	public static drawFromClipboard(): void {
		drawHistoryStep();
		Clipboard.entries.forEach((e: ClipboardEntry) => {
			let fragmentId: number = Fragment.hovered.index + e.xShift + e.yShift * mapWidth;
			let fragment = fragments.find((f: Fragment) => f.index == fragmentId)!;
			if (
				!fragment ||
				Fragment.hovered.tileXPos + e.xShift >= mapWidth ||
				Fragment.hovered.tileYPos + e.yShift >= mapHeight
			) {
			} else {
				if (e.imageIndex == -1) {
					fragment.erase();
				} else {
					let item = items.find((i: Item) => i.imageIndex == e.imageIndex)!;
					item.setImageForFragment(fragment);
				}
				fragment.select(true);
			}
		});

		clipboardPreview.style.left = "-5px";
		clipboardPreview.style.top = "-5px";
	}

	/**
	 * Moves preview accordingly.
	 */
	public static movePreview(): void {
		clipboardPreview.style.left = Fragment.hovered.tileXPos * (Tile.width + margins) - 1 + "px";
		clipboardPreview.style.top = Fragment.hovered.tileYPos * (Tile.height + margins) - 1 + "px";
	}
}
