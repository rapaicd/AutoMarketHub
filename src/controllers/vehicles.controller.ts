import { Request, Response } from "express";
import db from "../models/db";
import { VehicleAttributes } from "../utils/interfaces";

const Vehicle = db.vehicle;

export function create(req: Request, res: Response) {
    const vehicle = {
        name: req.body.name,
        type: req.body.type,
        color: req.body.color,
        year: req.body.year
    };

    Vehicle.create(vehicle)
        .then((data: VehicleAttributes) => {
            res.status(201).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a vehicle."
            });
        });
};

export function findAll(req: Request, res: Response) {

    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // Vehicle.findAll({ where: condition })

    Vehicle.findAll()
        .then((data: VehicleAttributes[]) => {
            res.status(200).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all users."
            });
        });
};

export function findById(req: Request, res: Response) {
    const id = req.params.id;

    Vehicle.findByPk(id)
        .then((data: any) => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find vehicle with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving specific vehicle."
            });
        });
};

export function updateObject(req: Request, res: Response) {
    const id = req.params.id;
    const newObject = req.body;

    Vehicle.update(newObject, { where: { id: id } })
        .then((num: any) => {
            if (num == 1) {
                res.send({
                    message: "Vehicle was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update vehicle with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating vehicle's data."
            });
        });
};

export function deleteObject(req: Request, res: Response) {
    const id = req.params.id;

    Vehicle.destroy({ where: { id: id } })
        .then((num: Number) => {
            console.log('num', num)
            console.log('num type', typeof (num))
            if (num === 1) {
                res.send({
                    message: "Vehicle was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehicle with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting vehicle."
            });
        });
};