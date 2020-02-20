import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

import setRoutes from './routes';
import { JwtHelperService } from '@auth0/angular-jwt';

const app = express();
dotenv.config();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

var tokenMiddleware = function (req, res, next){
  // console.log("Enter tokenMiddleware")
  // console.log("req.headers: " + JSON.stringify(req.headers))
  var token = req.headers.tokenauthorization;
  // console.log("tokenauthorization: " + token)
  var decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  // console.log("Decoded role: " + JSON.stringify(decoded) + ' ' + decoded.username + ' ' + decoded.role) // bar
  if(!decoded){//if(!token || token === 'null'){
    // console.log("res: 403")
    res.status(403).send({ success: false, message: "Failed to authenticate user." })    
  }
  else
  {
    // console.log("preparing next()")
    return next();    
  }
    
}
var adminMiddleware = function (req, res, next){
  // console.log("Enter adminMiddleware")
  // console.log("req.headers: " + JSON.stringify(req.headers))
  var token = req.headers.tokenauthorization;
  // console.log("tokenauthorization: " + token)
  var decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  // console.log("Decoded role: " + JSON.stringify(decoded) + ' ' + decoded.user.username + ' ' + decoded.user.role) // bar
  if(!decoded || !decoded.user || !decoded.user.role || decoded.user.role !== 'admin'){//if(!token || token === 'null'){
    // console.log("res: 403")
    res.status(403).send({ success: false, message: "Failed to authenticate admin." })    
  }
  else
  {
    // console.log("preparing next()")
    return next();    
  }
    
}
app.use('/api/protected/*', tokenMiddleware)
app.use('/api/admin/*', adminMiddleware)

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI,  { useFindAndModify: false })
  .then(db => {
    console.log('Connected to MongoDB');

    setRoutes(app);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

export { app };

