import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn : 'root'})
export class CountriesService {

  private countries = ['Australia' , 'USA', 'Hawaii'];

  getCountries() {
    return [...this.countries];
  }
}
