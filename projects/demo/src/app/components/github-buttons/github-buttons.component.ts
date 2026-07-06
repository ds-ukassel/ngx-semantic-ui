import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'demo-github-buttons',
  templateUrl: './github-buttons.component.html',
  styleUrl: './github-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GithubButtonsComponent {
  @Input()
  public mega = true;
}
