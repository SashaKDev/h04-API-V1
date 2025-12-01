import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/postsRepository";

export const deletePostHandler = async (req: Request, res: Response) => {
    const foundPost = await postsRepository.findById(req.params.id);
    if (!foundPost) {
        res.sendStatus(404);
        return;
    }

    await postsRepository.delete(req.params.id);
    res.sendStatus(204);
}