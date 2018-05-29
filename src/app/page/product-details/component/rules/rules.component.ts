import { Component, OnChanges, ChangeDetectionStrategy, Input } from '@angular/core';
import { ConstraintRule, Product } from '@apttus/ecommerce';

@Component({
	selector: 'pdp-rules',
	templateUrl: './rules.component.html',
	styleUrls: ['./rules.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulesComponent implements OnChanges {
	@Input() productList: Array<Product>;
	@Input() title: string;
	@Input() type: 'Inclusion' | 'Recommendation';

	constructor() { }

	ngOnChanges() { }
}
