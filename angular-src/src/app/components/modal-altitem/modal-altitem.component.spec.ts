import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAltitemComponent } from './modal-altitem.component';

describe('ModalAltitemComponent', () => {
  let component: ModalAltitemComponent;
  let fixture: ComponentFixture<ModalAltitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAltitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAltitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
