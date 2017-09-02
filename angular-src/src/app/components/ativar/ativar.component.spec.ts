/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AtivarComponent } from './ativar.component';

describe('AtivarComponent', () => {
  let component: AtivarComponent;
  let fixture: ComponentFixture<AtivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
