import {blogsRepository} from "../repositories/blogsRepository";
import {Blog} from "../types/blog";
import {WithId} from "mongodb";
import {BlogInputDto} from "../dto/blog-input.dto";
import {BlogViewModel} from "../types/blogsViewModel";
import {mapBlogToViewModel} from "../mapers/mapBlogToViewModel";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";


export const blogsService = {
    // async findAll(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, searchNameTerm: string): Promise<BlogsWithPaginator> {
    //     const skip = (pageNumber - 1) * pageSize;
    //     const limit = pageSize
    //     const foundBlogs = await blogsRepository.findAll(skip, limit, sortBy, sortDirection, searchNameTerm);
    //     const pagesCount = Math.ceil(foundBlogs.totalCount / pageSize)
    //     return {
    //         ...foundBlogs,
    //         pageSize: pageSize,
    //         page: pageNumber,
    //         pagesCount: pagesCount,
    //     }
    // },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return await blogsRepository.findById(id);
    },

    async create(blog: BlogInputDto): Promise<string> {
        const newBlog = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };
        return await blogsRepository.create(newBlog);
    },

    async update(id: string, blog: BlogInputDto): Promise<number> {
        return await blogsRepository.update(id, blog);
    },

    async delete(id: string): Promise<number> {
        return await blogsRepository.delete(id);
    }
}