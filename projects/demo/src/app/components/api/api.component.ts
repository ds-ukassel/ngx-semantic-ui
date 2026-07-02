import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { SuiPopupModule } from "@angular-ex/semantic-ui";

export interface IApiProperty {
    name:string;
    type:string;
    description:string;
    defaultValue?:string;
    required?:boolean;
}

export interface IApiEvent {
    name:string;
    type:string;
    description:string;
}

export interface IApi {
    selector:string;
    properties?:IApiProperty[];
    events?:IApiEvent[];
}

export type ApiDefinition = IApi[];

@Component({
    selector: "demo-api",
    templateUrl: "./api.component.html",
    styleUrls: ["./api.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SuiPopupModule]
})
export class ApiComponent {
    @Input()
    public api!:ApiDefinition;
}
