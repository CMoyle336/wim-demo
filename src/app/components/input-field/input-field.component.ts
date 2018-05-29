import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { forwardRef } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers : [{
    provide : NG_VALUE_ACCESSOR,
    useExisting : forwardRef(() => InputFieldComponent),
    multi : true
  }]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() field: any;
  @Input() label: boolean = true;
  onTouched = () => {};
  value: any;

  constructor() { }

  writeValue(value: any){
    if(!value && _.get(this.field, 'picklistValues[0]') && this.field.type == 'picklist')
      this.value = this.field.picklistValues[0].value;
    else{
      this.value = value;
    }
  }

  propagateChange = (_: any) => { };
  registerOnChange(fn: (_: any) => {}): void {  this.propagateChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean){}

  onMultiChange(data){
    if(this.value.indexOf(data) > -1)
      this.value.splice(this.value.indexOf(data), 1);
    else
      this.value.push(data);
    this.writeValue(this.value);
  }

  onRadioChange(){
    this.propagateChange(this.value);
  }

}
