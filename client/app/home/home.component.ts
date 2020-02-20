import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Make } from '../shared/models/make.model';
import { Model } from '../shared/models/model.model';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchCarForm: FormGroup
  allMakes: Make[] = []
  allModels: Model[] = []
  cars: Car[] = []

  constructor(private carService: CarService, private formBuilder: FormBuilder)  { }

  zipcode = new FormControl('', [
    // Validators.required,
    Validators.pattern('[0-9]{5}')
  ]);
  ngOnInit() {
    this.searchCarForm = this.formBuilder.group({
      make: ['ALL', Validators.required],
      model: ['ALL', Validators.required],
      zipcode: this.zipcode
    });
    this.getAllModels();
    this.getAllCars();
  }

  getAllModels(){
    this.carService.getMakes().subscribe(
      data => this.allMakes = data,
      error => console.log(error),
      // () => this.isLoading = false
    );
    this.carService.getModels().subscribe(
      data => this.allModels = data,
      error => console.log(error),
      // () => this.isLoading = false
    );
  }

  getAllCars() {
    this.carService.getCars().subscribe(
      data => {this.cars = data;
      console.dir(data)},
      error => console.dir(error),
      () => {console.log('loaded all cars')}
    );
  }
  search() {
    this.carService.searchCars(this.searchCarForm.get('make').value,
     this.searchCarForm.get('model').value, this.searchCarForm.get('zipcode').value
    ).subscribe(
      data => { this.cars = data;
      console.dir(data)},
      error => console.dir(error),
      () => {console.log('loaded search cars')}
    );
  }
}
