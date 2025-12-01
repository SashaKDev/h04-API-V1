import {Request, Response} from "express";
import {blogsService} from "../../application/blogsService";

export const deleteBlogHandler = async (req: Request, res: Response) => {
    const blog = await blogsService.findById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
    }

    try {
        await blogsService.delete(req.params.id);
    } catch (error) {
        res.sendStatus(500);
    }

    res.sendStatus(204);
}