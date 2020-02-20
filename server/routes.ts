import * as express from 'express';

import UserCtrl from './controllers/user';
import CarCtrl from './controllers/car';
import MakeCtrl from './controllers/make';
import ModelCtrl from './controllers/model';
import StyleCtrl from './controllers/style';
import ConditionCtrl from './controllers/condition';
import DealerCtrl from './controllers/dealer';

export default function setRoutes(app) {

  const router = express.Router();

  const makeCtrl = new MakeCtrl();
  const modelCtrl = new ModelCtrl();
  const styleCtrl = new StyleCtrl();
  const conditionCtrl = new ConditionCtrl();
  const dealerCtrl = new DealerCtrl();

  const carCtrl = new CarCtrl();
  const userCtrl = new UserCtrl();

  //relavant models
  router.route('/makes').get(makeCtrl.getAll);
  router.route('/models').get(modelCtrl.getAll);
  router.route('/styles').get(styleCtrl.getAll);
  router.route('/conditions').get(conditionCtrl.getAll);
  router.route('/dealers').get(dealerCtrl.getAll);

  // Cars
  router.route('/cars').get(carCtrl.getAll);
  router.route('/cars/count').get(carCtrl.count);
  router.route('/admin/car').post(carCtrl.insert);
  router.route('/car/:id').get(carCtrl.get);
  router.route('/cars/:makeId/:modelId/:zipcode').get(carCtrl.search);
  router.route('/cars/:makeId/:modelId/').get(carCtrl.search);
  router.route('/admin/car/:id').put(carCtrl.update);
  router.route('/admin/car/:id').delete(carCtrl.delete);
  router.route('/admin/upload').post(carCtrl.uploadImage);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // save favorite car
  router.route('/car/:cid').patch(carCtrl.saveFollower);
  router.route('/car/:cid/:uid').patch(carCtrl.unsaveFollower);
  router.route('/protected/cars/:uid').get(carCtrl.getCarsByFollower);

  // Apply the routes to our applicarion with the prefix /api
  app.use('/api', router);

}
