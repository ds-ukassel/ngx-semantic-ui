import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "demo-example",
    templateUrl: "./example.component.html",
    styleUrls: ["./example.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExampleComponent {
    public detail:boolean = false;

    @Input()
    public code!:string;
}
