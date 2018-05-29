import { Component, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category, SearchResults, PriceTier, User } from '@apttus/ecommerce';
import { ForceService } from 'ng-salesforce';

import * as _ from 'lodash';

@Component({
    selector: 'pl-results',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-between pb-4 pt-4">
        {{'Showing' | translate}} {{lastResult}} {{'of' | translate}} {{totalRecords}} {{'items' | translate}}
        <!--<span class="d-none d-md-inline" *ngIf="query"> &nbsp;{{'for_your_search_of'  | translate}}&nbsp;<strong>{{query}}</strong></span>-->

        <div>
            <a class="filters-toggle"
                (click)="isCollapsed = !isCollapsed"
                [attr.aria-expanded]="!isCollapsed">
                <i class="material-icons filter_list"></i>Sort By
            </a>
        </div>


    </div>


        <div class="filters-pane from-top" id="filters" [ngbCollapse]="!isCollapsed">
            <section class="widget widget-icon-list float-right">
                <ul>
                    <li><a (click)="sortChange.emit($event.target.id); isCollapsed = !isCollapsed" id="CreatedDate"><i class="material-icons sort"></i>Relevance</a></li>
                    <li><a (click)="sortChange.emit($event.target.id); isCollapsed = !isCollapsed" id="Name"><i class="material-icons sort_by_alpha"></i>Name</a></li>
                    <li><a (click)="sortChange.emit($event.target.id); isCollapsed = !isCollapsed" id="Family"><i class="material-icons star_border"></i>Rating</a></li>
                </ul>
            </section>
        </div>

    `
})
export class ResultsComponent implements OnChanges {
  public isCollapsed = false;

  @Input() recordCount: number = 0;
  @Input() limit: number = 12;
  @Input() offset: number = 0;
  @Input() page: number = 1;
  @Input() view: 'grid' | 'list';
  @Input() query: string;

  @Output() viewChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortChange: EventEmitter<string> = new EventEmitter<string>();

  isloggedin: boolean;

  constructor(private forceService: ForceService) { }

  ngOnChanges() {
  }

  get totalRecords(): string {
    if (this.recordCount > 2000)
      return '2000+';
    else if (this.recordCount)
      return this.recordCount.toString();
  }

  get lastResult() {
    return ((this.limit * this.page) >= this.recordCount) ? this.recordCount : (this.limit * this.page);
  }
}
