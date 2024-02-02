import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguajeMenuComponent } from './languaje-menu.component';

describe('LanguajeMenuComponent', () => {
  let component: LanguajeMenuComponent;
  let fixture: ComponentFixture<LanguajeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguajeMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguajeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
