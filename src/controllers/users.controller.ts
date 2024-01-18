import { Request, Response } from "express";
import db from "../models/db";
import { UserAttributes } from "../utils/interfaces";

const User = db.user;

export function create(req: Request, res: Response) {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number
    };

    User.create(user)
        .then((data: UserAttributes) => {
            res.status(201).send(data);
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a user."
            });
        });
};

export function findAll(req: Request, res: Response) {

    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // User.findAll({ where: condition })

    User.findAll()
        .then((data: UserAttributes[]) => {
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

    User.findByPk(id)
        .then((data: any) => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving specific user."
            });
        });
};

export function updateObject(req: Request, res: Response) {
    const id = req.params.id;
    const newObject = req.body;

    User.update(newObject, { where: { id: id } })
        .then((num: any) => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating user's data."
            });
        });
};

export function deleteObject(req: Request, res: Response) {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
        .then((num: Number) => {
            if (num === 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}.`
                });
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting user."
            });
        });
};