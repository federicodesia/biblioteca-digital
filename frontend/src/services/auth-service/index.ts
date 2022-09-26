import axios from "axios";
import { LoginResponse } from "./dto";

const api = axios.create({ baseURL: 'http://localhost:3000/' })

export const loginRequest = async (
    email: string,
    password: string
) => {
    const response = await api.post<LoginResponse>('/login', {
        email: email,
        password: password
    })
    console.log(response)

    return response.data
}