import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WeatherApiService {
    constructor() {}

    weatherData = inject(HttpClient);
    getWeatherData(city: string | null) {
        return this.weatherData.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e124fb640b814c031daa1aabde059d48`)
    }
}
