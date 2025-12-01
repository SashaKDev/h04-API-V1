import {WithId} from "mongodb";
import {Post} from "../../posts/types/post";

export type PostsWithPaginator = {
    items: WithId<Post>[],
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
}