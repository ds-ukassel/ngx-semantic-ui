import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransition } from "./directives/transition";

@NgModule({
    imports: [CommonModule, SuiTransition],
    exports: [
        SuiTransition
    ],
    providers: []
})
export class SuiTransitionModule {}
