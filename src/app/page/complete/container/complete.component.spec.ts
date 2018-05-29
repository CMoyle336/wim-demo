import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteComponen } from './complete.component';

describe('CompleteComponent', () => {
  let component: CompleteComponen;
  let fixture: ComponentFixture<CompleteComponen>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteComponen ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteComponen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
