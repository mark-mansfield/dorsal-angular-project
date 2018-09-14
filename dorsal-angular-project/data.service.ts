import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(private http: HttpClient,  private router: Router) { }
  apiUrl = '';
  apiKey = '';
  getCountries(countries: any []) {

  }
}
