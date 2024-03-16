import Fragment from "./fragment";
import { fragments, items } from "./global";
import { HistoryEntry } from "./interfaces";
import Item from "./item";

/** List of all history steps. */
let history: HistoryEntry[][] = [];
/** Currently displayed step of history. */
let historyStep: number = -1;

/** Creates new history step. */
let createHistoryStep = (): void => {
	historyStep++;
	if (historyStep != history.length) {
		history = [
			...history.filter((_: HistoryEntry[], idx: number) => {
				if (idx > historyStep - 1) history[idx].length = 0;
				return idx <= historyStep - 1;
			}),
		];
	}
	history.push([
		...fragments.map((f: Fragment): HistoryEntry => {
			return { imageIndex: f.imageIndex, fragmentDomId: f.domId };
		}),
	]);
};

/** Rolls one history step back. */
let historyStepBack = (): void => {
	if (historyStep <= 0) return;
	--historyStep;
	drawHistoryStep();
};

/** Goes one history step forward. */
let historyStepForward = (): void => {
	if (historyStep >= history.length - 1) return;
	++historyStep;

	drawHistoryStep();
};

/** Draws currently displayed history step on the map. */
let drawHistoryStep = (): void => {
	history[historyStep].forEach((e: HistoryEntry) => {
		let f = fragments.find((f: Fragment) => f.domId == e.fragmentDomId)!;
		if (e.imageIndex == -1) {
			f.erase();
		} else {
			items.find((i: Item) => i.imageIndex == e.imageIndex)!.setImageForFragment(f);
		}
	});
};

export {
	history,
	historyStep,
	createHistoryStep,
	historyStepBack,
	historyStepForward,
	drawHistoryStep,
};
