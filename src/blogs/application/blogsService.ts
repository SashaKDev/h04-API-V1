import {blogsRepository} from "../repositories/blogsRepository";
import {Blog} from "../types/blog";
import {WithId} from "mongodb";
import {BlogInputDto} from "../dto/blog-input.dto";


export const blogsService = {
    async findAll(): Promise<WithId<Blog>[]> {
        return await blogsRepository.findAll();
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return await blogsRepository.findById(id);
    },

    async create(blog: BlogInputDto): Promise<WithId<Blog>> {
        const newBlog = {
            ...blog,
            createdAt: new Date().toISOString(),
            isMembership: false
        };
        return await blogsRepository.create(newBlog);
    },

    async update(id: string, blog: BlogInputDto): Promise<void> {
        await blogsRepository.update(id, blog);
    },

    async delete(id: string): Promise<void> {
        await blogsRepository.delete(id);
    }
}