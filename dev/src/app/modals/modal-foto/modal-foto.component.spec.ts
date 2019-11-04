import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFotoComponent } from './modal-foto.component';

describe('ModalFotoComponent', () => {
  let component: ModalFotoComponent;
  let fixture: ComponentFixture<ModalFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
