import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationCComponent } from './simulation-c.component';

describe('SimulationCComponent', () => {
  let component: SimulationCComponent;
  let fixture: ComponentFixture<SimulationCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
