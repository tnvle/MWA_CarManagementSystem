import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from '../shared/models/car.model';
import { Make } from '../shared/models/make.model';
import { Model } from '../shared/models/model.model';
import { Style } from '../shared/models/style.model';
import { Condition } from '../shared/models/condition.model';
import { Dealer } from '../shared/models/dealer.model';
import { User } from '../shared/models/user.model';

@Injectable()
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('/api/cars');
  }

  countCars(): Observable<number> {
    return this.http.get<number>('/api/cars/count');
  }

  addCar(car: Car): Observable<Car> {
      console.log("Add car: " + JSON.stringify(car))
    return this.http.post<Car>('/api/admin/car', car);
  }

  uploadFile(file): Observable<any> {
    console.log("uploadFile: " + JSON.stringify(file))
  return this.http.post('/api/admin/upload', file);
}

  searchCars(makeId, modelId, zipcode): Observable<Car[]> {
    return this.http.get<Car[]>(`/api/cars/${makeId}/${modelId}/${zipcode}`);
  }
  getCar(car: Car): Observable<Car> {
    return this.http.get<Car>(`/api/car/${car._id}`);
  }

  getCarById(cid: string): Observable<Car> {
    return this.http.get<Car>(`/api/car/${cid}`);
  }
  editCar(car: Car): Observable<any> {
    return this.http.put(`/api/admin/car/${car._id}`, car, { responseType: 'text' });
  }
  saveFavoriteCar(car: Car, user: User): Observable<any> {
    // console.dir(car)
    // console.dir(user)
    return this.http.patch(`/api/car/${car._id}`, user, { responseType: 'text' });
  }
  unsaveFavoriteCar(car: Car, user: User): Observable<any> {
    // console.dir(car)
    // console.dir(user)
    return this.http.patch(`/api/car/${car._id}/${user._id}`,{}, { responseType: 'text' });
  }
  getFavoriteCars(userID): Observable<Car[]> {
    return this.http.get<Car[]>(`/api/protected/cars/${userID}`);
  }

  deleteCar(car: Car): Observable<any> {
    return this.http.delete(`/api/admin/car/${car._id}`, { responseType: 'text' });
  }

  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>('/api/makes');
  }

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/api/models');
  }

  getStyles(): Observable<Style[]> {
    return this.http.get<Style[]>('/api/styles');
  }

  getConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>('/api/conditions');
  }

  getDealers(): Observable<Dealer[]> {
    return this.http.get<Dealer[]>('/api/dealers');
  }

}
