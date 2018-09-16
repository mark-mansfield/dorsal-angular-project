import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Zone } from './zones.model';

@Injectable({providedIn : 'root'})
export class ZonesDataService {


  private zonesUpdated = new Subject<Zone[]>();

  constructor ( private http: HttpClient) {}

  getZonesUpdateListener() {
    return this.zonesUpdated.asObservable();
  }


  getZones (country, selectedState) {
    console.log(country);
    console.log(selectedState);
    const state = {
        state: selectedState
    };
    this.http.post<{message: string, zones: any}>('http://localhost:3000/api/list-zones' , state)
      .subscribe((zonesData) => {

        const data = zonesData.zones;
        console.log(zonesData);

        this.zonesUpdated.next([...data]);

      });
  }
}
