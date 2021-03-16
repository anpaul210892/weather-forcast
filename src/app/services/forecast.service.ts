import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  LoadForecastWeather(location: any): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='
    + location +
    ',us&APPID=dabc2b57d81c4493c08ab63bb4d9e326&units=imperial');
  }

  LoadCurrentWeather(location: any): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='
    + location +
    ',us&APPID=dabc2b57d81c4493c08ab63bb4d9e326&units=imperial');
  }
}
