import * as mongoose from 'mongoose';

const conditionSchema = new mongoose.Schema({
  _id:String, 
  name: String  
});

const Condition = mongoose.model('Condition', conditionSchema);

export default Condition;
