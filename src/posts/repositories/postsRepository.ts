import {Post} from "../types/post";
import {PostInputDto} from "../dto/post-input.dto";
import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";

//
export const postsRepository = {
    async findAll(): Promise<WithId<Post>[]>{
        return await postsCollection.find().toArray();
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