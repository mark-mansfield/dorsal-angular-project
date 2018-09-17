import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Report } from './reports.model';

@Injectable({providedIn : 'root'})
export class ReportsDataService {


  private reportsUpdated = new Subject<Report[]>();

  constructor ( private http: HttpClient) {}

  getReportsUpdateListener() {
    return this.reportsUpdated.asObservable();
  }


  getReports (country, selectedState, zone, location) {

    const httpBody = {
        country: country,
        state: selectedState.name,
        zone: zone,
        location: location
    };

    this.http.post<{message: string, reports: any}>('http://localhost:3000/api/list-reports' , httpBody)
      .subscribe((reportsData) => {
        console.log(reportsData.reports.responseData);
        const data = reportsData.reports.responseData;
        this.reportsUpdated.next([...data]);
      });
  }
}
