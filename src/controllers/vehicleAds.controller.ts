import { Request, Response } from "express";
import db from "../utils/db";
import { VehicleAdAttributes } from "../utils/interfaces";
import {generateConditions} from "../utils/helper"

const VehicleAd = db.vehicleAd;

export function create(req: Request, res: Response) {
    const vehicleAd = {
        name: req.body.name,
        type: req.body.type,
        color: req.body.color,
        year: req.body.year,
        userId: req.params.id,
        price: req.body.price,
    };

    VehicleAd.create(vehicleAd)
        .then((data: VehicleAdAttributes) => {
            res.status(201).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a vehicleAd."
            });
        });
};

export function findAll(req: Request, res: Response) {
    VehicleAd.findAll()
        .then((data: VehicleAdAttributes[]) => {
            res.status(200).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all vehicles."
            });
        });
};

export function findAllUserVehicleAds(req: Request, res: Response) {
    const userId = req.params.id;

    VehicleAd.findAll(
        {
            where: { userId: userId },
            attributes: { exclude: ['userId'] }
        })
        .then((data: VehicleAdAttributes[]) => {
            res.status(200).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user's vehicles."
            });
        });
};

export function findById(req: Request, res: Response) {
    const id = req.params.id;

    VehicleAd.findByPk(id, {
        include: db.user,
        attributes:
            { exclude: ['userId'] }
    })
        .then((data: any) => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find vehicleAd with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving specific vehicleAd."
            });
        });
};

export function updateObject(req: Request, res: Response) {
    const id = req.params.id;
    const newObject = req.body;

    VehicleAd.update(newObject, { where: { id: id } })
        .then((num: any) => {
            if (num == 1) {
                res.send({
                    message: "VehicleAd was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update vehicleAd with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating vehicleAd's data."
            });
        });
};

export function deleteObject(req: Request, res: Response) {
    const id = req.params.id;

    VehicleAd.destroy({ where: { id: id } })
        .then((num: Number) => {
            console.log('num', num)
            console.log('num type', typeof (num))
            if (num === 1) {
                res.send({
                    message: "VehicleAd was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete VehicleAd with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting vehicleAd."
            });
        });
};


export function findAllWithFilters(req: Request, res: Response) {
    VehicleAd.findAll(
        {
            where: generateConditions(req.query),
            attributes: { exclude: ['userId'] }
        })
        .then((data: VehicleAdAttributes[]) => {
            res.status(200).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving filtered vehicles."
            });
        });
};