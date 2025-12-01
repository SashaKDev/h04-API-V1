import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/postsRepository";
import {postsService} from "../../application/postsService";

export const deletePostHandler = async (req: Request, res: Response) => {
    const foundPost = await postsService.findById(req.params.id);
    if (!foundPost) {
        res.sendStatus(404);
        return;
    }

    await postsService.delete(req.params.id);
    res.sendStatus(204);
}