import { Request, Response } from "express";
import db from "../models/db";
import { VehicleAdAttributes } from "../utils/interfaces";

const VehicleAd = db.vehicleAd;

export function create(req: Request, res: Response) {
    const vehicleAd = {
        name: req.body.name,
        type: req.body.type,
        color: req.body.color,
        year: req.body.year,
        userId: req.body.userId,
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

    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // VehicleAd.findAll({ where: condition })

    VehicleAd.findAll()
        .then((data: VehicleAdAttributes[]) => {
            res.status(200).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all users."
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
                    err.message || "Some error occurred while retrieving all users."
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