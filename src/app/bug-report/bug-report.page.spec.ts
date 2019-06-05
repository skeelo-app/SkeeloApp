import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportPage } from './bug-report.page';

describe('BugReportPage', () => {
  let component: BugReportPage;
  let fixture: ComponentFixture<BugReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
