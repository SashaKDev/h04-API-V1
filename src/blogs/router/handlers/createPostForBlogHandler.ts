import {Request, Response} from 'express';
import {blogsService} from "../../application/blogsService";
import {PostInputDto} from "../../../posts/dto/post-input.dto";
import {postsService} from "../../../posts/application/postsService";
import {mapPostToViewModel} from "../../../posts/mapers/mapPostToViewModel";

export const createPostForBlogHandler = async (req: Request, res: Response) => {

    const foundBlog = await blogsService.findById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    const newPost: PostInputDto = {
        blogId: req.params.id,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
    }
    const insertedPost = await postsService.createForBlog(newPost)
    const insertedPostViewModel = mapPostToViewModel(insertedPost);
    res
        .status(201)
        .json(insertedPostViewModel);

}