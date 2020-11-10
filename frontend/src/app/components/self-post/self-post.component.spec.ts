import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPostComponent } from './self-post.component';

describe('SelfPostComponent', () => {
  let component: SelfPostComponent;
  let fixture: ComponentFixture<SelfPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
