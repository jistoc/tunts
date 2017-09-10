import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLrmComponent } from './modal-lrm.component';

describe('ModalLrmComponent', () => {
  let component: ModalLrmComponent;
  let fixture: ComponentFixture<ModalLrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
