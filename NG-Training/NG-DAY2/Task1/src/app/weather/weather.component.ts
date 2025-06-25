import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherApiService } from '../weather-api.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.css',
})
export class WeatherComponent {
    constructor(private weatherApi: WeatherApiService) {}

    city: string = "--";
    temprature: string = "--";
    humidity: string = "--";
    iconLink: string | null = null;
    errorMessage: string | null = null;
    hasError: boolean = false;

    onCitySearch(weatherForm: NgForm) {
        this.weatherApi.getWeatherData(weatherForm.controls['cityName'].value).subscribe({
            next: (result: any) => {
                if (this.hasError) {
                    this.hasError = !this.hasError;
                }
                console.log(result);
                this.city = result.name;
                this.temprature = String(((result.main.temp) - 273.15).toFixed(2)) + "°C";
                this.humidity = result.main.humidity + "%";
                this.iconLink = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`;
            },
            error: (err: any) => {
                console.error(err);
                this.hasError = true;
                if (this.hasError) {
                    this.city = "--";
                    this.temprature = "--";
                    this.humidity = "--";
                    this.iconLink = null;
                }
                if (err.status = 404) this.errorMessage = 'Invalid city name!';
                else this.errorMessage = 'Server busy!';
            }
        });
    }
}

