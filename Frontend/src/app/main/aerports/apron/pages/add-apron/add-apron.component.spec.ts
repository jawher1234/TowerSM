import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApronComponent } from './add-apron.component';

describe('AddApronComponent', () => {
  let component: AddApronComponent;
  let fixture: ComponentFixture<AddApronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
