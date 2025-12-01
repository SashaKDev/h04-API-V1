import {Request, Response} from 'express';
import {mapBlogToViewModel} from "../../mapers/mapBlogToViewModel";
import {blogsService} from "../../application/blogsService";

export const getAllBlogsHandler = async (req: Request, res: Response) => {
    const allBlogs = await blogsService.findAll()
    const allBlogsViewModel = allBlogs.map(mapBlogToViewModel);
    res
        .status(200)
        .json(allBlogsViewModel);
}