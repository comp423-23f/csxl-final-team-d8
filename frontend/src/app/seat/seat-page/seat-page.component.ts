import { Component } from '@angular/core';
import { Seat } from '../seat.model';
import { ActivatedRoute } from '@angular/router';
import { SeatService } from '../seat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seat-page',
  templateUrl: './seat-page.component.html',
  styleUrls: ['./seat-page.component.css']
})
export class SeatPageComponent {

