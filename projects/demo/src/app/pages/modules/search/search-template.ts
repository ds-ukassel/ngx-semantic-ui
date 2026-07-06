import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SuiModalModule, SuiModalService, SuiSearchModule} from 'lib';
import {AlertModal} from '../../../modals/alert.modal';
import {IOption, standardOptions} from './search.common';

export const exampleTemplateTemplate = `
<ng-template let-result let-query="query" #template>
    {{ result.title }} ({{ result.index }})
</ng-template>
<sui-search [options]="options"
            optionsField="title"
            [resultTemplate]="template"
            [retainSelectedResult]="false"
            (resultSelected)="alert($event.title)"></sui-search>
`;

@Component({
  selector: 'example-search-template',
  template: exampleTemplateTemplate,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SuiSearchModule, SuiModalModule],
})
export class SearchExampleTemplate {
  public options: IOption[];

  constructor(public modalService: SuiModalService) {
    this.options = standardOptions.map((o, i) => ({title: o, index: i}));
  }

  public alert(selectedItem: string): void {
    this.modalService.open(new AlertModal(`You chose '${selectedItem}'!`));
  }
}
