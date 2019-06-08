import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminonlyPage } from './adminonly.page';

describe('AdminonlyPage', () => {
  let component: AdminonlyPage;
  let fixture: ComponentFixture<AdminonlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminonlyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminonlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
