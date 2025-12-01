import {Request, Response} from 'express';
import {Post} from "../../types/post";
import {blogsRepository} from "../../../blogs/repositories/blogsRepository";
import {postsRepository} from "../../repositories/postsRepository";
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";

export const createPostHandler = async (req: Request, res: Response) => {
    const foundBlog = await blogsRepository.findById(req.body.blogId);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    const newPost: Post = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: foundBlog.name,
        createdAt: new Date().toISOString(),
    }
    const createdPost = await postsRepository.create(newPost);
    res
        .status(201)
        .json(mapPostToViewModel(createdPost));
}