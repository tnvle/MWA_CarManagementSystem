import * as mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  _id:String, 
  name: String,
    address: String,
    phone: String,
    website: String
});

const Dealer = mongoose.model('Dealer', dealerSchema);

export default Dealer;
