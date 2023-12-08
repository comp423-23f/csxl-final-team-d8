import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatManageComponent } from './seat-manage.component';

describe('SeatManageComponent', () => {
  let component: SeatManageComponent;
  let fixture: ComponentFixture<SeatManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatManageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SeatManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
