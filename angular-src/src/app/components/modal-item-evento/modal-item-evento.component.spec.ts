import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemEventoComponent } from './modal-item-evento.component';

describe('ModalItemEventoComponent', () => {
  let component: ModalItemEventoComponent;
  let fixture: ComponentFixture<ModalItemEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalItemEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
