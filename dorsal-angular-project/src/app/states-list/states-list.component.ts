import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatesDataService } from './states.service';
import { Subscription } from 'rxjs';
import { State } from './states.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css']
})
export class StatesListComponent implements OnInit , OnDestroy {

  constructor(public dataService: StatesDataService, private router: Router) { }

  private statesSub: Subscription;
  states = [];
  sharkData = JSON.parse(localStorage.getItem('shark-data'));
  country =  this.sharkData[0].country;

  ngOnInit() {

    this.dataService.getStates(this.country);
    this.statesSub = this.dataService.getStatesUpdateListener()
    .subscribe((states: State[]) => {
      this.states = states;
    });
  }

  ngOnDestroy () {
    this.statesSub.unsubscribe();
  }

  setState (state) {
    this.sharkData[0].state = state;
    localStorage.setItem('shark-data' , JSON.stringify(this.sharkData));
    this.router.navigate(['/list-zones']);
  }

}
