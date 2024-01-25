import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import db from '../config/db.config';
import { RoleAttributes } from '../utils/interfaces';

interface AuthenticatedRequest extends Request {
    userId?: number;
}
const User = db.user;

const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user: any) => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });

};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
    const ROLES = ["user", "admin", "moderator"];

    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token = req.headers["authorization"];

    if (!token || typeof token !== 'string' || !token.startsWith('Bearer')) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    token = token.split(' ')[1]

    jwt.verify(token,
        process.env.JWT_SECRET || '',
        (err: Error | null, decoded: any) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded?.id;
            return next();
        });
};

const isAdmin = (req: AuthenticatedRequest, res:Response, next:NextFunction) => {
    User.findByPk(req.userId).then((user:any) => {
      user.getRoles().then((roles:RoleAttributes[]) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };
  
  const isModerator = (req: AuthenticatedRequest, res:Response, next:NextFunction) => {
    User.findByPk(req.userId).then((user:any) => {
      user.getRoles().then((roles:RoleAttributes[]) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Moderator Role!"
        });
      });
    });
  };
  
  const isModeratorOrAdmin = (req: AuthenticatedRequest, res:Response, next:NextFunction) => {
    User.findByPk(req.userId).then((user:any) => {
      user.getRoles().then((roles:RoleAttributes[]) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Moderator or Admin Role!"
        });
      });
    });
  };

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted,
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
};

export default verifySignUp;