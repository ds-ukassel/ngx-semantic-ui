import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SuiPagination } from "./components/pagination";

@NgModule({
    imports: [CommonModule, SuiPagination],
    exports: [SuiPagination],
    providers: []
})
export class SuiPaginationModule { }
