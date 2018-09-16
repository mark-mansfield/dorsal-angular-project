import { Component, OnInit, OnDestroy } from '@angular/core';
import { ZonesDataService } from './zones.service';
import { Subscription } from 'rxjs';
import { Zone } from './zones.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.css']
})
export class ZonesListComponent implements OnInit , OnDestroy {

  constructor(private router: Router, public dataService: ZonesDataService) { }
  private zonesSub: Subscription;
  zones = [];

  // ? is there a better way to do this state look up
  sharkData = JSON.parse(localStorage.getItem('shark-data'));
  country = this.sharkData[0].country;
  state = this.sharkData[0].state;

  // get data as we load up
  ngOnInit() {
    this.dataService.getZones(this.country , this.state);
    this.zonesSub = this.dataService.getZonesUpdateListener()
    .subscribe((zones: Zone[]) => {
      this.zones = zones;
    });
  }

  // so we dont have endless subscriptions
  ngOnDestroy() {
    this.zonesSub.unsubscribe();
  }

  // so we can access this variable
  onSetZone(zone) {
    this.sharkData[0].zone = zone;
    localStorage.setItem('shark-data' , JSON.stringify(this.sharkData));
    this.router.navigate(['/list-zones']);
  }
}
