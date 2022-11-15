const port = process.env.PORT || 3000
const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

if (!jwtAccessSecret) throw new Error("Environment variable JWT_ACCESS_SECRET not found!")
if (!jwtRefreshSecret) throw new Error("Environment variable JWT_REFRESH_SECRET not found!")

export default {
    port,
    jwtAccessSecret,
    jwtRefreshSecret,
}