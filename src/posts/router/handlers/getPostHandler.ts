import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/postsRepository";
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";

export const getPostHandler = async (req: Request, res: Response) => {
    const foundPost = await postsRepository.findById(req.params.id);
    if (!foundPost) {
        res.sendStatus(404);
        return;
    }
    res
        .status(200)
        .json(mapPostToViewModel(foundPost));
}