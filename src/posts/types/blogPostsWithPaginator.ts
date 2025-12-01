import {WithId} from "mongodb";
import {Post} from "./post";

export type BlogPostsWithPaginator = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: WithId<Post>[]

}