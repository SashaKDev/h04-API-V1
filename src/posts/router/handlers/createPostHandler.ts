import {Request, Response} from 'express';
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";
import {PostInputDto} from "../../dto/post-input.dto";
import {postsService} from "../../application/postsService";
import {blogsService} from "../../../blogs/application/blogsService";

export const createPostHandler = async (req: Request, res: Response) => {
    const foundBlog = await blogsService.findById(req.body.blogId);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    const newPost: PostInputDto = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
    }
    const createdPost = await postsService.create(newPost);
    res
        .status(201)
        .json(mapPostToViewModel(createdPost));
}