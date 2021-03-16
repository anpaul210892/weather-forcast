import { Component } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { ForecastData } from '../models/ForecastData.model';
import { ForecastDetails } from '../models/ForecastDetails.model';
import { WeatherData } from '../models/weatherData.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['../app.component.scss']
})
export class WeatherComponent {
  // Declrations
  title = 'Weather App';
  listFilter: any;
  location: string;
  showCurrent = false;
  showForecast = false;
  weatherDetails: WeatherData = new WeatherData();
  forecastData: ForecastData;
  isDark = false;

  /*
  Injected Forecast service, DomSanitizer for the icons
  for the thirdparty icon sanitizing.
  */
  constructor(private forecastService: ForecastService) { }

  ngOninit() {

    }

   /*
    This function is to load the forecast weather. This will subsrcibe from the
    publisher of the URL from the Forecast service which returns an observable.
   */
  loadForecastWeather() {
       this.forecastService.LoadForecastWeather(this.location).subscribe(
      res => {
               this.forecastData = new ForecastData(); // Instance to store the Data of ForecastModel
               this.forecastData.name = res.city.name;
               // Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
               for (let i = 0; i < res.list.length; i = i + 8) {
             // Instance of type ForecastDetails and stores the data in it.
             const details = new ForecastDetails();
             console.log(res.list[i]);
             details.date = res.list[i].dt_txt;
             details.avgTemperature = res.list[i].main.temp;
             details.pressure = res.list[i].main.pressure;
             details.feelsLike = res.list[i].main.feels_like;
             details.humidity = res.list[i].main.humidity;
             details.description = res.list[i].weather[0].description;
             details.icon = res.list[i].weather[0].icon;
             this.forecastData.details.push(details); // Pushing the data to the to created object
           }
               this.showCurrent = false;
               this.showForecast = true;
      }
    );
   }
/**
 * This will subsrcibe from the publisher of the URL
 * from the Forecast service which returns an observable.
 */

   loadCurrentWeather() {
     this.forecastService.LoadCurrentWeather(this.location).subscribe(
    res => {
         this.weatherDetails.cityName = res.name;
         this.weatherDetails.description = res.weather[0].description;
         this.weatherDetails.currentTemperature = res.main.temp;
         this.weatherDetails.icon = res.weather[0].icon;
         this.weatherDetails.maxTemperature = res.main.temp_max;
         this.weatherDetails.minTemperature = res.main.temp_min;
         this.showCurrent = true;
         this.showForecast = false;
    }
   );
   }
   // Function to toggle the theme.
   toggleTheme() {
     this.isDark = !this.isDark;
   }
   }
