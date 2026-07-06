import {SuiMessageModule} from '@angular-ex/semantic-ui';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

import {ApiComponent, ApiDefinition} from '../../../components/api/api.component';
import {ExampleComponent} from '../../../components/example/example.component';
import {PageContentComponent} from '../../../components/page-content/page-content.component';
import {PageTitleComponent} from '../../../components/page-title/page-title.component';
import {exampleRemoteTemplate, SearchExampleRemote} from './search-remote';
import {exampleStandardTemplate, SearchExampleStandard} from './search-standard';
import {exampleTemplateTemplate, SearchExampleTemplate} from './search-template';

@Component({
  selector: "demo-page-search",
  templateUrl: "./search.page.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PageTitleComponent,
    PageContentComponent,
    ExampleComponent,
    // SearchExampleStandard,
    // SearchExampleRemote,
    // SearchExampleTemplate,
    SuiMessageModule,
    RouterLink,
    ApiComponent,
  ],
})
export class SearchPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-search>",
            properties: [
                {
                    name: "placeholder",
                    type: "string",
                    description: "Sets the placeholder string on the search box.",
                    defaultValue: "Search..."
                },
                {
                    name: "hasIcon",
                    type: "boolean",
                    description: "Sets whether or not the search displays an icon.",
                    defaultValue: "true"
                },
                {
                    name: "allowEmptyQuery",
                    type: "boolean",
                    description: "Sets whether the search element display result with empty query.",
                    defaultValue: "false"
                },
                {
                    name: "resetQueryOnChange",
                    type: "boolean",
                    description: "Sets whether the query is reset if options change.",
                    defaultValue: "true"
                },
                {
                    name: "options",
                    type: "T[]",
                    description: "Sets the options available to the search component. " +
                                 "Cannot be used in conjunction with <code>optionsLookup</code>."
                },
                {
                    name: "optionsFilter",
                    type: "(options:T[], query:string) => T[] | false",
                    description: "A function to filter the provided options with a custom function. " +
                                 "Return <code>false</code> to keep the current options. " +
                                 "Cannot be used in conjunction with <code>optionsLookup</code>."
                },
                {
                    name: "optionsLookup",
                    type: "(query:string) => Promise<T[]>",
                    description: "A function to asynchronously transform the provided query string into the array of results. " +
                                 "Must return a <code>Promise</code>. " +
                                 "This must be defined as an arrow function in your class."
                },
                {
                    name: "optionsField",
                    type: "string",
                    description: "Sets the property name that the search element uses to lookup and " +
                                 "display each option. Supports dot notation for nested properties."
                },
                {
                    name: "resultFormatter",
                    type: "(result:T, query:string) => string",
                    description: "A function to format a given result and query into a string to be displayed. " +
                                 "HTML markup is supported."
                },
                {
                    name: "resultTemplate",
                    type: "TemplateRef<IResultContext>",
                    description: "Sets the template to use when displaying a result."
                },
                {
                    name: "searchDelay",
                    type: "number",
                    description: "Sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                    defaultValue: "200"
                },
                {
                    name: "maxResults",
                    type: "number",
                    description: "Sets the maximum number of results the search displays at once.",
                    defaultValue: "7"
                },
                {
                    name: "retainSelectedResult",
                    type: "boolean",
                    description: "Sets whether the search should retain a result in the input box after it is selected.",
                    defaultValue: "true"
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition used when displaying the search results.",
                    defaultValue: "scale"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Sets the duration for the search results transition.",
                    defaultValue: "200"
                },
                {
                    name: "localeOverrides",
                    type: "Partial<ISearchLocaleValues>",
                    description: "Overrides the values from the localization service."
                }
            ],
            events: [
                {
                    name: "resultSelected",
                    type: "T",
                    description: "Fires whenever the search's selected result is changed. " +
                                 "The selected result is passed as <code>$event</code>."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleRemoteTemplate:string = exampleRemoteTemplate;
    public exampleTemplateTemplate:string = exampleTemplateTemplate;
}
