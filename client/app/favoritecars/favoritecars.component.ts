import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { AuthService } from '../services/auth.service';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-favoritecars',
  templateUrl: './favoritecars.component.html',
  styleUrls: ['./favoritecars.component.css']
})
export class FavoritecarsComponent implements OnInit {
  public cars: Car[] = []
  constructor(private carService: CarService, private auth: AuthService) { }

  ngOnInit() {
    this.getFavCars()
  }

  getFavCars() {
    this.carService.getFavoriteCars(this.auth.currentUser._id).subscribe(
      data => {
        this.cars = data;
        console.dir(data)
      },
      error => console.dir(error),
      () => {console.log('loaded all cars')}
    );
  }
}
