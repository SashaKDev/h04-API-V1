import {Blog} from "../types/blog";
import {BlogInputDto} from "../dto/blog-input.dto";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";


export const blogsRepository = {
    async findAll(skip: number, limit: number, sortBy: string, sortDirection: string, searchNameTerm: string): Promise<{items: WithId<Blog>[], totalCount: number}>{
        const sortDirectionNumber = sortDirection === 'desc' ? -1 : 1;
        console.log(sortBy)
        let filter = {};
        if (searchNameTerm) {
            filter = { name: { $regex: searchNameTerm, $options: "i" } }
        }
        return  {
            items:
                await blogsCollection
                .find(filter)
                .sort({ [sortBy]:  sortDirectionNumber})
                .skip(skip)
                .limit(limit)
                .toArray(),
            totalCount: await blogsCollection.countDocuments(filter)
        }
    },

    async findById(id: string): Promise<WithId<Blog> | null>{
        return await blogsCollection.findOne({_id: new ObjectId(id)});
    },

    async create(blog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogsCollection.insertOne(blog);
        return {...blog, _id: insertResult.insertedId}

    },

    async update(id: string, dto: BlogInputDto): Promise<void> {
        const updateResult = await blogsCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set:
                    {
                        name: dto.name,
                        description: dto.description,
                        websiteUrl: dto.websiteUrl,
                    }
            }
            );
        if (updateResult.matchedCount === 0) {
            throw new Error("No blogs found.");
        }
    },

    async delete(id: string): Promise<void> {
        const deleteResult = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        if (deleteResult.deletedCount === 0) {
            throw new Error("No blogs found.");
        }
    },
}