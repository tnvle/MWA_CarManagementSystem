import * as mongoose from 'mongoose';

const styleSchema = new mongoose.Schema({
  _id:String, 
  name: String  
});

const Style = mongoose.model('Style', styleSchema);

export default Style;
