const apiBaseURL = import.meta.env.VITE_API_BASE_URL

if (!apiBaseURL) throw new Error("Environment variable VITE_API_BASE_URL not found!")

export default {
    apiBaseURL
}