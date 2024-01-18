const vehicleAdRouter = require("express").Router();
import { create, findAll, findById, updateObject, deleteObject, findAllUserVehicleAds } from '../controllers/vehicles.controller';

vehicleAdRouter.route('/')
    .get(findAll)
    .post(create);
vehicleAdRouter.get('/:id', findById)
vehicleAdRouter.put('/:id', updateObject)
vehicleAdRouter.delete('/:id', deleteObject)
vehicleAdRouter.get('/user/:id', findAllUserVehicleAds)

export default vehicleAdRouter;