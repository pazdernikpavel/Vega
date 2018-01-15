import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {
    features: [],
    contact: {}
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

    this.vehicleService
      .getVehicle(this.vehicle.id)
      .subscribe(v => {
        this.vehicle = v;
      }, err => {
        if (err.status == 404)
        this.router.navigate(['/home']);
      });
    
    this.vehicleService
      .getMakes()
      .subscribe(makes => this.makes = makes);

    this.vehicleService
      .getFeatures()
      .subscribe(features => this.features = features);

  }

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
 