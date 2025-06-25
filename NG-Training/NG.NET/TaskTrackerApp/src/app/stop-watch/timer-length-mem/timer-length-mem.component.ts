import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-timer-length-mem',
    imports: [],
    template: `
        <div class="timer-length-container">
            <div class="dsp-container">
                {{ label }}: <strong><span class="timer-length">{{ length }}</span></strong>
            </div>
            <div class="inc-dec-btn-container">
                <button class="inc-arrow" (click)="increment.emit()">
                    <i class="fa fa-arrow-up"></i>
                </button>
                <button (click)="decrement.emit()">
                    <i class="fa fa-arrow-down"></i>
                </button>
            </div>
        </div>
    `,
    styles: `
        .dsp-container {
            background-color: #000;
            width: 100%;
            padding: 5px 10px;
            border-radius: 10px;
            text-align: center;
        }

        .inc-dec-btn-container {
            display: flex;
            gap: 10px;
            padding: 12px 0;
            justify-content: center;
        }

        button {
            background-color: #6950E8;
            border: none;
            height: 40px;
            width: 100%;
            color: #000;
            border-radius: 10px;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
        }

        button:hover {
            cursor: pointer;
            background-color: #592be7;
        }
    `,
})
export class TimerLengthMemComponent {
    @Input() label!: string;
    @Input() length!: number;
    @Output() increment = new EventEmitter<void>();
    @Output() decrement = new EventEmitter<void>();
}
