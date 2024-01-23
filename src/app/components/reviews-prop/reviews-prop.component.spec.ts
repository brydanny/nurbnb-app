import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPropComponent } from './reviews-prop.component';

describe('ReviewsPropComponent', () => {
  let component: ReviewsPropComponent;
  let fixture: ComponentFixture<ReviewsPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsPropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
