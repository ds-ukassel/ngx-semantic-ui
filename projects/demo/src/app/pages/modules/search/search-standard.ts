import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SuiCheckboxModule, SuiModalModule, SuiModalService, SuiSearchModule} from 'lib';
import {AlertModal} from '../../../modals/alert.modal';
import {standardOptions} from './search.common';

export const exampleStandardTemplate = `
<sui-search placeholder="Example Search..."
            [hasIcon]="hasIcon"
            [allowEmptyQuery]="allowEmptyQuery"
            [options]="options"
            [searchDelay]="0"
            (resultSelected)="alertSelected($event)"></sui-search>

<div class="ui segment">
    <sui-checkbox [(ngModel)]="hasIcon">Has icon?</sui-checkbox>
    <sui-checkbox [(ngModel)]="allowEmptyQuery">Allow empty query?</sui-checkbox>
</div>
`;

@Component({
  selector: "example-search-standard",
  template: exampleStandardTemplate,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SuiSearchModule, SuiCheckboxModule, FormsModule, SuiModalModule],
})
export class SearchExampleStandard {
  modalService = inject(SuiModalService);

  public hasIcon = true;
  public allowEmptyQuery = true;

  public get options():string[] {
    return standardOptions;
  }

  public alertSelected(selectedItem:string):void {
    this.modalService.open(new AlertModal(`You chose '${selectedItem}'!`));
  }
}
