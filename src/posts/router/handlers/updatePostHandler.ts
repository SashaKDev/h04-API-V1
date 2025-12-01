import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/postsRepository";
import {PostInputDto} from "../../dto/post-input.dto";

export const updatePostHandler = async (req: Request, res: Response) => {

    const post = await postsRepository.findById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }

    const dto: PostInputDto = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId:	req.body.blogId,
    }
    try {
        await postsRepository.update(req.params.id, dto);
    } catch (err) {
        res.sendStatus(500);
        return;
    }
    res.sendStatus(204);

}