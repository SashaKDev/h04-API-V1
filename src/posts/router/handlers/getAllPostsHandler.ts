import {Request, Response} from "express";
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";
import {postsService} from "../../application/postsService";

export const getAllPostsHandler = async (req: Request, res: Response) => {

    const pageSize = Number(req.query.pageSize);
    const pageNumber = Number(req.query.pageNumber);

    const foundPosts = await postsService.findAll(pageSize, pageNumber);
    const foundPostsViewModel = foundPosts.map(mapPostToViewModel);
    res
        .status(200)
        .json(foundPostsViewModel);
}