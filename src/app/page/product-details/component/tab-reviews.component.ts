import { Component, OnChanges, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductReview } from '../../../models/product-rating.model';

@Component({
  selector: 'pdp-tab-reviews',
  template: `
    <ul class="list-group">
      <li class="media list-group-item d-flex" *ngFor="let review of reviewList">
        <div class="mr-3">
          <strong class="d-block">{{review.APTSMD_Reviewed_By__c}}</strong>
          <small>{{review.APTSMD_Reviewed_On__c | date:'short'}}</small>
        </div>
        <div class="media-body">
          <h5 class="mt-0 mb-1 d-flex justify-content-start">
            <star-rating [starType]="'icon'" [rating]="review.APTSMD_Rating__c"></star-rating>
          </h5>
          {{review.APTSMD_Review__c}}
        </div>
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabReviewsComponent implements OnChanges {
  @Input() reviewList: Array<ProductReview>;

  constructor() { }

  ngOnChanges() {}

}
