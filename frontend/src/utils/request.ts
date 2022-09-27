import axios, { AxiosResponse } from "axios"

const request = async <T>(
    fn: () => Promise<AxiosResponse<T, any>>
) => {
    try {
        const response = await fn()
        return {
            errorType: undefined,
            data: response.data
        } as T
    }
    catch (e) {
        if (axios.isAxiosError(e)) return e.response?.data as T
        return { errorType: 'string', error: 'Unknown error' } as T
    }
}

export default request