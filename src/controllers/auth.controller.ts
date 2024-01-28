import { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/db.config';
import { AuthenticatedRequest, RoleAttributes, UserAttributes } from '../utils/interfaces';

const { user: User, role: Role, role: UserRoles } = db;

export const signup = (req: Request, res: Response) => {
  const message = "User was registered successfully!"
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  User.create(newUser)
    .then((user: any) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles: RoleAttributes[]) => {
          user.setRoles(roles).then(() => {
            res.send({ message });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message });
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = (req: Request, res: Response): void => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid: boolean = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }
      const authorities: string[] = [];
      user.getRoles().then((roles: RoleAttributes[]) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        const token: string = jwt.sign({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          roles: authorities,
        },
          process.env.JWT_SECRET || '',
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          });

        res.status(200).send({
          accessToken: token
        });
      });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  const oldPassword = req.body.old_password;
  const newPassword = req.body.new_password;
  const confirmNewPassword = req.body.confirm_new_password;

  if (newPassword !== confirmNewPassword) {
    res.status(400).send({ msg: 'New password and new repeted password is not the same!' })
    return;
  }

  const user = await User.findByPk(req.userId)
  const userPassword = user?.password!;

  if (!bcrypt.compareSync(oldPassword, userPassword)) {
    res.status(400).send({ msg: 'Old password is incorrect!' })
    return;
  }
  const cryptedNewPassword = { password: bcrypt.hashSync(newPassword, 8) }

  User.update(cryptedNewPassword, { where: { id: req.userId } })
    .then(() => {
      res.status(200).send({ msg: 'Password successfully updated!' })
    })
    .catch((err: Error) => console.error("Error while updating password! Error: ", err))
}