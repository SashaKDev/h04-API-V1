import {Request, Response} from 'express';
import {mapPostToViewModel} from "../../mapers/mapPostToViewModel";
import {postsService} from "../../application/postsService";

export const getPostHandler = async (req: Request, res: Response) => {
    const foundPost = await postsService.findById(req.params.id);
    if (!foundPost) {
        res.sendStatus(404);
        return;
    }
    res
        .status(200)
        .json(mapPostToViewModel(foundPost));
}