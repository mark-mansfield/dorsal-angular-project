import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient , HttpParams } from '@angular/common/http';
import { State } from './states.model';

@Injectable({providedIn : 'root'})
export class StatesDataService {


  private statesUpdated = new Subject<State[]>();

  constructor ( private http: HttpClient) {}

  getStatesUpdateListener() {
    return this.statesUpdated.asObservable();
  }

  getStates(country) {
    console.log(country);
    const selectedCountry = { name : country };
    this.http.post<{message: string, states: any}>('http://localhost:3000/api/list-states' , selectedCountry)
      .subscribe((statesData) => {

        const sharkData = localStorage.getItem('shark-data');
        if (!sharkData) {
        // ? should we re-direct to country select here
        }

        const data = statesData.states;
        console.log(statesData);

        this.statesUpdated.next([...data]);

      });
  }
}
