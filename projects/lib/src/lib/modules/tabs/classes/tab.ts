import { SuiTabHeader } from "../directives/tab-header";
import { SuiTabContent } from "../directives/tab-content";

export class Tab {
    public id:string | number;
    public header:SuiTabHeader;
    public content:SuiTabContent;
    public index!:number;

    constructor(header:SuiTabHeader, content:SuiTabContent) {
        this.id = header.id();
        this.header = header;
        this.content = content;

        // So that the header and content isActive properties are always in sync.
        this.header.activate.subscribe(() => this.content.isActive.set(true));
        this.header.deactivate.subscribe(() => this.content.isActive.set(false));
    }

    // Saves accessing .header.isActive every time.
    public get isActive():boolean {
        return this.header.isActive();
    }

    public set isActive(active:boolean) {
        this.header.isActive.set(active);
    }

    // Saves accessing .header.isDisabled every time.
    public get isDisabled():boolean {
        return this.header.isDisabled();
    }
}
