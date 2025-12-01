import {Request, Response} from 'express';
import {Blog} from "../../types/blog";
import {blogsRepository} from "../../repositories/blogsRepository";
import {mapBlogToViewModel} from "../../mapers/mapBlogToViewModel";
import {BlogInputDto} from "../../dto/blog-input.dto";
import {blogsService} from "../../application/blogsService";

export const createBlogHandler = async (req: Request, res: Response) => {
    try {
        const newBlog: BlogInputDto = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
        }

        const createdBlog = await blogsService.create(newBlog);
        const createdBlogViewModel = mapBlogToViewModel(createdBlog);

        res
            .status(201)
            .json(createdBlogViewModel);

    } catch (error) {
        res.sendStatus(500);
    }
}