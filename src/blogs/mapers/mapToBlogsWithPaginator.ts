
import {BlogWithPaginator} from "../types/blogWithPaginator";
import {mapBlogToViewModel} from "./mapBlogToViewModel";


export const mapToBlogsWithPaginator = (blogs: BlogWithPaginator) => {
    return {
        pagesCount: blogs.pagesCount,
        page: blogs.page,
        pageSize: blogs.pageSize,
        totalCount: blogs.totalCount,
        items: blogs.items.map(mapBlogToViewModel)
    }
}