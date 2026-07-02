import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiProgress } from "./components/progress";

@NgModule({
    imports: [
        CommonModule,
        SuiProgress
    ],
    exports: [
        SuiProgress
    ]
})
export class SuiProgressModule {}
