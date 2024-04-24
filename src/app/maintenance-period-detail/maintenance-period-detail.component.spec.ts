import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePeriodDetailComponent } from './maintenance-period-detail.component';

describe('MaintenancePeriodDetailComponent', () => {
  let component: MaintenancePeriodDetailComponent;
  let fixture: ComponentFixture<MaintenancePeriodDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenancePeriodDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenancePeriodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
