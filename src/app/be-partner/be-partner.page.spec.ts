import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BePartnerPage } from './be-partner.page';

describe('BePartnerPage', () => {
  let component: BePartnerPage;
  let fixture: ComponentFixture<BePartnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BePartnerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BePartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
