import {Request, Response} from "express";
import {postsRepository} from "../../repositories/postsRepository";
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";

export const getAllPostsHandler = async (req: Request, res: Response) => {
    const foundPosts = await postsRepository.findAll();
    const foundPostsViewModel = foundPosts.map(mapPostToViewModel);
    res
        .status(200)
        .json(foundPostsViewModel);
}