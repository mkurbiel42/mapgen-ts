import Sprite from "./sprite";
import SelectGuide from "./selectGuide";
import {
	mapWrapper,
	isMouseDown,
	setMouseDown,
	contextMenu,
	setCtrlDown,
	isCtrlDown,
} from "./global";
import {
	deleteAction,
	copyAction,
	pasteAction,
	cutAction,
	saveAction,
	loadAction,
} from "./contextActions";
import { createHistoryStep, historyStepBack, historyStepForward } from "./history";

Sprite.initSprite();
SelectGuide.initSelectGuide();

mapWrapper.addEventListener("mousedown", (e) => {
	e.preventDefault();
	e.stopPropagation();
	if (e.button != 0) return;

	SelectGuide.setStartPoint(e.pageX - mapWrapper.offsetLeft, e.pageY - mapWrapper.offsetTop);
	setMouseDown(true);
});

mapWrapper.addEventListener("mousemove", (e) => {
	e.preventDefault();
	e.stopPropagation();
	if (!isMouseDown || e.button != 0) return;
	// selected.forEach((f: Fragment) => f.select());
	SelectGuide.changeSize(e.pageX - mapWrapper.offsetLeft, e.pageY - mapWrapper.offsetTop);
	SelectGuide.selectTiles();
});

mapWrapper.addEventListener("mouseup", (e) => {
	e.preventDefault();
	e.stopPropagation();
	if (e.button != 0) return;

	setMouseDown(false);
	SelectGuide.root.style.visibility = "hidden";
	if (!SelectGuide.hasChanged()) return;

	SelectGuide.endSelection();
	// setSelectionGuarded(true);
});

mapWrapper.addEventListener("contextmenu", (e) => {
	e.preventDefault();
	e.stopPropagation();
	contextMenu.classList.remove("hidden");
});

contextMenu.addEventListener("click", (e) => {
	e.preventDefault();
	e.stopPropagation();

	let option: string = (e.target as HTMLDivElement).id;
	contextMenu.classList.add("hidden");

	switch (option) {
		case "option-delete":
			deleteAction();
			break;

		case "option-copy":
			copyAction();
			break;

		case "option-cut":
			if (!isCtrlDown) return;
			cutAction();
			createHistoryStep();
			break;

		case "option-paste":
			pasteAction();
			break;

		case "option-redo":
			historyStepForward();
			break;

		case "option-undo":
			historyStepBack();
			break;

		case "option-load":
			loadAction();
			break;

		case "option-save":
			saveAction();
			break;

		default:
			break;
	}
});

window.addEventListener("keydown", (e) => {
	e.preventDefault();
	e.stopPropagation();

	switch (e.key.toLowerCase()) {
		case "delete":
			deleteAction();
			break;

		case "control":
			setCtrlDown(true);
			break;

		case "meta":
			setCtrlDown(true);
			break;

		case "c":
			if (!isCtrlDown) return;
			copyAction();
			break;

		case "x":
			if (!isCtrlDown) return;
			cutAction();
			createHistoryStep();
			break;

		case "v":
			if (!isCtrlDown) return;
			pasteAction();
			break;

		case "y":
			if (!isCtrlDown) return;
			historyStepForward();
			break;

		case "z":
			if (!isCtrlDown) return;
			historyStepBack();
			break;

		case "s":
			saveAction();
			break;

		case "l":
			loadAction();
			break;

		default:
			break;
	}
});

window.addEventListener("keyup", (e) => {
	if (e.key == "Control" || e.key == "Meta") {
		setCtrlDown(false);
	}
});
