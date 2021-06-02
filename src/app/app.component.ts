import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService, TimerConfig } from './timer.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular 6';
  timeLeft: number = 0;
  timerConfigSubscription: Subscription;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timerService.init();
    this.timerService.setTimeInit(100);

    this.timerConfigSubscription = this.timerService.checkoutConfig$.subscribe(
      (config: TimerConfig) => {
        this.timeLeft = config.timeLeft;
      }
    );
  }

  ngOnDestroy() {
    if (this.timerConfigSubscription) {
      this.timerConfigSubscription.unsubscribe();
    }
    this.timerConfigSubscription = undefined;
  }

  startTimer() {
    this.timerService.startTimer();
  }

  pauseTimer() {
    this.timerService.pauseTimer();
  }

  resetTimer() {
    this.timerService.resetTimer();
  }
}
