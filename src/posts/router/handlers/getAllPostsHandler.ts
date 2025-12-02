import {Request, Response} from "express";
import {postsService} from "../../application/postsService";
import {matchedData} from "express-validator";
import {mapToBlogPostsWithPaginator} from "../../../blogs/mapers/mapToBlogPostsWithPaginator";

export const getAllPostsHandler = async (req: Request, res: Response) => {

    const data = matchedData(req, { locations: ['query'] });
    console.log(data);
    const pageSize = Number(data.pageSize);
    const pageNumber = Number(data.pageNumber);
    const sortBy = data.sortBy;
    const sortDirection = data.sortDirection;

    const foundPosts = await postsService.findAll(pageSize, pageNumber, sortDirection, sortBy);
    const foundPostsWithPaginator = mapToBlogPostsWithPaginator(foundPosts);

    res
        .status(200)
        .json(foundPostsWithPaginator);
}