import Fragment from "./fragment";
import Item from "./item";

/** Wrapper for all item tiles. */
const itemsWrapper: HTMLElement = document.getElementById("items")!;
/** Wrapper for the map. */
const mapWrapper: HTMLElement = document.getElementById("map")!;
/** Wrapper for context menu. */
const contextMenu: HTMLElement = document.getElementById("context-menu-wrapper")!;
/** Wrapper for clipboard preview. */
const clipboardPreview: HTMLElement = document.getElementById("clipboard-preview")!;
/** Input for automat option. */
const automat: HTMLInputElement = document.getElementById("automat")! as HTMLInputElement;

/** Margins between fragments in the map. */
let margins: number = 4;
/** Width of the map expressed in tiles. */
let mapWidth: number = 38;
/** Height of the map express in tiles. */
let mapHeight: number = 44;
/** List of items. */
let items: Item[] = [];
/** List of map fragments. */
let fragments: Fragment[] = [];
/** List of currently selected map fragments. */
let selected: Fragment[] = [];
/** Checks if LMB is currently held down. */
let isMouseDown: boolean = false;
/** Checks if Control key is currently held down. */
let isCtrlDown: boolean = false;

/**
 * Sets list of selected map fragments.
 * @param newSelected new list of selected map fragments
 */
let setSelected = (newSelected: Fragment[]): void => {
	selected = newSelected;
};

/**
 * Sets the check for LBM.
 * @param value defines value for the check
 */
let setMouseDown = (value: boolean): void => {
	isMouseDown = value;
};

/**
 * Sets the check for Control key.
 * @param value defines value for the check
 */
let setCtrlDown = (value: boolean): void => {
	isCtrlDown = value;
};

/**
 * Unselects all fragments.
 */
let unselectAll = (): void => {
	selected.forEach((f: Fragment) => {
		f.unselect();
	});
	selected = [];
};

export {
	itemsWrapper,
	mapWrapper,
	automat,
	margins,
	items,
	fragments,
	selected,
	isMouseDown,
	setSelected,
	setMouseDown,
	unselectAll,
	contextMenu,
	setCtrlDown,
	isCtrlDown,
	mapWidth,
	mapHeight,
	clipboardPreview
};
