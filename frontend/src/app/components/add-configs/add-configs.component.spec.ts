import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfigsComponent } from './add-configs.component';

describe('AddConfigsComponent', () => {
  let component: AddConfigsComponent;
  let fixture: ComponentFixture<AddConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
