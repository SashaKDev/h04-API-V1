import {Request, Response} from 'express';
import {blogsService} from "../../application/blogsService";

export const getBlogHandler = async (req: Request, res: Response) => {
    const foundCourse = await blogsService.findById(req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res
        .status(200)
        .json(foundCourse);
}