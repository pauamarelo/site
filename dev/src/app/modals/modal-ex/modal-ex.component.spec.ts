import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExComponent } from './modal-ex.component';

describe('ModalExComponent', () => {
  let component: ModalExComponent;
  let fixture: ComponentFixture<ModalExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
