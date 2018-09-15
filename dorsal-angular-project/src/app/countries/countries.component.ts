import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from './countries.service';
import { Subscription } from 'rxjs';
import { Country } from './countries.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit , OnDestroy {

  constructor(public dataService: CountriesService) { }
  countries = [];
  private countriesSub: Subscription;

  ngOnInit() {
    this.dataService.getCountries();
    this.countriesSub = this.dataService.getCountryUpdateListener()
    .subscribe((countries: Country[]) => {
      this.countries = countries;
    });
  }

  ngOnDestroy () {
    this.countriesSub.unsubscribe();
  }

  setCountry (country) {
    const sharkData = JSON.parse(localStorage.getItem('shark-data'));
    sharkData[0].country = country;
    localStorage.setItem('shark-data' , JSON.stringify(sharkData));
  }
}
