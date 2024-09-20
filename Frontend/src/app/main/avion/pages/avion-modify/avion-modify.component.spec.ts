import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionModifyComponent } from './avion-modify.component';

describe('AvionModifyComponent', () => {
  let component: AvionModifyComponent;
  let fixture: ComponentFixture<AvionModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvionModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvionModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
