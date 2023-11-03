import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatPageComponent } from './seat-page.component';

describe('SeatPageComponent', () => {
  let component: SeatPageComponent;
  let fixture: ComponentFixture<SeatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
