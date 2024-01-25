import { Request, Response } from "express";
import db from "../config/db.config";
import { UserAttributes } from "../utils/interfaces";

const User = db.user;

export const findAll = (req: Request, res: Response) => {
    User.findAll({ attributes: { exclude: ['password'] } })
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

export const findById = (req: Request, res: Response) => {
    const id = req.params.id;

    User.findByPk(id, { attributes: { exclude: ['password'] } })
        .then((data: UserAttributes | null) => {
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

export const updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    const newObject = req.body;

    User.update(newObject, { where: { id: id } })
        .then((num: number[]) => {
            if (num[0] == 1) {
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

export const deleteObject = (req: Request, res: Response) => {
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