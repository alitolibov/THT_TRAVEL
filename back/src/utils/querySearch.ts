import { Op } from 'sequelize';
import { QuerySearchDTO } from '../types/dtos.global';

interface IQuerySearchRes {
    limit: number;
    offset: number;
    order: any[];
    where: Record<string, any>;
}

export function createQueryParams(
    params: QuerySearchDTO,
    searchFields: string[],
): IQuerySearchRes {
    const limit = Number(params.limit) || 10;
    const offset = Number(params.offset) || 0;
    const search = params.search || '';
    const order: [string, 'ASC' | 'DESC'][] = [];
    const date: Record<string, any> = { createdAt: {} };

    const whereCondition = search
        ? {
              [Op.or]: searchFields.map((field) => ({
                  [field]: { [Op.iLike]: `%${search}%` },
              })),
          }
        : {};

    if (params.endDate) {
        date.createdAt[Op.lt] = params.endDate;
    }

    if (params.startDate) {
        date.createdAt[Op.gt] = params.startDate;
    }

    if (!params.startDate && !params.endDate) {
        delete date.createdAt;
    }

    if (params.sortBy) {
        for (const key in params.sortBy) {
            const direction = params.sortBy[key] == -1 ? 'DESC' : 'ASC';
            order.push([key, direction]);
        }
    }

    return {
        limit,
        offset,
        order: order.length ? order : [['createdAt', 'DESC']],
        where: { ...whereCondition, ...date },
    };
}
