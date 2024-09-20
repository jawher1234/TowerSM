import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAerportComponent } from './add-aerport.component';

describe('AddAerportComponent', () => {
  let component: AddAerportComponent;
  let fixture: ComponentFixture<AddAerportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAerportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAerportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
