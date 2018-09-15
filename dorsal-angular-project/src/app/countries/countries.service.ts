import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from './countries.model';

@Injectable({providedIn : 'root'})
export class CountriesService {

  // private countries = ['Australia' , 'USA', 'Hawaii'];
  private countriesUpdated = new Subject<Country[]>();

  constructor ( private http: HttpClient) {}

  getCountryUpdateListener() {
    return this.countriesUpdated.asObservable();
  }

  getCountries() {
    // return [...this.countries];
    this.http.get<{message: string, countries: any}>('http://localhost:3000/api/countries')
    .subscribe((countryData) => {
    const sharkData = localStorage.getItem('shark-data');
    if (!sharkData) {
      localStorage.setItem
      ('shark-data', JSON.stringify
          (
              [
                  {
                      'country' : '',
                      'state' : '',
                      'zone' : '',
                      'location' : ''
                  }
              ]
          )
      );
    }

    const data = countryData.countries;
    const countryNames = [];
    data.forEach((item) => {
      countryNames.push(item.name);
    });

    this.countriesUpdated.next([...countryNames]);

    });
  }
}