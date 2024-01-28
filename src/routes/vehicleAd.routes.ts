const vehicleAdRouter = require('express').Router();
import {
  createVehicleAd,
  findAllVehicleAds,
  findVehicleAdById,
  updateVehicleAd,
  purchaseVehicleAd,
  findAllUserVehicleAds,
  findAllWithFilters,
  deleteVehicleAd,
} from '../controllers/vehicleAd.controller';
import verifySignUp from '../middleware/auth.middleware';

vehicleAdRouter.get('/filter', findAllWithFilters);
vehicleAdRouter.get('/', findAllVehicleAds);
vehicleAdRouter.post('/', verifySignUp.verifyToken, createVehicleAd);
vehicleAdRouter.get('/:id', findVehicleAdById);
vehicleAdRouter.put('/:id',verifySignUp.verifyToken, updateVehicleAd);
vehicleAdRouter.delete('/purchase/:id',verifySignUp.verifyToken, purchaseVehicleAd);
vehicleAdRouter.delete('/:id',verifySignUp.verifyToken, deleteVehicleAd); 
vehicleAdRouter.get('/user/', findAllUserVehicleAds);

export default vehicleAdRouter;
