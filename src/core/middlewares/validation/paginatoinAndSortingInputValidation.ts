import {query} from 'express-validator';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

enum SortByFields {

}


const pageNumberValidation = query('pageNumber')
    .default(DEFAULT_PAGE_NUMBER)
    .isInt({min: 1})
    .withMessage('pageNumber must be a positive integer')

const pageSizeValidation = query('pageSize')
    .default(DEFAULT_PAGE_SIZE)
    .isInt({min: 1})
    .withMessage('pageSize must be a positive integer')

export const paginationAndSortingInputValidation = [
    pageNumberValidation,
    pageSizeValidation,
]

