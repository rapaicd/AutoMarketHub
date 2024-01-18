const vehicleRouter = require("express").Router();
import { create, findAll, findById, updateObject, deleteObject } from '../controllers/vehicles.controller';

vehicleRouter.route('/')
    .get(findAll)
    .post(create);
vehicleRouter.get('/:id', findById)
vehicleRouter.put('/:id', updateObject)
vehicleRouter.delete('/:id', deleteObject)

export default vehicleRouter;