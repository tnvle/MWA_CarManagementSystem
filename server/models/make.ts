import * as mongoose from 'mongoose';

const makeSchema = new mongoose.Schema({
  _id:String, 
  name: String  
});

const Make = mongoose.model('Make', makeSchema);

export default Make;
