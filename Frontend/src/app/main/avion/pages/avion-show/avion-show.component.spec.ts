import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionShowComponent } from './avion-show.component';

describe('AvionShowComponent', () => {
  let component: AvionShowComponent;
  let fixture: ComponentFixture<AvionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvionShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
