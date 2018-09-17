import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsDataService } from './reports.service';
import { Subscription } from 'rxjs';
import { Report } from './reports.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit , OnDestroy {


  constructor(private router: Router, public dataService: ReportsDataService) { }
  private reportsSub: Subscription;
  reports = [];
  sharkData = JSON.parse(localStorage.getItem('shark-data'));
  country = this.sharkData[0].country;
  state = this.sharkData[0].state;
  zone = this.sharkData[0].zone;
  reportLocation = this.sharkData[0].location;



  ngOnInit() {

    this.dataService.getReports(this.country , this.state , this.zone, this.reportLocation);
    this.reportsSub = this.dataService.getReportsUpdateListener()
    .subscribe((reports: Report[]) => {
      this.reports = reports;
    });
  }

  ngOnDestroy() {
    this.reportsSub.unsubscribe();
  }
}
