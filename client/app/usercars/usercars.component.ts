import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../shared/models/car.model';
import { CarService } from '../services/car.service';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usercars',
  templateUrl: './usercars.component.html',
  styleUrls: ['./usercars.component.css']
})
export class UsercarsComponent implements OnInit {

  // cars: Car[] = [];
  // isLoading = true;
  // isEditing = false;
  // isViewDetails = false;

  // addCarForm: FormGroup;
  // make = new FormControl('', Validators.required);
  // year = new FormControl('', Validators.required);
  // price = new FormControl('', Validators.required);
  // zipCode = new FormControl('', Validators.required);

  // displayedColumns = ["image","make", "model", "style","condition","year","price","view"];
  //dataSource: Car[] = [];
  public car : Car;
  public cid : string;
  private subscription: Subscription;
  constructor(private carService: CarService,
              private formBuilder: FormBuilder,public auth: AuthService
              ,private activatedRoute: ActivatedRoute, private router: Router) {
                this.subscription = activatedRoute.params.subscribe(
                  (params: any) => {
                    this.cid = params['cid'];
                    this.carService.getCarById(this.cid).subscribe(
                      data => { this.car = data; console.dir(data)},
                      error => console.dir(error),
                      () => {console.log('loaded detail car')})
                  }
                );
               }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
            
  ngOnInit() {
    // this.getCars();
    // this.addCarForm = this.formBuilder.group({
    //   // make: this.make,
    //   year: this.year,
    //   price: this.price,
    //   zipCode: this.zipCode
    // });
  }

  // getCars() {
  //   this.carService.getCars().subscribe(
  //     data => {this.cars = data;
  //                 //this.dataSource = this.cars;
  //                 },
  //     error => console.log(error),
  //     () => this.isLoading = false
  //   );
  // }

  // // addCar() {
  // //   this.carService.addCar(this.addCarForm.value).subscribe(
  // //     res => {
  // //       this.cars.push(res);
  // //       this.addCarForm.reset();
  // //       // this.toast.setMessage('item added successfully.', 'success');
  // //     },
  // //     error => console.log(error)
  // //   );
  // // }

  // enableViewDetails(car: Car) {
  //   console.log("enable view details")
  //   console.log(this.car);
  //   this.isEditing = true;
  //   this.car = car;
  //   this.isViewDetails = true;
  // }

  // cancelEditing() {
  //   this.isEditing = false;
  //   this.car = new Car();
  //   // this.toast.setMessage('item editing cancelled.', 'warning');
  //   // reload the Cars to reset the editing
  //   this.getCars();
  //   this.isViewDetails = false;
  // }

  // editCar(car: Car) {
  //   this.carService.editCar(car).subscribe(
  //     () => {
  //       this.isEditing = false;
  //       this.car = car;
  //       // this.toast.setMessage('item edited successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }

  // deleteCar(car: Car) {
  //   if (window.confirm('Are you sure you want to permanently delete this item?')) {
  //     this.carService.deleteCar(car).subscribe(
  //       () => {
  //         const pos = this.cars.map(elem => elem._id).indexOf(car._id);
  //         this.cars.splice(pos, 1);
  //         // this.toast.setMessage('item deleted successfully.', 'success');
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }
}
