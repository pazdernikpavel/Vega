import * as _ from 'underscore';
import { SaveVehicle, Vehicle, Contact } from './../../model/models';
import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})

export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService ) { 

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });

    }

  ngOnInit() {

    // Sources provided in Observable.forkJoin with optional getVehicle request
    var sources = [

      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),

    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    // sending parallel request to the server to obtain necessary data
    Observable.forkJoin(sources).subscribe( data => {

      this.makes = data[0];
      this.features = data[1];
      
      if (this.vehicle.id)
        this.setVehicle(data[2]);

    }, err => {

      if (err.status == 404)
        this.router.navigate(['/home']);

    });
  }


  // Method for mapping vehicle fields
  private setVehicle(v: Vehicle) {

    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');

  }

  // FORM METHODS

  onMakeChange() {

    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;

  }

  onFeatureToggle(featureId: any, $event: any) {

    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);

    } 

  }

  submit() {

    this.vehicleService
      .createVehicle(this.vehicle)
      .subscribe(
        x => console.log(x)); 

  }

}
 