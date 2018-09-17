import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Location } from './locations.model';

@Injectable({providedIn : 'root'})
export class LocationsDataService {


  private locationsUpdated = new Subject<Location[]>();

  constructor ( private http: HttpClient) {}

  getLocationsUpdateListener() {
    return this.locationsUpdated.asObservable();
  }


  getlocations (country, selectedState, zone) {

    const httpBody = {
        country: country,
        state: selectedState,
        zone: zone
    };

    this.http.post<{message: string, locations: any}>('http://localhost:3000/api/list-locations' , httpBody)
      .subscribe((locationsData) => {
        console.log(locationsData);
        const data = locationsData.locations;
        this.locationsUpdated.next([...data]);
      });
  }
}
