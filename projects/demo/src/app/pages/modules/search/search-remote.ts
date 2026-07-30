import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LookupFn, SuiSearchModule} from 'lib';
import {SearchExampleStandard} from './search-standard';
import {IOption, standardOptions} from './search.common';

export const exampleRemoteTemplate = `
<sui-search [optionsLookup]="optionsSearch"
            optionsField="title"
            (resultSelected)="last = $event"></sui-search>

<div class="ui segment">
    <p>Last selected: {{ last | json }}</p>
</div>
`;

@Component({
  selector: 'example-search-remote',
  template: exampleRemoteTemplate,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SuiSearchModule, JsonPipe],
})
export class SearchExampleRemote extends SearchExampleStandard {
  public last!: IOption | IOption[];

  public optionsSearch:LookupFn<IOption> = async (query = ''): Promise<IOption[]> => {
    const options = standardOptions.map((o: string) => ({title: o}));

    return new Promise<IOption[]>(resolve => {
      const results = options
        .filter(o => o.title.slice(0, query.length).toLowerCase() === query.toLowerCase());
      setTimeout(() => resolve(results), 300);
    });
  };
}
