import {Blog} from "./blog";
import {WithId} from "mongodb";

export type BlogWithPaginator = {
    items: WithId<Blog>[],
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
}