import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarService } from '../services/car.service';
import { Car } from '../shared/models/car.model';
import { Make } from '../shared/models/make.model';
import { Model } from '../shared/models/model.model';
import { Style } from '../shared/models/style.model';
import { Condition } from '../shared/models/condition.model';
import { Dealer } from '../shared/models/dealer.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

  //for comboboxes
  public allMakes: Make[] = []
  public allModels: Model[] = []
  public allStyles: Style[] = []
  public allConditions: Condition[] = []
  public allDealers: Dealer[] = []

  //for upload image
  fileToUpload: File = null;

  addCarForm: FormGroup;
  createFormControl(val) {
    return new FormControl(val, Validators.required);
  }
  make = new FormControl('', Validators.required);
  model = new FormControl('', Validators.required);
  style = new FormControl('', Validators.required);
  condition = new FormControl('', Validators.required);
  dealer = new FormControl('', Validators.required);
  year = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  mileage = new FormControl('', Validators.required);
  imagePath = new FormControl('', Validators.required);
  zipCode = new FormControl('', Validators.required);
  // car : Car;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddcarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public carService: CarService) { }

  ngOnInit() {
    console.dir(this.data.originalData)
    if(this.data.originalData){
      const car = this.data.originalData;
      this.addCarForm = this.formBuilder.group({
        _id: new FormControl(car._id, Validators.required),
        make: new FormControl(car.make._id, Validators.required),
        model: new FormControl(car.model._id, Validators.required),
        style: new FormControl(car.style._id, Validators.required),
        condition: new FormControl(car.condition._id, Validators.required),
        dealer: new FormControl(car.dealer._id, Validators.required),
        year: new FormControl(car.year, Validators.required),
        price: new FormControl(car.price, Validators.required),
        mileage: new FormControl(car.mileage, Validators.required),
        imagePath: new FormControl(car.imagePath, Validators.required),
        zipCode: new FormControl(car.zipCode, Validators.required),     
      });
    } else {
      this.addCarForm = this.formBuilder.group({
        make: this.make,
        model: this.model,
        style: this.style,
        condition: this.condition,
        dealer: this.dealer,
        year: this.year,
        price: this.price,
        mileage: this.mileage,
        imagePath: [null, Validators.required],//new FormControl(null, Validators.required),
        zipCode: this.zipCode      
      });
    }
    this.getAllModels();
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.addCarForm.value);
    const data = this.transformData(this.addCarForm.value);
    console.dir(data);
    this.event.emit({data});
    this.dialogRef.close();
  }

  transformData(obj): Car {
    const newCar = {...obj,
      make: this.allMakes.filter(m => m._id == obj.make)[0],
      model: this.allModels.filter(m => m._id == obj.model)[0],
      style: this.allStyles.filter(m => m._id == obj.style)[0],
      condition: this.allConditions.filter(m => m._id == obj.condition)[0],
      dealer: this.allDealers.filter(m => m._id == obj.dealer)[0]
    }
    return newCar;
  }

  
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
}
