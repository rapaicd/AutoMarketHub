const vehicleAdRouter = require('express').Router();
import {
  createVehicleAd,
  findAll,
  findById,
  updateVehicleAd,
  purchaseVehicleAd,
  findAllUserVehicleAds,
  findAllWithFilters,
  deleteVehicleAd,
} from '../controllers/vehicleAd.controller';
import verifySignUp from '../middleware/auth.middleware';

vehicleAdRouter.get('/filter', findAllWithFilters);
vehicleAdRouter.get('/', findAll);
vehicleAdRouter.post('/user/:id', verifySignUp.verifyToken, createVehicleAd);
vehicleAdRouter.get('/:id', findById);
vehicleAdRouter.put('/:id',verifySignUp.verifyToken, updateVehicleAd);
vehicleAdRouter.delete('/purchase/:id',verifySignUp.verifyToken, purchaseVehicleAd);
vehicleAdRouter.delete('/:id',verifySignUp.verifyToken, deleteVehicleAd);
vehicleAdRouter.get('/user/:id', findAllUserVehicleAds);

export default vehicleAdRouter;
