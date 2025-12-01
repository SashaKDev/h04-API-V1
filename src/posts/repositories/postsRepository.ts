import {Post} from "../types/post";
import {PostInputDto} from "../dto/post-input.dto";
import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";

export const postsRepository = {
    async findAll(pageSize: number, pageNumber: number): Promise<WithId<Post>[]>{
        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize;
        return await postsCollection.find().skip(skip).limit(limit).toArray();
    },

    async findAllForBlog(id: string, skip: number, limit: number, sortBy: string): Promise<{items: WithId<Post>[], totalCount: number}>{

        return {
            items:
                await postsCollection
                .find({blogId: id})
                .sort({[sortBy]: 'desc'})
                .skip(skip)
                .limit(limit)
                .toArray(),
            totalCount:
                await postsCollection.countDocuments({blogId: id})
        }
    },

    async findById(id: string): Promise<WithId<Post> | null>{
        return await postsCollection.findOne({_id: new ObjectId(id)});
    },

    async create(post: Post): Promise<WithId<Post>> {
        const insertedPost = await postsCollection.insertOne(post);
        return ({_id: insertedPost.insertedId, ...post});
    },

    async update(id: string, dto: PostInputDto): Promise<void> {
        await postsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: dto.title,
                shortDescription: dto.shortDescription,
                content: dto.content,
                blogId: dto.blogId
            }});
    },

    async delete(id: string): Promise<void> {
        await postsCollection.deleteOne({_id: new ObjectId(id)});
    }
};