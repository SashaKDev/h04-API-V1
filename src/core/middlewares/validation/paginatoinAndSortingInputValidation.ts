import {query} from 'express-validator';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = 'desc';

enum sortByFields {
    createdAt = 'createdAt',
}

const pageNumberValidation = query('pageNumber')
    .optional({ checkFalsy: true })
    .default(DEFAULT_PAGE_NUMBER)
    .isInt({min: 1})
    .withMessage('pageNumber must be a positive integer')

const pageSizeValidation = query('pageSize')
    .optional({ checkFalsy: true })
    .default(DEFAULT_PAGE_SIZE)
    .isInt({min: 1})
    .withMessage('pageSize must be a positive integer')

const sortByValidation = query('sortBy')
    .optional({ checkFalsy: true })
    .default(Object.values(sortByFields)[0])
    .isIn(Object.values(sortByFields))
    .withMessage('sortBy invalid value');

const sortDirectionValidation = query('sortDirection')
    .optional({ checkFalsy: true })
    .default(DEFAULT_SORT_DIRECTION)
    .isIn(['desc', 'asc'])
    .withMessage('sortDirection must be asc or desc')


export const paginationAndSortingInputValidation = [
    pageNumberValidation,
    pageSizeValidation,
    sortByValidation,
    sortDirectionValidation,
]

