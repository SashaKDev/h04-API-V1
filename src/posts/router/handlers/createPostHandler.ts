import {Request, Response} from 'express';
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";
import {PostInputDto} from "../../dto/post-input.dto";
import {postsService} from "../../application/postsService";
import {blogsService} from "../../../blogs/application/blogsService";
import {postsQueryRepository} from "../../repositories/postsQueryRepository";

export const createPostHandler = async (req: Request, res: Response) => {

    const newPost: PostInputDto = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
    }
    const createdPostId = await postsService.create(newPost);
    if (!createdPostId) {
        res.sendStatus(404)
        return;
    }
    const createdPost = await postsQueryRepository.findById(createdPostId);
    res
        .status(201)
        .json(createdPost);
}