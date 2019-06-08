import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.page.html',
  styleUrls: ['./scheduled.page.scss'],
})
export class ScheduledPage implements OnInit {

  public scheduledMessage: string;
  public dayToday: string;
  private scheduled: [];

  constructor(
    private route: ActivatedRoute,
  ) { 
    console.log(this.route.snapshot.data);
    console.log(this.route.snapshot.data['scheduled']);
    this.scheduled = (this.route.snapshot.data['scheduled'] != undefined) ? this.route.snapshot.data['scheduled'] : [];
    this.dayToday = new Date().getDay().toString();
    this.scheduledMessage = 'This page is only displayed when the day is in the array: ' + this.scheduled.toString() + '. Today is ' + this.dayToday + '.';

  }

  ngOnInit() {
  }

}
