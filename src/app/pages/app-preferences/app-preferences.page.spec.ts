import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPreferencesPage } from './app-preferences.page';

describe('AppPreferencesPage', () => {
  let component: AppPreferencesPage;
  let fixture: ComponentFixture<AppPreferencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPreferencesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
