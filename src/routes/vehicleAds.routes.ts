const vehicleAdRouter = require("express").Router();
import { create, findAll, findById, updateObject, deleteObject, findAllUserVehicleAds } from '../controllers/vehicleAds.controller';

vehicleAdRouter.get('/',findAll)
vehicleAdRouter.post('/user/:id',create);
vehicleAdRouter.get('/:id', findById)
vehicleAdRouter.put('/:id', updateObject)
vehicleAdRouter.delete('/:id', deleteObject)
vehicleAdRouter.get('/user/:id', findAllUserVehicleAds)

export default vehicleAdRouter;