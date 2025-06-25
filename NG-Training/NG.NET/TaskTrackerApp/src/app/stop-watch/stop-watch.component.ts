import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from "./timer/timer.component";
import { TimerLengthMemComponent } from './timer-length-mem/timer-length-mem.component';

const SESSION = 'Session';
const BREAK = 'Break';
const SESSIONLEN = 25;
const BREAKLEN = 5;

@Component({
    standalone: true,
    selector: 'app-stop-watch',
    imports: [CommonModule, TimerComponent, TimerLengthMemComponent],
    templateUrl: './stop-watch.component.html',
    styleUrl: './stop-watch.component.css',
})
export class StopWatchComponent {
    breakLen = BREAKLEN;
    sessionLen = SESSIONLEN;
    timeLeft = SESSIONLEN * 60;
    timerType = SESSION;
    isTimerRunning = false;
    intervalId: any;
    audio = new Audio(
        'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
    );

    changeTimerType() {
        // this.resetTimer();
        this.timerType = this.timerType === SESSION ? BREAK : SESSION;
        this.timeLeft =
            this.timerType === SESSION
                ? this.sessionLen * 60
                : this.breakLen * 60;
    }

    handleDecrementBreak() {
        if (!this.isTimerRunning && this.breakLen > 1) {
            this.breakLen--;
            if (this.timerType === BREAK) this.timeLeft = this.breakLen * 60;
        }
    }

    handleIncrementBreak() {
        if (!this.isTimerRunning && this.breakLen < 60) {
            this.breakLen++;
            if (this.timerType === BREAK) this.timeLeft = this.breakLen * 60;
        }
    }

    handleDecrementSession() {
        if (!this.isTimerRunning && this.sessionLen > 1) {
            this.sessionLen--;
            if (this.timerType === SESSION)
                this.timeLeft = this.sessionLen * 60;
        }
    }

    handleIncrementSession() {
        if (!this.isTimerRunning && this.sessionLen < 60) {
            this.sessionLen++;
            if (this.timerType === SESSION)
                this.timeLeft = this.sessionLen * 60;
        }
    }

    resetTimer() {
        clearInterval(this.intervalId);
        this.breakLen = BREAKLEN;
        this.sessionLen = SESSIONLEN;
        this.timeLeft = SESSIONLEN * 60;
        this.timerType = SESSION;
        this.isTimerRunning = false;
        this.intervalId = null;
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    runTimer() {
        this.intervalId = setInterval(() => {
            this.timeLeft--;

            if (this.timeLeft === 0) {
                this.audio.play();
            }

            if (this.timeLeft < 0) {
                clearInterval(this.intervalId);
                this.changeTimerType();
            }
        }, 1000);
    }

    toggleStartStopTimer() {
        if (!this.isTimerRunning) {
            this.runTimer();
        } else {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isTimerRunning = !this.isTimerRunning;
    }

    clockify(): string {
        const minutes = Math.floor(this.timeLeft / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
}
