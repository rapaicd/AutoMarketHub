import { Op, WhereOptions } from 'sequelize';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import {
  ConditionQuery,
  EmailMessageAttributes,
  Query,
  RoleAttributes,
} from './interfaces';
import { SUBJECT, INTRO } from '../messages/emailMessage';
import db from '../config/db.config';

export const generateConditions = (query: Query) => {
  const conditions: WhereOptions<ConditionQuery> = {};

  const name = query.name;
  const type = query.type;
  const color = query.color;
  const yearTo = query.year_to;
  const yearFrom = query.year_from;
  const priceMax = query.price_max;
  const priceMin = query.price_min;

  if (name) {
    conditions.name = {
      [Op.like]: `${name}%`,
    };
  }
  if (type === 'car' || type === 'bike') {
    conditions.type = type;
  }
  if (color) {
    conditions.color = {
      [Op.like]: `${color}%`,
    };
  }
  if (yearTo) {
    conditions.year = {
      ...(conditions.year || {}),
      [Op.lte]: yearTo,
    };
  }
  if (yearFrom) {
    conditions.year = {
      ...(conditions.year || {}),
      [Op.gte]: yearFrom,
    };
  }
  if (priceMax) {
    conditions.price = {
      ...(conditions.price || {}),
      [Op.lte]: priceMax,
    };
  }
  if (priceMin) {
    conditions.price = {
      ...(conditions.price || {}),
      [Op.gte]: priceMin,
    };
  }

  return conditions;
};

export const sendEmailToPurchaser = (
  purchaserEmail: string,
  purchaserName: string | undefined
) => {
  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  };

  let response = {
    body: {
      name: purchaserName?purchaserName:purchaserEmail,
      intro: INTRO,
    },
  };

  let mail = new Mailgen({
    theme: 'default',
    product: {
      name: 'AutoMarketHub',
      //client landing page url
      link: process.env.FRONTEND_URL || 'http://localhost:3001',
    },
  }).generate(response);

  let message: EmailMessageAttributes = {
    from: process.env.GMAIL_APP_USER,
    to: purchaserEmail,
    subject: SUBJECT,
    html: mail,
  };

  nodemailer
    .createTransport(config)
    .sendMail(message)
    .then(() => {
      console.log('E-mail is succesfully sent');
    })
    .catch((err: Error) => {
      console.log('Error message: ', err.message);
    });
};

export const initial = () => {
  db.role.create({
    name: "user"
  });

  db.role.create({
    name: "moderator"
  });

  db.role.create({
    name: "admin"
  });
}

export const checkIsModeratorOrAdmin = async (userId: number | undefined): Promise<boolean> => {
  return db.user.findByPk(userId)
    .then((user: any) => {
      if (!user) return false;
      return user.getRoles()
        .then((roles: RoleAttributes[]) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator" || roles[i].name === "admin") {
              console.log(roles[i].name);
              return true;
            }
          }
          return false;
        });
    })
    .catch((error: Error) => {
      console.error("Error checking user roles:", error);
      return false;
    });
};