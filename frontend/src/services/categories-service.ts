import { Category } from "../interfaces"
import request from "../utils/request";
import { accessTokenApi } from "./api";
import { ResponseType } from "./dto";

export type CategoriesResponse = ResponseType<{ categories: Category[] }>
export const fetchCategories = async () => {
    return await request(() => accessTokenApi.get<CategoriesResponse>('/categories'))
}