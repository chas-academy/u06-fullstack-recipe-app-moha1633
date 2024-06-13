import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietSelectorComponent } from './diet-selector.component';

describe('DietSelectorComponent', () => {
  let component: DietSelectorComponent;
  let fixture: ComponentFixture<DietSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
