import {Request, Response} from 'express';
import {blogsService} from "../../application/blogsService";
import {mapToBlogsWithPaginator} from "../../mapers/mapToBlogsWithPaginator";
import {matchedData} from "express-validator";

export const getAllBlogsHandler = async (req: Request, res: Response) => {

    const data = matchedData(req, { locations: ['query'] });
    console.log(data);
    const pageNumber = Number(data.pageNumber);
    const pageSize = Number(data.pageSize);
    const sortBy = data.sortBy;
    const sortDirection = data.sortDirection;
    const searchNameTerm = data.searchNameTerm;

    const allBlogs = await blogsService.findAll(pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)
    const allBlogsViewModel = mapToBlogsWithPaginator(allBlogs);
    res
        .status(200)
        .json(allBlogsViewModel);
}