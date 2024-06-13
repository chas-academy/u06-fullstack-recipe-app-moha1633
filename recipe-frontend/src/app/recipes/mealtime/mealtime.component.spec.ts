import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealtimeComponent } from './mealtime.component';

describe('MealtimeComponent', () => {
  let component: MealtimeComponent;
  let fixture: ComponentFixture<MealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealtimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
