import { fragments, items, selected, unselectAll } from "./global";
import Fragment from "./fragment";
import { createHistoryStep, history, historyStep } from "./history";
import Clipboard from "./clipboard";
import { ClipboardEntry, HistoryEntry } from "./interfaces";
import Item from "./item";

/**
 * Action of deleting images from selected fragments.
 */
export let deleteAction = () => {
	selected.forEach((f: Fragment) => {
		f.erase();
		f.unselect();
	});
	createHistoryStep();
};

/**
 * Action of copying tiles' information into the clipboard.
 * @param withUnselect defines if all fragments should be unselected when the action ends
 */
export let copyAction = (withUnselect: boolean = true) => {
	let first = fragments.find(
		(f: Fragment) => f.index == Math.min(...selected.map((f: Fragment) => f.index))
	)!;

	Clipboard.entries = selected.map(
		(f: Fragment): ClipboardEntry => ({
			imageIndex: f.imageIndex,
			xShift: f.tileXPos - first.tileXPos,
			yShift: f.tileYPos - first.tileYPos,
		})
	);
	if (withUnselect) {
		unselectAll();
	}
};

/**
 * Action of cutting tiles and copying its information into the clipboard.
 */
export let cutAction = () => {
	copyAction(false);
	selected.forEach((f: Fragment) => f.erase());
	unselectAll();
};

/**
 * Action of starting the process of pasting fragments from clipboard. Starts previewing of the clipboard.
 */
export let pasteAction = () => {
	unselectAll();
	Clipboard.isPasting = true;
	Clipboard.previewClipboard();
};

/**
 * Action of saving all of tiles information to the file.
 */
export let saveAction = () => {
	let data = history[historyStep];
	const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.innerText = "save";
	link.href = url;
	link.download = "map.json";
	link.click();
	URL.revokeObjectURL(url);
};

/**
 * Action of loading all of tiles information from the file.
 */
export let loadAction = () => {
	const inp = document.createElement("input");
	inp.type = "file";
	inp.accept = "*.json";
	inp.multiple = false;
	inp.click();

	inp.oninput = () => {
		let file = inp.files![0];

		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function () {
			let map: HistoryEntry[] = JSON.parse(reader.result as string);
			map.forEach((e: HistoryEntry) => {
				let fragment = fragments.find((f: Fragment) => e.fragmentDomId == f.domId)!;
				if (e.imageIndex == -1) {
					fragment.erase();
				} else {
					let item = items.find((i: Item) => i.imageIndex == e.imageIndex)!;
					item.setImageForFragment(fragment);
				}
			});
			createHistoryStep();
		};
	};
};
