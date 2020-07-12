import { IAvailableSlot } from './availableSlot';
import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent {
  minDate: Date;
  maxDate: Date;
  dateFilter = (date) => {
    return date.getDay() != 0;
  };
  public availableSlots: IAvailableSlot[] = [];
  selectedSlot: number;
  selectedDate: Date;
  message: string;

  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    let newdate = new Date(`${event.value}`.toString());
    const today = new Date().getDate();
    if (newdate.getDate() == today) {
      this.service
        .getAvailableSlots(null)
        .subscribe((data) => (this.availableSlots = data));
    } else {
      this.service
        .getAvailableSlots(newdate)
        .subscribe((data) => (this.availableSlots = data));
    }
  }

  constructor(private service: BookingService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 21);

    this.service
      .getAvailableSlots(null)
      .subscribe((data) => (this.availableSlots = data));
  }

  Book() {
    let body = { date: this.selectedDate, id: this.selectedSlot };
    this.service.postBook(body).subscribe((data) => {
      console.log(data);
      this.message = data;
    });
  }
}
