import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapse } from "./directives/collapse";

@NgModule({
    imports: [
        CommonModule,
        SuiCollapse
    ],
    exports: [
        SuiCollapse
    ]
})
export class SuiCollapseModule {}
