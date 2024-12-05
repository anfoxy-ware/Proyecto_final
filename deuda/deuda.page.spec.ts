import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeudaPage } from './deuda.page';

describe('DeudaPage', () => {
  let component: DeudaPage;
  let fixture: ComponentFixture<DeudaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
