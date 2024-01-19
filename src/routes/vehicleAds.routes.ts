const vehicleAdRouter = require('express').Router();
import {
  create,
  findAll,
  findById,
  updateObject,
  purchaseVehicle,
  findAllUserVehicleAds,
  findAllWithFilters,
  deleteVehicle,
} from '../controllers/vehicleAds.controller';

vehicleAdRouter.get('/filter', findAllWithFilters);
vehicleAdRouter.get('/', findAll);
vehicleAdRouter.post('/user/:id', create);
vehicleAdRouter.get('/:id', findById);
vehicleAdRouter.put('/:id', updateObject);
vehicleAdRouter.delete('/purchase/:id', purchaseVehicle);
vehicleAdRouter.delete('/:id', deleteVehicle);
vehicleAdRouter.get('/user/:id', findAllUserVehicleAds);

export default vehicleAdRouter;
