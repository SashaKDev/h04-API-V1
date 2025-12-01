import {Request, Response} from "express";
import {blogsService} from "../../application/blogsService";
import {postsService} from "../../../posts/application/postsService";
import {mapToBlogsWithPaginator} from "../../mapers/mapToBlogsWithPaginator";
import {mapToBlogPostsWithPaginator} from "../../mapers/mapToBlogPostsWithPaginator";

export const getBlogPostsHandler = async (req: Request, res: Response) => {

    const foundBlog = await blogsService.findById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }

    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const sortBy = req.query.sortBy as string;

    const foundPosts = await postsService.findAllForBlog(req.params.id, pageNumber, pageSize, sortBy);
    const foundPostsWithPaginator = mapToBlogPostsWithPaginator(foundPosts);
    res
        .status(200)
        .json(foundPostsWithPaginator);

}