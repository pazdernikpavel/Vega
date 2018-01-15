import { Vehicle, SaveVehicle } from './../model/models';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class VehicleService {

  constructor(private http: Http) { }

  // Gets list of makes upon creating/updating vehicle 
  getMakes() {
    return  this.http
      .get('/api/makes')
      .map(res => res.json());
  }

  // Gets list of features upon creating/updating vehicle
  getFeatures() {
    return  this.http
      .get('/api/features')
      .map(res => res.json());
  }

  // Creating a new vehicle
  createVehicle(vehicle: any) {
    return this.http
      .post('/api/vehicles', vehicle)
      .map(res => res.json());
  }

  // Gets already existing vehicle detail by entered ID from url
  getVehicle(id: number) {
    return this.http
      .get('/api/vehicles/' + id)
      .map(res => res.json());
  }

  // Updates already existing vehicle
  updateVehicle(vehicle: SaveVehicle) {
    return this.http
      .put('/api/vehicles/' + vehicle.id, vehicle)
      .map(res => res.json());

  }

}
