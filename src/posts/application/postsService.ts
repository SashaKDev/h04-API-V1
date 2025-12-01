import {WithId} from "mongodb";
import {Post} from "../types/post";
import {postsRepository} from "../repositories/postsRepository";
import {PostInputDto} from "../dto/post-input.dto";
import {blogsRepository} from "../../blogs/repositories/blogsRepository";
import {Blog} from "../../blogs/types/blog";
import {BlogPostsWithPaginator} from "../types/blogPostsWithPaginator";

export const postsService = {

    async findAll(pageSize: number, pageNumber: number): Promise<WithId<Post>[]> {
        return postsRepository.findAll(pageSize, pageNumber);
    },

    async findAllForBlog(id: string, pageNumber: number, pageSize: number, sortBy: string): Promise<BlogPostsWithPaginator> {

        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize;

        const posts = await postsRepository.findAllForBlog(id, skip, limit, sortBy);
        return {
            ...posts,
            page: pageNumber,
            pageSize: pageSize,
            pagesCount: Math.ceil(posts.totalCount / pageSize),
        }
    },

    async findById(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findById(id);
    },

    async create(post: PostInputDto): Promise<WithId<Post>> {
        const foundBlog = await blogsRepository.findById(post.blogId) as Blog

        const newPost: Post = {
            ...post,
            createdAt: new Date().toISOString(),
            blogName: foundBlog.name
        }

        return await postsRepository.create(newPost);
    },

    async createForBlog(post: PostInputDto): Promise<WithId<Post>> {
        const foundBlog = await blogsRepository.findById(post.blogId) as Blog
        const newPost: Post = {
            ...post,
            blogName: foundBlog.name,
            createdAt: new Date().toISOString(),
        }
        return await postsRepository.create(newPost);
    },

    async update(id: string, dto: PostInputDto): Promise<void> {
        await postsRepository.update(id, dto);
    },

    async delete(id: string): Promise<void> {
        await postsRepository.delete(id);
    }

}