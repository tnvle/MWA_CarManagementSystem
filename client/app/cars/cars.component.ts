import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../shared/models/car.model';
import { CarService } from '../services/car.service';
import { Make } from '../shared/models/make.model';
import { Style } from '../shared/models/style.model';
import { Model } from '../shared/models/model.model';
import { Condition } from '../shared/models/condition.model';
import { Dealer } from '../shared/models/dealer.model';
import { MatDialog } from '@angular/material';
import { AddcarComponent } from '../addcar/addcar.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  car = new Car();
  cars: Car[] = [];
  isLoading = true;
  isEditing = false;

  //for comboboxes
  allMakes: Make[] = []
  allModels: Model[] = []
  allStyles: Style[] = []
  allConditions: Condition[] = []
  allDealers: Dealer[] = []

  //for upload image
  fileToUpload: File = null;
  buf = null;

  addCarForm: FormGroup;
  editCarForm: FormGroup;

  make = new FormControl('', Validators.required);
  model = new FormControl('', Validators.required);
  style = new FormControl('', Validators.required);
  condition = new FormControl('', Validators.required);
  dealer = new FormControl('', Validators.required);
  year = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  mileage = new FormControl('', Validators.required);
  // imagePath = new FormControl('', Validators.required);
  zipCode = new FormControl('', Validators.required);

  displayedColumns = ["image","make", "model", "style","condition","dealer","year","price","mileage","zipcode","edit","delete"];

  constructor(private carService: CarService,
              private formBuilder: FormBuilder, public dialog: MatDialog
              /*public toast: ToastComponent*/) { }

  ngOnInit() {    
    this.getCars();
    this.getAllModels();

    // this.addCarForm = this.formBuilder.group({
    //   make: this.make,
    //   model: this.model,
    //   style: this.style,
    //   condition: this.condition,
    //   dealer: this.dealer,
    //   year: this.year,
    //   price: this.price,
    //   mileage: this.mileage,
    //   imagePath: [null, Validators.required],//this.buf,//[''],
    //   zipCode: this.zipCode      
    // });
    // this.editCarForm = this.formBuilder.group({
    //   make: this.make,
    //   model: this.model,
    //   style: this.style,
    //   condition: this.condition,
    //   dealer: this.dealer,
    //   year: this.year,
    //   price: this.price,
    //   mileage: this.mileage,
    //   imagePath: this.imagePath,
    //   zipCode: this.zipCode
    // });
  }

  //upload image

  onFileChange(event) {
    
    this.fileToUpload = event.target.files[0];
    console.log("onFileChange before reader: " + this.fileToUpload.name + " " + JSON.stringify(this.fileToUpload))
    
    let reader = new FileReader();
    reader.onload = () => {
      // this.imagePath = reader.result;
      this.addCarForm.patchValue({
        imagePath: reader.result
     });
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log("onFileChange afer reader: " + this.fileToUpload.name + " " + JSON.stringify(this.fileToUpload))

  }

  upload() {
    let formData = new FormData();    
    formData.append("uploads", this.fileToUpload, this.fileToUpload.name);

    console.log("In upload(): " + JSON.stringify(this.fileToUpload))
    this.carService.uploadFile(/*{"name": "vantest"}*/this.buf).subscribe(
      res => console.log("uploadFile res: " + JSON.stringify(res))
    )
}

  

  getCars() {
    this.carService.getCars().subscribe(
      data => this.cars = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }



  addCar() {  
    // this.upload();

    this.carService.addCar(this.addCarForm.value).subscribe(
      res => {
        console.log("addCar res: " + JSON.stringify(res))
        this.cars.push(res);
        this.addCarForm.reset();
        // this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(car: Car) {
    this.isEditing = true;
    this.car = car;
  }

  cancelEditing() {
    this.isEditing = false;
    this.car = new Car();
    // this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the Cars to reset the editing
    this.getCars();
  }

  editCar(car: Car) {
    console.log("editCar: " + JSON.stringify(car))
    this.carService.editCar(car).subscribe(
      () => {
        this.isEditing = false;
        this.car = car;
        // this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCar(car: Car) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.carService.deleteCar(car).subscribe(
        () => {
          // const pos = this.cars.map(elem => elem._id).indexOf(car._id);
          // this.cars.splice(pos, 1);
          this.carService.getCars().subscribe(
            data => {
              this.cars = data;
              console.dir(data)
            },
            error => console.dir(error),
            () => {console.log('loaded all cars')}
          );
          // this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
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
    this.carService.getStyles().subscribe(
      data => this.allStyles = data,
      error => console.log(error),
      // () => this.isLoading = false
    );
    this.carService.getConditions().subscribe(
      data => this.allConditions = data,
      error => console.log(error),
      // () => this.isLoading = false
    );

    this.carService.getDealers().subscribe(
      data => this.allDealers = data,
      error => console.log(error),
      // () => this.isLoading = false
    );

  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(AddcarComponent, {
      width: '600px',
      data: {title: 'Add Car', originalData: null}
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      console.dir(result)
      this.carService.addCar(result.data).subscribe(
        res => {
          console.log("addCar res: " + JSON.stringify(res))
          this.carService.getCars().subscribe(
            data => {
              this.cars = data;
              console.dir(data)
            },
            error => console.dir(error),
            () => {console.log('loaded all cars')}
          );
        },
        error => console.log(error)
      );
    });
  }
  openEditDialog(car: Car): void {
    let dialogRef = this.dialog.open(AddcarComponent, {
      width: '600px',
      data: {title: 'Edit Car', originalData: car}
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      console.dir(result)
      this.carService.editCar(result.data).subscribe(
        res => {
          console.log("editCar res: " + JSON.stringify(res))
          this.carService.getCars().subscribe(
            data => {
              this.cars = data;
              console.dir(data)
            },
            error => console.dir(error),
            () => {console.log('loaded all cars')}
          );
        },
        error => console.log(error)
      );
    });
  }
}
