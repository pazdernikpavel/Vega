import * as _ from 'underscore';
import { SaveVehicle, Vehicle, Contact } from './../../model/models';
import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
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

    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService) {

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
    Observable.forkJoin(sources).subscribe(data => {

      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }

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


  deleteVehicle() {

    if (confirm("Are you sure?")) {

      this.vehicleService
        .deleteVehicle(this.vehicle.id)
        .subscribe(v => {

          this.router.navigate(['/home']);

        });

      this.toastyService.info({
        title: 'Deleted',
        msg: 'The vehicle was successfuly deleted!',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });

    }

  }

  // if make is changed in the form, this method will be called
  onMakeChange() {

    this.populateModels();
    delete this.vehicle.modelId;

  }

  // populate models upon choosing given make or by getting make id from the database
  private populateModels() {

    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];

  }

  // adding/removing features from/to features array as user tick/untick checkboxes
  onFeatureToggle(featureId: any, $event: any) {

    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);

    }

  }

  // action called upon submitting vehicle-form
  submit() {

    if (this.vehicle.id) {

      this.vehicleService
        .updateVehicle(this.vehicle);

      this.toastyService.success({
        title: 'Updated',
        msg: 'The vehicle was successfuly updated!',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });


    }
    else {
      this.vehicleService
        .createVehicle(this.vehicle)
        .subscribe(
        x => console.log(x));

      this.toastyService.success({
        title: 'Created',
        msg: 'The vehicle was successfuly created!',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });

    }

    //this.router.navigate(['/home']);

  }
}
