import { Vehicle, KeyValuePair } from './../../model/models';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  allvehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {

    this.vehicleService
      .getMakes()
      .subscribe(makes => this.makes = makes);

    this.vehicleService
      .getVehicles()
      .subscribe(vehicles => this.vehicles = this.allvehicles = vehicles);

  }

  onFilterChange() {

    var vehicles = this.allvehicles;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    this.vehicles = vehicles;

  }

  filterReset() {

    this.filter = {};
    this.onFilterChange();

  }

}
