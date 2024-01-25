import { Request, Response } from "express";
import db from "../config/db.config";
import { AuthenticatedRequest, UserAttributes } from "../utils/interfaces";
import { checkIsModeratorOrAdmin } from "../utils/helper";

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

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
    const id = +req.params.id;
    const newObject = req.body;

    if (id !== req.userId && !(await checkIsModeratorOrAdmin(req.userId))) {
        res.status(403).send({ message: "You do not have permission to update this user!" })
        return
    }
    User.update(newObject, { where: { id: id }, fields: ['first_name', 'last_name', 'phone_number'] })
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