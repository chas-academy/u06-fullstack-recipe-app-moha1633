import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRecipeComponent } from './specific-recipe.component';

describe('SpecificRecipeComponent', () => {
  let component: SpecificRecipeComponent;
  let fixture: ComponentFixture<SpecificRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
