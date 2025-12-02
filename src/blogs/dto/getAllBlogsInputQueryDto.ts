import {getAllBlogsHandler} from "../router/handlers/getAllBlogsHandler";

export type getAllBlogsInputQueryDto = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    searchNameTerm: string,
}