import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreseleccionPage } from './preseleccion.page';

describe('PreseleccionPage', () => {
  let component: PreseleccionPage;
  let fixture: ComponentFixture<PreseleccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreseleccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
