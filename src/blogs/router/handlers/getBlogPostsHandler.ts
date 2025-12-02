import {Request, Response} from "express";
import {blogsService} from "../../application/blogsService";
import {postsService} from "../../../posts/application/postsService";
import {mapToBlogPostsWithPaginator} from "../../mapers/mapToBlogPostsWithPaginator";
import {matchedData} from "express-validator";

export const getBlogPostsHandler = async (req: Request, res: Response) => {

    const data = matchedData(req, { locations: ['query'] });
    console.log(data);

    const foundBlog = await blogsService.findById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }

    const pageNumber = Number(data.pageNumber);
    const pageSize = Number(data.pageSize);
    const sortDirection = data.sortDirection;
    const sortBy = data.sortBy;

    const foundPosts = await postsService.findAllForBlog(req.params.id, pageNumber, pageSize, sortBy, sortDirection);
    const foundPostsWithPaginator = mapToBlogPostsWithPaginator(foundPosts);
    res
        .status(200)
        .json(foundPostsWithPaginator);

}