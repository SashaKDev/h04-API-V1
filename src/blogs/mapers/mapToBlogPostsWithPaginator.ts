import {BlogPostsWithPaginator} from "../../posts/types/blogPostsWithPaginator";
import {mapPostToViewModel} from "../../posts/mapers/mapPostToViewModel";


export const mapToBlogPostsWithPaginator = (posts: BlogPostsWithPaginator) => {
    return {
        pagesCount: posts.pagesCount,
        page: posts.page,
        pageSize: posts.pageSize,
        totalCount: posts.totalCount,
        items: posts.items.map(mapPostToViewModel)
    }
}