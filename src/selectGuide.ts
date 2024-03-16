import { Point, Size } from "./interfaces";
import Fragment from "./fragment";
import { fragments, isCtrlDown, unselectAll } from "./global";

/**
 * Class controlling area selection guide.
 */
export default class SelectGuide {
	/** Guide's main DOM element. */
	public static root: HTMLElement = document.getElementById("select-guide")!;
	/** Guide's upper left-hand corner. */
	private static startPoint: Point;
	/** Guide's bottom right-hand corner. */
	private static endPoint: Point;
	/** Guide's size expressed in pixels.
	 * (honestly tough why the fuck did i even do that, makes no fucking sense at all)
	 * (this code is so shitty i swear to god)
	 */
	private static size: Size;

	/** Initializes and resets guide. */
	public static initSelectGuide() {
		this.startPoint = {
			xPos: -1,
			yPos: -1,
		};
		this.endPoint = {
			xPos: -1,
			yPos: -1,
		};
		this.size = {
			width: -1,
			height: -1,
		};

		this.root.style.width = `0px`;
		this.root.style.height = `0px`;
	}

	/** Sets guide's upper left-hand corner's position */
	public static setStartPoint(xPos: number, yPos: number) {
		SelectGuide.startPoint.xPos = xPos;
		SelectGuide.startPoint.yPos = yPos;
	}

	/** Sets guide's bottom right-hand corner's position */
	public static changeSize(endXPos: number, endYPos: number) {
		this.root.style.visibility = "visible";
		SelectGuide.endPoint.xPos = endXPos;
		SelectGuide.endPoint.yPos = endYPos;

		SelectGuide.size.width = Math.abs(endXPos - SelectGuide.startPoint.xPos);
		SelectGuide.size.height = Math.abs(endYPos - SelectGuide.startPoint.yPos);

		this.root.style.width = `${SelectGuide.size.width}px`;
		this.root.style.height = `${SelectGuide.size.height}px`;

		this.root.style.left =
			SelectGuide.startPoint.xPos < SelectGuide.endPoint.xPos
				? `${SelectGuide.startPoint.xPos}px`
				: `${SelectGuide.endPoint.xPos}px`;
		this.root.style.top =
			SelectGuide.startPoint.yPos < SelectGuide.endPoint.yPos
				? `${SelectGuide.startPoint.yPos}px`
				: `${SelectGuide.endPoint.yPos}px`;
	}

	/** Selects fragments hovered by the guide. */
	public static selectTiles(): void {
		let sL: number = Math.min(this.startPoint.xPos, this.endPoint.xPos);
		let sR: number = Math.max(this.startPoint.xPos, this.endPoint.xPos);
		let sT: number = Math.min(this.startPoint.yPos, this.endPoint.yPos);
		let sB: number = Math.max(this.startPoint.yPos, this.endPoint.yPos);

		let fragsToSelect: Fragment[] = fragments.filter((f: Fragment) => {
			let fL: number = Math.min(f.startPoint.xPos, f.endPoint.xPos);
			let fR: number = Math.max(f.startPoint.xPos, f.endPoint.xPos);
			let fT: number = Math.min(f.startPoint.yPos, f.endPoint.yPos);
			let fB: number = Math.max(f.startPoint.yPos, f.endPoint.yPos);

			return sL < fR && sR > fL && sT < fB && sB > fT;
		});

		if (!isCtrlDown) {
			unselectAll();
		}
		fragsToSelect.forEach((f: Fragment) => f.select(true));
	}

	/** Ends selection using the guide. */
	public static endSelection(): void {
		SelectGuide.initSelectGuide();
	}

	/**
	 * Checks if user selected area with a cursor
	 * @returns wether user selected an area or not
	 */
	public static hasChanged() {
		return this.size.width != -1;
	}
}
