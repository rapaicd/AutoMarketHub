import { Op, WhereOptions } from 'sequelize';
import { ConditionQuery, Query } from './interfaces';

export const generateConditions = (query:Query) => {
    const conditions: WhereOptions<ConditionQuery> = {}

    const name = query.name;
    const type = query.type;
    const color = query.color;
    const yearMax = query.yearMax; 
    const yearMin = query.yearMin;
    const priceMax = query.priceMax; 
    const priceMin = query.priceMin; 

    if (name) {
        conditions.name = {
            [Op.like]: `${name}%`
        }
    }
    if (type === 'car' || type === 'bike') {
        conditions.type = type
    }
    if (color) {
        conditions.color = {
            [Op.like]: `${color}%`
        }
    }
    if (yearMax) {
        conditions.year = {
            ...(conditions.year || {}),
            [Op.lte]: yearMax
        };
    }
    if (yearMin) {
        conditions.year = {
            ...(conditions.year || {}),
            [Op.gte]: yearMin
        };
    }
    if (priceMax) {
        conditions.price = {
            ...(conditions.price || {}),
            [Op.lte]: priceMax
        };
    }
    if (priceMin) {
        conditions.price = {
            ...(conditions.price || {}),
            [Op.gte]: priceMin
        };
    }

    return conditions;
}