import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogsRepository";
import {BlogInputDto} from "../../dto/blog-input.dto";
import {blogsService} from "../../application/blogsService";

export const updateBlogHandler = async (req: Request, res: Response) => {
    const blog = await blogsService.findById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const dto: BlogInputDto = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    }
    try {
        await blogsService.update(req.params.id, dto);
    } catch (error) {
        res.sendStatus(500);
        return;
    }
    res.sendStatus(204);
    return;
}