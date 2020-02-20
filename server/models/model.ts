import * as mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  _id:String, 
  name: String  
});

const Model = mongoose.model('Model', modelSchema);

export default Model;
