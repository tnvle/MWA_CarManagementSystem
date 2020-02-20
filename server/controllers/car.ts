import Car from '../models/car';
import BaseCtrl from './base';

export default class CarCtrl extends BaseCtrl {
  model = Car;
  search = async (req, res) => {
    try {
      let conditions = [{}]
      if(req.params.makeId != 'ALL') {
        conditions.push({"make._id": req.params.makeId})
      }
      if(req.params.modelId != 'ALL') {
        conditions.push({"model._id": req.params.modelId})
      }
      if(req.params.zipcode) {
        conditions.push({"zipCode": req.params.zipcode})
      }
      const obj = await this.model.find({$and:conditions});
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  // update by id
  saveFollower = async (req, res) => {
    // console.log('save car for user')
    // console.dir(req)
    try {
      await this.model.findOneAndUpdate({ _id: req.params.cid }, {
        "$push": {"followers": req.body}
      });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  unsaveFollower = async (req, res) => {
    try {
      await this.model.findOneAndUpdate({ _id: req.params.cid }, {
        "$pull": {"followers": {"_id": req.params.uid}}
      });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  // get list cars by uid
  getCarsByFollower = async (req, res) => {
    try {
      const docs = await this.model.find({ "followers": 
        {$elemMatch: 
          {"_id":req.params.uid}
        }
      }
      // , {
      //   "followers": -1
      // }
      );
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  uploadImage = async(req, res)=>{ 
    try{
      var file = req.body;
      console.log("uploadImage" + file.name)
      console.log("req.body" + JSON.stringify(req.body));
      res.sendStatus(200);
    }   
    catch(err){
      return res.status(400).json({ error: err.message });
    }
    
  }
}
