import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class TimerConfig {
  timeInit: number;
  timeLeft: number;
  otherStuff: {};

  constructor() {
    this.timeLeft = 100;
  }
}

@Injectable()
export class TimerService {
  private timerConfig = new TimerConfig();
  checkoutConfig$ = new BehaviorSubject<TimerConfig>(this.timerConfig);
  private interval = undefined;

  init() {
    this.timerConfig = new TimerConfig();
  }

  setTimeInit(timeInit) {
    this.timerConfig.timeInit = timeInit;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.sendTimerUpdate(this.timerConfig);
  }

  resetTimer() {
    this.timerConfig.timeLeft = this.timerConfig.timeInit;
    this.sendTimerUpdate(this.timerConfig);
  }

  updateTimer() {
    if (this.timerConfig.timeLeft > 0) {
      this.timerConfig.timeLeft--;
    } else {
      this.timerConfig.timeLeft = 60;
    }
    this.sendTimerUpdate(this.timerConfig);
  }

  sendTimerUpdate(timerConfig) {
    this.checkoutConfig$.next(timerConfig);
  }
}
