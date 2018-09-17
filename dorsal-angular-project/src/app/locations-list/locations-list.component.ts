import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationsDataService } from './locations.service';
import { Subscription } from 'rxjs';
import { Location } from './locations.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit , OnDestroy {

  constructor(private router: Router, public dataService: LocationsDataService) { }
  private locationsSub: Subscription;
  locations = [];

  sharkData = JSON.parse(localStorage.getItem('shark-data'));
  country = this.sharkData[0].country;
  state = this.sharkData[0].state;
  zone = this.sharkData[0].zone;


  ngOnInit() {
    this.dataService.getlocations(this.country, this.state , this.zone);
    this.locationsSub = this.dataService.getLocationsUpdateListener()
    .subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  ngOnDestroy() {
    this.locationsSub.unsubscribe();
  }

  onSetLocation(location) {
    console.log('location set to : ' + location);
    this.sharkData[0].location = location;
    localStorage.setItem('shark-data', JSON.stringify(this.sharkData));
    this.router.navigate(['/list-reports']);
  }
}
