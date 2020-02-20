import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../shared/models/car.model';
import { CarService } from '../services/car.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // public car: Car = new Car()
  @Input() mode: string = "short"
  @Input() car: Car
  @Output() favoriteChange = new EventEmitter();
  public isFavorite: boolean
  public isLoggedIn: boolean
  constructor(private carService: CarService, private auth: AuthService) { }

  ngOnInit() {
    
    console.log(this.car)
    if(this.car) {
      const followers = this.car.followers.filter(u => u._id == this.auth.currentUser._id)
      this.isFavorite = followers.length > 0
      console.log(followers)

    }
    this.isLoggedIn = this.auth.loggedIn
  }
  updateCounter() {    
    this.carService.getFavoriteCars(this.auth.currentUser._id).subscribe(
      data => {
        localStorage.setItem('counterFav', data.length > 0 ? data.length.toString() : '0');
        this.favoriteChange.emit(data)
      },
      error => console.dir(error),
      () => {console.log('updated counter for favorite cars.'); console.log(localStorage.getItem('counterFav'))}
    );
  }
  saveCar() {
    console.log('save favorite car started')
    this.carService.saveFavoriteCar(this.car, this.auth.currentUser).subscribe(
      () => {
        console.log('updated success')
        this.isFavorite = true
        this.updateCounter()
      },
      error => console.log(error)
    );
  }
  unsaveCar() {
    console.log('unsave favorite car started')
    this.carService.unsaveFavoriteCar(this.car, this.auth.currentUser).subscribe(
      () => {
        console.log('unsave car for user success')
        this.isFavorite = false
        this.updateCounter()
      },
      error => console.log(error)
    );
  }
}
