export interface ErrorResponse {
    error: {
        path: 'email' | 'password'
        message: string
    }[]
}

export interface LoginResponse {

}