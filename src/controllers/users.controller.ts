import db from "../models/db";
import {Request, Response } from "express";
const User = db.user;

export function create (req:Request, res:Response) {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number
    };

    User.create(user)
        .then((data: any) => {
            res.status(201).send(data);
        })
        .catch((err:Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

export function findAll (req:Request, res:Response) {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    // User.findAll({ where: condition })
    User.findAll()
        .then((data: any) => {
            res.status(200).send(data);
        })
        .catch((err:Error) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};