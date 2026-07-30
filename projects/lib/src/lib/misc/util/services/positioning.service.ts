import { ElementRef } from "@angular/core";
import {
    arrow,
    autoPlacement,
    autoUpdate,
    computePosition,
    flip,
    limitShift,
    offset,
    Placement,
    shift
} from "@floating-ui/dom";

export type PositioningPlacement = "auto" |
                                   "top left" | "top" | "top right" |
                                   "bottom left" | "bottom" | "bottom right" |
                                   "left top" | "left" | "left bottom" |
                                   "right top" | "right" | "right bottom";

export const PositioningPlacement = {
    Auto: "auto" as PositioningPlacement,
    TopLeft: "top left" as PositioningPlacement,
    Top: "top" as PositioningPlacement,
    TopRight: "top right" as PositioningPlacement,
    LeftTop: "left top" as PositioningPlacement,
    Left: "left" as PositioningPlacement,
    LeftBottom: "left bottom" as PositioningPlacement,
    BottomLeft: "bottom left" as PositioningPlacement,
    Bottom: "bottom" as PositioningPlacement,
    BottomRight: "bottom right" as PositioningPlacement,
    RightTop: "right top" as PositioningPlacement,
    Right: "right" as PositioningPlacement,
    RightBottom: "right bottom" as PositioningPlacement
};

export interface IPositionBoundingBox {
    width:number;
    height:number;
    top:number;
    left:number;
    bottom:number;
    right:number;
}

// Returns `undefined` instead of old `auto`
function placementToFloating(placement:PositioningPlacement):Placement | undefined {
    if (!placement || placement === PositioningPlacement.Auto) {
        return undefined;
    }

    // All placements of the format: `direction alignment`, e.g. `top left`.
    const [direction, alignment] = placement.split(" ");

    // Direction alone covers case of just `top`, `left`, `bottom`, `right`.
    const chosenPlacement = [direction];

    // Add `start` / `end` to placement, depending on alignment direction.
    switch (alignment) {
        case "top":
        case "left":
            chosenPlacement.push("start");
            break;
        case "bottom":
        case "right":
            chosenPlacement.push("end");
            break;
    }

    // Join with hyphen to create Floating UI compatible placement.
    return chosenPlacement.join("-") as Placement;
}

function floatingToPlacement(floating:string):PositioningPlacement {
    if (!floating) {
        return "auto";
    }

    const [direction, alignment] = floating.split("-");

    const chosenPlacement = [direction];

    switch (direction) {
        case "top":
        case "bottom":
            switch (alignment) {
                case "start":
                    chosenPlacement.push("left");
                    break;
                case "end":
                    chosenPlacement.push("right");
                    break;
            }
            break;
        case "left":
        case "right":
            switch (alignment) {
                case "start":
                    chosenPlacement.push("top");
                    break;
                case "end":
                    chosenPlacement.push("bottom");
                    break;
            }
            break;
    }

    return chosenPlacement.join(" ") as PositioningPlacement;
}

export class PositioningService {
    public readonly anchor:ElementRef;
    public readonly subject:ElementRef;

    private _placement:PositioningPlacement;
    private _actualPlacement:PositioningPlacement;
    private _hasArrow:boolean;
    private _arrowSelector:string | undefined;
    // Stops the scroll / resize listeners set up by `autoUpdate`.
    private _stopAutoUpdate?:() => void;

    public get placement():PositioningPlacement {
        return this._placement;
    }

    public set placement(placement:PositioningPlacement) {
        this._placement = placement;
        this.update();
    }

    public set hasArrow(hasArrow:boolean) {
        this._hasArrow = hasArrow;
        this.update();
    }

    public get actualPlacement():PositioningPlacement {
        return this._actualPlacement;
    }

    constructor(anchor:ElementRef, subject:ElementRef, placement:PositioningPlacement, arrowSelector?:string) {
        this.anchor = anchor;
        this.subject = subject;
        this._placement = placement;
        this._actualPlacement = PositioningPlacement.Auto;
        this._hasArrow = false;
        this._arrowSelector = arrowSelector;
        this.init();
    }

    public init():void {
        // Unlike Popper (old framework), Floating UI computes a position once per call,
        // so it has to be recomputed whenever the anchor moves or resizes.
        this._stopAutoUpdate = autoUpdate(
          this.anchor.nativeElement,
          this.subject.nativeElement,
          () => this.update()
        );
    }

    public update():void {
        if (!this._stopAutoUpdate) {
            return;
        }

        const subject = this.subject.nativeElement as HTMLElement;
        const arrowElement = this._arrowSelector
            ? subject.querySelector<HTMLElement>(this._arrowSelector)
            : undefined;
        const placement = placementToFloating(this._placement);

        const middleware = [
            // Evaluated on every update, so that a later `hasArrow` still takes effect.
            offset(() => {
                const fontSize = parseFloat(window.getComputedStyle(this.subject.nativeElement).getPropertyValue("font-size"));
                return {
                    // Gap between anchor and popup. Popper used the popup's CSS margin
                    // Floating UI ignores element margins, reproduce the 0.75em gap
                    mainAxis: 0.75 * fontSize,
                    crossAxis: this._hasArrow ? this.calculateOffset(fontSize) : 0
                };
            }),
            placement ? flip({ boundary: document.body }) : autoPlacement({ boundary: document.body }),
            // `limitShift` keeps the subject attached to its anchor, (replaces Popper's `escapeWithReference`).
            shift({ boundary: document.body, limiter: limitShift() })
        ];

        if (arrowElement) {
            middleware.push(arrow({ element: arrowElement }));
        }

        computePosition(this.anchor.nativeElement, subject, {
            placement,
            strategy: "absolute",
            middleware
        }).then(({ x, y, placement: actual, middlewareData }) => {
            // Floating UI computed DOM values
            Object.assign(subject.style, {
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`
            });

            this._actualPlacement = floatingToPlacement(actual);

            if (arrowElement && middlewareData.arrow) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                // Set alignment axis, stylesheet sets the other
                arrowElement.style.left = arrowX != null ? `${arrowX}px` : "";
                arrowElement.style.top = arrowY != null ? `${arrowY}px` : "";
            }
        });
    }

    public destroy():void {
        this._stopAutoUpdate?.();
        this._stopAutoUpdate = undefined;
    }

    // Shifts the subject along its alignment axis when the anchor is too small to reach the arrow.
    // `fontSize` (in px) passed in, only read once per positioning update.
    private calculateOffset(fontSize:number):number {
        // The Semantic UI popup arrow width and height are 0.71428571em and the margin from the popup edge is 1em
        const arrowCenter = (0.71428571 / 2 + 1) * fontSize;
        const anchor = this.anchor.nativeElement as HTMLElement;

        switch (this._placement) {
            case PositioningPlacement.TopLeft:
            case PositioningPlacement.BottomLeft:
                return anchor.offsetWidth <= arrowCenter * 2 ? anchor.offsetWidth / 2 - arrowCenter : 0;
            case PositioningPlacement.TopRight:
            case PositioningPlacement.BottomRight:
                return anchor.offsetWidth <= arrowCenter * 2 ? arrowCenter - anchor.offsetWidth / 2 : 0;
            case PositioningPlacement.LeftTop:
            case PositioningPlacement.RightTop:
                return anchor.offsetHeight <= arrowCenter * 2 ? anchor.offsetHeight / 2 - arrowCenter : 0;
            case PositioningPlacement.LeftBottom:
            case PositioningPlacement.RightBottom:
                return anchor.offsetHeight <= arrowCenter * 2 ? arrowCenter - anchor.offsetHeight / 2 : 0;
            default:
                return 0;
        }
    }
}
