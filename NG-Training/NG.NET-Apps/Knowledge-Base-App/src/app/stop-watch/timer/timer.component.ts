import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-timer',
    imports: [],
    template: `
        <div style="display: flex; gap: 10px; flex-direction: column;" class="icon-btns">
            <div id="time-left">{{ timeLeft }}</div>
            <div id="display-controls">
                <div id="timer-label">
                    <p>{{ timerType }}</p>
                </div>
                <div id="timer-ssr" class="icon-btns">
                    <button id="start-stop" (click)="toggleTimer.emit()">
                        <i style="color: black; font-size: 17px; margin-top: 2px; margin-left: 1px" [class]="isRunning ? 'fa fa-pause' : 'fa fa-play'"></i>
                    </button>
                    <button id="reset" (click)="reset.emit()">
                        <img src="assets/icons/arrows-rotate.svg" alt="reset">
                        <!-- <i class="fa fa-refresh"></i> -->
                    </button>
                    <button style="" id="toggle-modes" (click)="toggleFunction()">
                        <img src="assets/icons/swap-arrows.svg" alt="reset">
                    </button>
                </div>
            </div>
        </div>
    `,
    styles: `
        #time-left {
            font-size: 70px;
            text-align: center;
            background-color:rgb(53, 63, 80);
            padding: 20px;
            border-radius: 10px;
        }

        #display-controls {
            display: flex;
            align-items: center;
            display: flex;
            justify-content: space-between;
        }

        #timer-label {
            background-color: rgb(1,17,1);
            border-radius: 10px;
            padding: 10px 0;
            width: 130px;
        }

        #timer-label p {
            margin: 0;
            font-size: 18px;
            text-align: center;
        }

        #timer-ssr {
            margin-left: 30px;
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }

        button {
            background-color: #6950E8;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            text-align: center;
            transition: all 0.3s ease;
        }

        button:hover {
            cursor: pointer;
            background-color: #592be7;
        }

        .icon-btns button img {
            height: 20px;
            margin-top: 5px;
        }
    `,
})
export class TimerComponent {
    toggleFunction() {
        this.reset.emit();
        this.toggleModes.emit();
    }
    @Input() timeLeft!: string;
    @Input() timerType!: string;
    @Input() isRunning!: boolean;
    @Output() toggleTimer = new EventEmitter<void>();
    @Output() reset = new EventEmitter<void>();
    @Output() toggleModes = new EventEmitter<void>();
}
