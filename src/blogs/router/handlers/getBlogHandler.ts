import {Request, Response} from 'express';
import {blogsService} from "../../application/blogsService";
import {mapBlogToViewModel} from "../../mapers/mapBlogToViewModel";

export const getBlogHandler = async (req: Request, res: Response) => {
    const foundBlog = await blogsService.findById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    const foundBlogViewModel = mapBlogToViewModel(foundBlog);
    res
        .status(200)
        .json(foundBlogViewModel);
}