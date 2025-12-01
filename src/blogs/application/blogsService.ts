import {blogsRepository} from "../repositories/blogsRepository";
import {Blog} from "../types/blog";
import {WithId} from "mongodb";
import {BlogInputDto} from "../dto/blog-input.dto";
import {BlogWithPaginator} from "../types/blogWithPaginator";


export const blogsService = {
    async findAll(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, searchNameTerm: string): Promise<BlogWithPaginator> {
        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize
        const foundBlogs = await blogsRepository.findAll(skip, limit, sortBy, sortDirection, searchNameTerm);
        return {
            ...foundBlogs,
            pageSize: pageSize,
            page: pageNumber,
            pagesCount: Math.ceil(foundBlogs.totalCount / pageSize)
        }
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