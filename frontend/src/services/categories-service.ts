import { Category } from "../interfaces"
import request from "../utils/request";
import { accessTokenApi } from "./api";
import { ResponseType } from "./dto";

export type CategoriesResponse = ResponseType<{ categories: Category[] }>
export const fetchCategories = async () => {
    return await request(() => accessTokenApi.get<CategoriesResponse>('/categories'))
}

export type GetCategoryResponse = ResponseType<Category>
export const getCategory = async (id: number) => {
    return await request(() => accessTokenApi.get<GetCategoryResponse>(`/categories/${id}`))
}