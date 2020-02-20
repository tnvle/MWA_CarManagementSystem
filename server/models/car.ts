import * as mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: {_id:String, name: String},
  model: {_id:String, name: String},
  style: {_id:String, name: String},
  followers: [{_id:String, username: String}],
  condition: {_id:String, name: String},
  dealer: {_id:String, name: String, address: String, phone: String, website: String},
  year: Number,
  price: Number,
  mileage: Number,
  imagePath: String,
  zipCode: String
});

const Car = mongoose.model('Car', carSchema);

export default Car;