import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntolerancesSelectorComponent } from './intolerances-selector.component';

describe('IntolerancesSelectorComponent', () => {
  let component: IntolerancesSelectorComponent;
  let fixture: ComponentFixture<IntolerancesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntolerancesSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntolerancesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
