import {Request, Response} from 'express';
import {blogsService} from "../../application/blogsService";
import {mapToBlogsWithPaginator} from "../../mapers/mapToBlogsWithPaginator";
import {matchedData} from "express-validator";

export const getAllBlogsHandler = async (req: Request, res: Response) => {

    const data = matchedData(req, { locations: ['query'] });
    console.log(data);
    const pageNumber = Number(data.pageNumber);
    const pageSize = Number(data.ageSize);
    const sortBy = req.query.sortBy as string;
    const sortDirection = req.query.sortDirection as string;
    const searchNameTerm = req.query.searchNameTerm as string;

    const allBlogs = await blogsService.findAll(pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)
    const allBlogsViewModel = mapToBlogsWithPaginator(allBlogs);
    res
        .status(200)
        .json(allBlogsViewModel);
}