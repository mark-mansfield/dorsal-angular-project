import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(public countriesService: CountriesService) { }
  countries = [];

  ngOnInit() {
    this.countries = this.countriesService.getCountries();
  }

}
